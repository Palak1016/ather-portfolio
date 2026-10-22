// ===== EDIT THIS SECTION: leave a value as "" if you don't have it yet =====
const LINKS = {
  email: "kumaripalak875@gmail.com",
  github: "https://github.com/Palak1016",
  linkedin: "",   // paste your LinkedIn URL
  leetcode: "",   // paste your LeetCode URL
  resume: ""      // e.g. "resume.pdf" after adding the file to this folder
};
const PROJECTS = [
  { title: "Event Management System", note: "Built during my internship at Truminds Software Systems",
    tech: ["React.js","Spring Boot","MongoDB","JWT"],
    problem: "Event organizers and attendees need different experiences when creating events and booking seats or slots.",
    solution: "A full-stack booking platform with separate organizer and attendee flows, seat/slot booking and booking history. Secure Spring Boot REST APIs (JWT auth, event CRUD, bookings) with a MongoDB data model, and a responsive React UI with reusable components and form validation.",
    learnings: "[PLACEHOLDER: 1–2 things you learned]", live: "", repo: "" },
  { title: "Distributed Job Scheduler",
    tech: ["Java","Spring Boot","React","PostgreSQL","Docker"],
    problem: "Jobs running on several workers at once can be processed twice or lost when a worker fails.",
    solution: "A scheduling platform for immediate, delayed, scheduled, recurring and batch jobs. Workers claim jobs atomically using PostgreSQL FOR UPDATE SKIP LOCKED, with heartbeats, retries, stale-lease recovery and a Dead Letter Queue. A Dockerized React dashboard shows logs and metrics.",
    learnings: "[PLACEHOLDER: 1–2 things you learned]", live: "", repo: "" },
  { title: "Facial Emotion Recognition", note: "Details not yet provided",
    tech: ["[PLACEHOLDER: e.g. Python, TensorFlow]"],
    problem: "[PLACEHOLDER: what problem does it address?]",
    solution: "[PLACEHOLDER: your approach, dataset and model, in your own words. Add accuracy only if you measured it.]",
    learnings: "[PLACEHOLDER: 1–2 things you learned]", live: "", repo: "" },
  { title: "AI Placement Prediction System",
    tech: ["Python","Scikit-learn","React"],
    problem: "Students want to understand their placement readiness, not just receive a score.",
    solution: "A classifier estimating placement probability from GPA, backlogs, internships and DSA practice. I cleaned the data, engineered features, and benchmarked Logistic Regression against Random Forest. A React interface shows the probability and the key factors behind it.",
    learnings: "[PLACEHOLDER: 1–2 things you learned]", live: "", repo: "" }
];
// ===========================================================================
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ph = s => s.startsWith("[PLACEHOLDER") ? ` class="ph"` : "";
document.getElementById("project-list").innerHTML = PROJECTS.map(p => `
  <article class="card">
    <div class="shot">[Screenshot placeholder: add image to /images and replace this box]</div>
    <h3>${esc(p.title)}</h3>${p.note ? `<p><em>${esc(p.note)}</em></p>` : ""}
    <ul class="chips" aria-label="Technologies">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    <h4>Problem</h4><p${ph(p.problem)}>${esc(p.problem)}</p>
    <h4>My solution</h4><p${ph(p.solution)}>${esc(p.solution)}</p>
    <h4>Key learnings</h4><p${ph(p.learnings)}>${esc(p.learnings)}</p>
    <div class="links">
      ${p.repo ? `<a href="${esc(p.repo)}" target="_blank" rel="noopener">Code</a>` : `<a href="${esc(LINKS.github)}" target="_blank" rel="noopener">Code on GitHub profile</a>`}
      ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live demo</a>` : ""}
    </div>
  </article>`).join("");

const c = [];
c.push(`<a class="btn" href="mailto:${esc(LINKS.email)}">Email me</a>`);
[["github","GitHub"],["linkedin","LinkedIn"],["leetcode","LeetCode"],["resume","Download resume"]].forEach(([k,l]) => {
  if (LINKS[k]) c.push(`<a class="btn ghost" href="${esc(LINKS[k])}" target="_blank" rel="noopener">${l}</a>`);
});
document.getElementById("contact-links").innerHTML = c.join("");
document.getElementById("yr").textContent = new Date().getFullYear();

// Mobile menu
const mb = document.querySelector(".menu-btn"), menu = document.getElementById("menu");
mb.addEventListener("click", () => { const o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.classList.remove("open"); mb.setAttribute("aria-expanded", false); } });

// EV concept prototype (illustrative numbers only)
const bat = document.getElementById("bat"), trip = document.getElementById("trip");
function update() {
  const pct = +bat.value, rng = Math.round(pct * 1.4), d = +trip.value || 0;
  document.getElementById("batOut").textContent = pct;
  document.getElementById("range").textContent = rng;
  const f = document.getElementById("meterFill");
  f.style.width = pct + "%"; f.style.background = pct < 20 ? "#F79009" : "#12B76A";
  document.getElementById("tripMsg").textContent = d <= rng
    ? `Good to go: ${d} km is within your estimated range.`
    : `Plan a charge stop: ${d} km is ${d - rng} km beyond your estimated range.`;
}
bat.addEventListener("input", update); trip.addEventListener("input", update); update();
