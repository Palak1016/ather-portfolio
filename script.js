// ===== Editable content: leave a link as "" and its button is hidden =====
const LINKS = {
  email: "kumaripalak875@gmail.com",
  github: "https://github.com/Palak1016",
  linkedin: "",
  leetcode: "",
  resume: "resume.pdf"
};
const PROJECTS = [
  { show: true, preview: "event", title: "Event Management System", note: "Built during my internship at Truminds Software Systems",
    tech: ["React.js","Spring Boot","MongoDB","JWT"],
    problem: "Event organizers and attendees need different experiences: one group creates and manages events, the other books seats or slots and checks their history.",
    solution: "A full-stack event booking platform with separate organizer and attendee flows, seat and slot booking, and booking history. Secure Spring Boot REST APIs handle JWT authentication, event CRUD and bookings on a MongoDB data model. The React interface uses reusable components and form validation.",
    focus: "Secure authentication, data modelling and reusable, validated interface components." },
  { show: true, preview: "scheduler", title: "Distributed Job Scheduler",
    tech: ["Java","Spring Boot","React","PostgreSQL","JWT","Docker"],
    problem: "When several workers run in parallel, the same job can be picked up twice, and failing jobs can block the rest.",
    solution: "A production-inspired scheduling platform for immediate, delayed, scheduled, recurring and batch jobs behind JWT-secured REST APIs. Workers claim jobs atomically with PostgreSQL FOR UPDATE SKIP LOCKED to avoid duplicate processing. Heartbeats, automatic retries, stale-lease recovery and a Dead Letter Queue isolate failing jobs. A Dockerized React dashboard shows execution logs and metrics for jobs, workers, queues and failures.",
    focus: "Concurrency-safe execution, fault tolerance and observability." },
  { show: false, preview: "", title: "Facial Emotion Recognition", tech: [], problem: "", solution: "", focus: "" },
  { show: true, preview: "placement", title: "AI Placement Prediction System",
    tech: ["Python","Scikit-learn","React"],
    problem: "Estimate a student's placement probability from GPA, backlogs, internships and DSA practice, and make the result understandable.",
    solution: "A classifier trained on cleaned student data with engineered features. I benchmarked Logistic Regression against Random Forest to choose the better performer. A React interface shows the predicted probability together with the key factors driving it.",
    focus: "Feature engineering, model selection and explainable output." }
];
// ======================================================================
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const PREVIEWS = {
  event: `<div class="pv pv-event"><div class="pv-tabs"><b>Organizer</b><span>Attendee</span></div><div class="seats">${Array.from({length:24},(_,i)=>`<i class="${[3,4,10,17].includes(i)?"sel":[6,7,14,20].includes(i)?"taken":""}"></i>`).join("")}</div><div class="pv-btn">Book seats</div></div>`,
  scheduler: `<div class="pv pv-sched"><div><h5>Queue</h5><i></i><i></i><i></i></div><div><h5>Workers</h5><u>Worker 1</u><u>Worker 2</u><u>Worker 3</u></div><div><h5>Dead letter queue</h5><i class="dlq"></i></div></div>`,
  placement: `<div class="pv pv-place"><h5>Factors behind the estimate</h5>${[["GPA",85],["Backlogs",35],["Internships",60],["DSA practice",72]].map(([l,w])=>`<div class="bar"><span>${l}</span><em style="width:${w}%"></em></div>`).join("")}</div>`
};
document.getElementById("project-list").innerHTML = PROJECTS.filter(p => p.show).map(p => `
  <article class="card">
    <figure class="shot">${PREVIEWS[p.preview]}<figcaption>Illustrative preview drawn in HTML and CSS. Not a screenshot.</figcaption></figure>
    <h3>${esc(p.title)}</h3>${p.note ? `<p><em>${esc(p.note)}</em></p>` : ""}
    <ul class="chips" aria-label="Technologies">${p.tech.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    <h4>Problem</h4><p>${esc(p.problem)}</p>
    <h4>My solution</h4><p>${esc(p.solution)}</p>
    <h4>What I focused on</h4><p>${esc(p.focus)}</p>
    <div class="links"><a href="${esc(LINKS.github)}" target="_blank" rel="noopener">Code on GitHub</a></div>
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
