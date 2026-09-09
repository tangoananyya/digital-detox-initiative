// Vercel serverless function (Node runtime): POST /api/roleplay-feedback
//
// Two actions, one endpoint:
//   { action: "scenario", cluster }                     -> { scenario }
//   { action: "feedback", cluster, scenario, response }  -> { score, strengths, gaps, tips }
//
// Uses Claude Haiku 4.5 for both calls: cheap and more than capable for this
// use case. Do not switch this to Sonnet/Opus without re-checking cost.
//
// COST BACKSTOP: this key should also have a monthly spend cap set in the
// Anthropic Console (console.anthropic.com -> Settings -> Limits) as a hard
// ceiling. The max_tokens caps and input-length guards below reduce runaway
// cost per-request, but a Console spend cap is the real backstop.

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-haiku-4-5-20251001";

const CLUSTERS = [
  "Business Management",
  "Finance",
  "Marketing",
  "Entrepreneurship",
  "Hospitality"
];

const MAX_RESPONSE_CHARS = 4000;
const MAX_SCENARIO_CHARS = 3000;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("[roleplay-feedback] Missing ANTHROPIC_API_KEY env var");
    return res.status(500).json({ error: "Server is not configured. Missing API key." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const { action, cluster } = body;

  if (!CLUSTERS.includes(cluster)) {
    return res.status(400).json({ error: "Invalid or missing cluster." });
  }

  try {
    if (action === "scenario") {
      const scenario = await generateScenario(cluster);
      return res.status(200).json({ scenario: scenario });
    }

    if (action === "feedback") {
      const scenario = String(body.scenario || "").slice(0, MAX_SCENARIO_CHARS);
      const response = String(body.response || "").slice(0, MAX_RESPONSE_CHARS);
      if (!scenario || !response) {
        return res.status(400).json({ error: "Missing scenario or response." });
      }
      const feedback = await generateFeedback(cluster, scenario, response);
      return res.status(200).json(feedback);
    }

    return res.status(400).json({ error: "Invalid action. Use 'scenario' or 'feedback'." });
  } catch (err) {
    console.error("[roleplay-feedback] error:", err.message);
    return res.status(502).json({ error: "The AI request failed. Please try again in a moment." });
  }
};

async function callAnthropic(system, userMessage, maxTokens) {
  const resp = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: system,
      messages: [{ role: "user", content: userMessage }]
    })
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(function () { return ""; });
    throw new Error("Anthropic API error " + resp.status + ": " + errText.slice(0, 300));
  }

  const data = await resp.json();

  // Usage logging: keep an eye on real cost vs. the ~$25-30/yr estimate.
  if (data.usage) {
    console.log(
      "[roleplay-feedback] model=" + MODEL +
      " input_tokens=" + data.usage.input_tokens +
      " output_tokens=" + data.usage.output_tokens
    );
  }

  const textBlock = (data.content || []).find(function (b) { return b.type === "text"; });
  if (!textBlock) throw new Error("No text content in Anthropic response.");
  return textBlock.text;
}

async function generateScenario(cluster) {
  const system =
    "You are a DECA competition scenario writer for a high school chapter's practice tool. " +
    "Write one realistic, DECA-style roleplay scenario for the given event cluster, matching the " +
    "official format: a business setting, the student's role, and a specific task or objective. " +
    "Keep it to 150-250 words, plain prose, no headings, no markdown, no performance indicator list.";
  const user = "Generate one roleplay scenario for the " + cluster + " event cluster.";
  const text = await callAnthropic(system, user, 700);
  return text.trim();
}

async function generateFeedback(cluster, scenario, response) {
  const system =
    "You are an expert DECA judge giving feedback to a high school competitor on a written roleplay " +
    "response. Evaluate it against performance indicators relevant to the " + cluster + " cluster and " +
    "the specific scenario given. Be constructive but honest: a mediocre response should not score " +
    "above 70. Respond with ONLY valid JSON, no markdown fences, no extra text, matching exactly this " +
    'schema: {"score": <integer 0-100>, "strengths": [<2-4 short strings>], "gaps": [<2-4 short strings>], ' +
    '"tips": [<2-3 short, concrete, actionable strings>]}';
  const user =
    "Cluster: " + cluster + "\n\nScenario:\n" + scenario + "\n\nStudent's response:\n" + response +
    "\n\nEvaluate this response.";
  const text = await callAnthropic(system, user, 900);

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (e) {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Could not parse feedback JSON from model response.");
    parsed = JSON.parse(match[0]);
  }

  return {
    score: Math.max(0, Math.min(100, Math.round(Number(parsed.score) || 0))),
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 4) : [],
    gaps: Array.isArray(parsed.gaps) ? parsed.gaps.slice(0, 4) : [],
    tips: Array.isArray(parsed.tips) ? parsed.tips.slice(0, 3) : []
  };
}
