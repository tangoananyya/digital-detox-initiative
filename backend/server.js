import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map(s => s.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

const PRODUCTS = {
  neck: {
    profileName: 'Tech Neck',
    diagnosis: 'Your screen habits are loading significant stress on your cervical spine. Forward head posture from sustained screen use is compressing the discs and nerve roots at the base of your skull.',
    symptoms: ['Base of skull compression', 'Forward head posture pattern', 'Cervical nerve root tension'],
    prescription: 'The Cervical Decompression Neck Relaxer uses passive traction to restore your natural C-curve and decompress affected segments in just 10 minutes daily.',
  },
  eyes: {
    profileName: 'Screen Strain',
    diagnosis: 'Your screen exposure is triggering chronic eye strain and tension headaches. Digital eye fatigue creates a referred pain pattern that radiates from your eyes to the base of your skull.',
    symptoms: ['Digital eye fatigue', 'Tension headache pattern', 'Temporalis muscle tightness'],
    prescription: 'The Roller Ball Massager targets your temples, jawline, and orbital ridge to relieve the facial tension that builds from screen glare and sustained focus.',
  },
  shoulders: {
    profileName: 'Shoulder Load',
    diagnosis: 'Your upper trapezius and rhomboid muscles have chronically shortened from sustained screen posture. This is a classic presentation of upper crossed syndrome from prolonged desk use.',
    symptoms: ['Upper trapezius hypertonicity', 'Rhomboid shortening', 'Thoracic kyphosis pattern'],
    prescription: 'The Back Stretcher Pillow opens your thoracic spine and releases the fascia across your shoulders, restoring your natural range of motion.',
  },
  wrists: {
    profileName: 'Wrist Tension',
    diagnosis: 'Repetitive micro-movements from typing and scrolling are creating cumulative strain in your wrist flexors and carpal tunnel. This pattern precedes most repetitive strain injuries.',
    symptoms: ['Wrist flexor overuse', 'Carpal tunnel compression', 'Grip fatigue pattern'],
    prescription: 'Compression Gloves provide targeted compression to reduce inflammation and support your tendons throughout the workday.',
  },
  mental: {
    profileName: 'Digital Burnout',
    diagnosis: 'Your nervous system is showing signs of chronic digital overstimulation. Screen-induced cortisol elevation is affecting your cognitive baseline and emotional regulation throughout the day.',
    symptoms: ['Nervous system dysregulation', 'Cortisol elevation pattern', 'Attentional fatigue'],
    prescription: 'The Mini Handheld Massager activates the parasympathetic nervous system through targeted vibration therapy, shifting you from fight-or-flight to rest-and-digest.',
  },
  posture: {
    profileName: 'Postural Collapse',
    diagnosis: 'Extended laptop use is training your body into a forward-collapsed posture pattern. Your deep postural stabilizers have become inhibited from sustained static loading.',
    symptoms: ['Deep stabilizer inhibition', 'Thoracic flexion pattern', 'Anterior pelvic tilt'],
    prescription: 'The Posture Corrector provides proprioceptive feedback to re-train your postural muscles and open your chest throughout the workday.',
  },
};

function scoreAnswers(answers) {
  const { pain, setup, endOfDay, mentalState, movement } = answers;
  if (pain === 'Base of skull and neck' || setup === 'Wherever — couch bed floor') return 'neck';
  if (pain === 'Eyes and forehead' || endOfDay === 'Head is pounding') return 'eyes';
  if (pain === 'Shoulders and upper back') return 'shoulders';
  if (pain === 'Wrists and hands') return 'wrists';
  if (mentalState === 'Completely checked out' || mentalState === 'Anxious and restless') return 'mental';
  if (movement === 'I forget I have a body' && setup === 'Laptop at a desk') return 'posture';
  return 'neck';
}

function getStage(screenHours) {
  if (screenHours === 'Under 3 hours') return 1;
  if (screenHours === '4 to 6 hours') return 2;
  return 3;
}

app.post('/api/assess', (req, res) => {
  try {
    const answers = req.body;
    const dominant = scoreAnswers(answers);
    const product = PRODUCTS[dominant];
    const stage = getStage(answers.screenHours);
    res.json({
      stage,
      profile_name: product.profileName,
      diagnosis_summary: product.diagnosis,
      symptoms: product.symptoms,
      prescription: product.prescription,
      dominant_problem: dominant,
    });
  } catch (err) {
    console.error('Assess error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { productName, productPrice, items } = req.body;

    const line_items = items
      ? items.map(item => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.qty || 1,
        }))
      : [{
          price_data: {
            currency: 'usd',
            product_data: { name: productName },
            unit_amount: Math.round(productPrice * 100),
          },
          quantity: 1,
        }];

    const origin = allowedOrigins[0] || 'http://localhost:5173';
    const base = `${origin}/digital-detox-kit-backend`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ'],
      },
      phone_number_collection: { enabled: true },
      success_url: `${base}/success`,
      cancel_url: `${base}/`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Digital Detox backend running on port ${PORT}`));
