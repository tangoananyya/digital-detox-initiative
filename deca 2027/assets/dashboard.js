// Turner Fenton DECA member dashboard
// Password gate + calendar + AI roleplay practice tool.
// NOTE: this is a light client-side gate for members, not real security.
// The password below is visible to anyone who views this file's source.
(function () {
  var DASH_PASSWORD = "decarisetosuccess@12";
  var SESSION_KEY = "tfdeca_dashboard_unlocked";

  var gate = document.getElementById("gate");
  var dashboardWrap = document.getElementById("dashboardWrap");
  var gateForm = document.getElementById("gateForm");
  var gateInput = document.getElementById("gateInput");
  var gateError = document.getElementById("gateError");

  function unlock() {
    gate.style.display = "none";
    dashboardWrap.classList.add("unlocked");
  }

  if (sessionStorage.getItem(SESSION_KEY) === "1") {
    unlock();
  }

  gateForm.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (gateInput.value === DASH_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      unlock();
    } else {
      gateInput.classList.remove("shake");
      void gateInput.offsetWidth;
      gateInput.classList.add("shake");
      gateError.classList.add("show");
      gateInput.value = "";
      gateInput.focus();
    }
  });
  gateInput.addEventListener("animationend", function () {
    gateInput.classList.remove("shake");
  });

  // ── CALENDAR ──────────────────────────────────────
  var calGrid = document.getElementById("calGrid");
  var calTitle = document.getElementById("calTitle");
  var calPrev = document.getElementById("calPrev");
  var calNext = document.getElementById("calNext");

  if (calGrid) {
    var events = window.TFDECA_EVENTS || [];
    var eventsByDate = {};
    events.forEach(function (e) {
      if (!eventsByDate[e.date]) eventsByDate[e.date] = [];
      eventsByDate[e.date].push(e);
    });

    var today = new Date();
    var viewYear = today.getFullYear();
    var viewMonth = today.getMonth();

    var MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function renderCalendar() {
      calTitle.textContent = MONTH_NAMES[viewMonth] + " " + viewYear;
      calGrid.innerHTML = "";

      WEEKDAYS.forEach(function (d) {
        var el = document.createElement("div");
        el.className = "cal-weekday";
        el.textContent = d;
        calGrid.appendChild(el);
      });

      var firstDay = new Date(viewYear, viewMonth, 1).getDay();
      var daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      var trailing = (7 - ((firstDay + daysInMonth) % 7)) % 7;

      for (var i = 0; i < firstDay; i++) {
        var empty = document.createElement("div");
        empty.className = "cal-day empty";
        calGrid.appendChild(empty);
      }

      for (var day = 1; day <= daysInMonth; day++) {
        var cell = document.createElement("div");
        var dateStr = viewYear + "-" + pad(viewMonth + 1) + "-" + pad(day);
        var isToday = viewYear === today.getFullYear() && viewMonth === today.getMonth() && day === today.getDate();
        var dayEvents = eventsByDate[dateStr] || [];

        cell.className = "cal-day" + (isToday ? " today" : "") + (dayEvents.length ? " has-event" : "");

        var num = document.createElement("span");
        num.className = "num";
        num.textContent = day;
        cell.appendChild(num);

        dayEvents.forEach(function (e) {
          var pill = document.createElement("span");
          pill.className = "cal-event " + e.category;
          pill.textContent = e.title;
          pill.title = e.title;
          cell.appendChild(pill);
        });

        calGrid.appendChild(cell);
      }

      for (var t = 0; t < trailing; t++) {
        var trailEmpty = document.createElement("div");
        trailEmpty.className = "cal-day empty";
        calGrid.appendChild(trailEmpty);
      }
    }

    calPrev.addEventListener("click", function () {
      viewMonth--;
      if (viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });
    calNext.addEventListener("click", function () {
      viewMonth++;
      if (viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });

    renderCalendar();
  }

  // ── AI ROLEPLAY PRACTICE ──────────────────────────
  var rpClusters = document.getElementById("rpClusters");
  if (!rpClusters) return;

  var rpPanel = document.getElementById("rpPanel");
  var rpScenarioLoading = document.getElementById("rpScenarioLoading");
  var rpScenarioError = document.getElementById("rpScenarioError");
  var rpScenarioBlock = document.getElementById("rpScenarioBlock");
  var rpScenarioCluster = document.getElementById("rpScenarioCluster");
  var rpScenarioText = document.getElementById("rpScenarioText");
  var rpResponseInput = document.getElementById("rpResponseInput");
  var rpSubmitBtn = document.getElementById("rpSubmitBtn");
  var rpNewScenarioBtn = document.getElementById("rpNewScenarioBtn");
  var rpFeedbackLoading = document.getElementById("rpFeedbackLoading");
  var rpFeedbackError = document.getElementById("rpFeedbackError");
  var rpFeedbackBlock = document.getElementById("rpFeedbackBlock");
  var rpScoreNum = document.getElementById("rpScoreNum");
  var rpStrengths = document.getElementById("rpStrengths");
  var rpGaps = document.getElementById("rpGaps");
  var rpTips = document.getElementById("rpTips");

  var activeCluster = null;
  var activeScenario = null;

  function hide(el) { el.style.display = "none"; }
  function show(el, display) { el.style.display = display || "block"; }

  function fillList(ul, items) {
    ul.innerHTML = "";
    (items || []).forEach(function (item) {
      var li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  function fetchJSON(body, timeoutMs) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, timeoutMs || 30000);
    return fetch("/api/roleplay-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal
    }).then(function (res) {
      clearTimeout(timer);
      if (!res.ok) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          throw new Error(data.error || "Request failed (" + res.status + ")");
        });
      }
      return res.json();
    }).catch(function (err) {
      clearTimeout(timer);
      if (err.name === "AbortError") throw new Error("The request timed out. Please try again.");
      throw err;
    });
  }

  function generateScenario(cluster) {
    activeCluster = cluster;
    activeScenario = null;

    show(rpPanel);
    hide(rpScenarioBlock);
    hide(rpScenarioError);
    hide(rpFeedbackBlock);
    hide(rpFeedbackError);
    rpResponseInput.value = "";
    show(rpScenarioLoading, "flex");

    fetchJSON({ action: "scenario", cluster: cluster })
      .then(function (data) {
        hide(rpScenarioLoading);
        activeScenario = data.scenario;
        rpScenarioCluster.textContent = cluster + " Roleplay Scenario";
        rpScenarioText.textContent = data.scenario;
        show(rpScenarioBlock);
      })
      .catch(function (err) {
        hide(rpScenarioLoading);
        rpScenarioError.textContent = "Couldn't generate a scenario: " + err.message;
        show(rpScenarioError);
      });
  }

  rpClusters.querySelectorAll(".rp-cluster-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      rpClusters.querySelectorAll(".rp-cluster-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      generateScenario(btn.getAttribute("data-cluster"));
    });
  });

  rpNewScenarioBtn.addEventListener("click", function () {
    if (activeCluster) generateScenario(activeCluster);
  });

  rpSubmitBtn.addEventListener("click", function () {
    var responseText = rpResponseInput.value.trim();
    if (!responseText) {
      rpResponseInput.focus();
      return;
    }
    hide(rpFeedbackBlock);
    hide(rpFeedbackError);
    show(rpFeedbackLoading, "flex");

    fetchJSON({
      action: "feedback",
      cluster: activeCluster,
      scenario: activeScenario,
      response: responseText
    }).then(function (data) {
      hide(rpFeedbackLoading);
      rpScoreNum.textContent = data.score;
      fillList(rpStrengths, data.strengths);
      fillList(rpGaps, data.gaps);
      fillList(rpTips, data.tips);
      show(rpFeedbackBlock);
    }).catch(function (err) {
      hide(rpFeedbackLoading);
      rpFeedbackError.textContent = "Couldn't score your response: " + err.message;
      show(rpFeedbackError);
    });
  });
})();
