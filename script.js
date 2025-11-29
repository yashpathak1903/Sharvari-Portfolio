/* -------------------- DEFAULT CONFIG -------------------- */
const defaultConfig = {
  hero_tagline: "Designing spaces that breathe harmony and meaning.",
  about_bio:
    "Sharvari Joshi is an Interior Designer and Stylist based in India, with a practice rooted in mindful design and contextual storytelling. Her work explores the intersection of materiality, human experience, and cultural context—creating spaces that feel both timeless and deeply personal.",
  contact_cta: "Let's design something meaningful.",
  contact_email: "noctiscreates@gmail.com",
  background_color: "#F7F5F2",
  surface_color: "#EAE3DA",
  text_color: "#2B2B2B",
  primary_action_color: "#B28A5A",
  secondary_action_color: "#9A7449",
  font_family: "Lora",
  font_size: 16
};

let config = { ...defaultConfig };

/* -------------------- JOURNAL DATA -------------------- */
const journalData = { /* your entire journalData object (unchanged) */ };

/* -------------------- PROJECT DATA -------------------- */
const projectData = { /* your entire projectData object (unchanged) */ };

/* -------------------- PROJECT VIEW -------------------- */
let currentProject = null;
const projectKeys = Object.keys(projectData);

function showProjectDetail(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  currentProject = projectId;

  document.getElementById("detail-title").textContent = project.title;
  document.getElementById("detail-category").textContent = project.category;
  document.getElementById("detail-hero").textContent = project.emoji;
  document.getElementById("detail-concept").textContent = project.concept;
  document.getElementById("detail-reflection").textContent = project.reflection;

  document.getElementById("main-content").style.display = "none";
  document.getElementById("project-detail").classList.add("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hideProjectDetail() {
  document.getElementById("main-content").style.display = "block";
  document.getElementById("project-detail").classList.remove("active");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showNextProject() {
  const currentIndex = projectKeys.indexOf(currentProject);
  const nextIndex = (currentIndex + 1) % projectKeys.length;
  showProjectDetail(projectKeys[nextIndex]);
}

/* -------------------- JOURNAL + GLOBAL INTERACTIONS -------------------- */

document.addEventListener("DOMContentLoaded", () => {
  /* -------- PROJECT CARDS -------- */
  document
    .querySelectorAll(".project-card, .portfolio-card")
    .forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project");
        showProjectDetail(projectId);
      });
    });

  document
    .getElementById("back-to-portfolio")
    .addEventListener("click", hideProjectDetail);

  document
    .getElementById("next-project")
    .addEventListener("click", showNextProject);

  /* -------- PORTFOLIO FILTERING -------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      portfolioCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ------------------ JOURNAL INTERACTIONS (FIXED) ------------------ */

  const journalGrid = document.querySelector(".journal-grid");
  const journalSection = document.getElementById("journal");
  const detailSection = document.getElementById("journal-detail");

  const closeBtn = document.getElementById("close-journal-detail");

  const detailIcon = document.getElementById("journal-detail-icon");
  const detailTitle = document.getElementById("journal-detail-title");
  const detailDate = document.getElementById("journal-detail-date");
  const detailBody = document.getElementById("journal-detail-body");
  const detailClosing = document.getElementById("journal-detail-closing");

  function renderBody(bodyArray, container) {
    container.innerHTML = "";
    bodyArray.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      p.className = "journal-detail-paragraph";
      container.appendChild(p);
    });
  }

  function openDetail(key) {
    const data = journalData[key];
    if (!data) return;

    detailIcon.textContent = data.icon;
    detailTitle.textContent = data.title;
    detailDate.textContent = data.date;

    renderBody(data.body, detailBody);

    detailClosing.textContent = data.closing;

    detailSection.classList.add("active");
    detailSection.style.display = "block";

    journalSection.style.display = "none";

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeDetail() {
    detailSection.classList.remove("active");
    detailSection.style.display = "none";
    journalSection.style.display = "";
  }

  document.querySelectorAll(".journal-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const key = card.getAttribute("data-article");
      if (key) openDetail(key);
    });

    card.setAttribute("tabindex", "0");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const key = card.getAttribute("data-article");
        if (key) openDetail(key);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeDetail();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && detailSection.style.display === "block") {
      closeDetail();
    }
  });

  detailSection.addEventListener("click", (e) => {
    if (e.target === detailSection) closeDetail();
  });

  /* -------------------- CONTACT FORM -------------------- */
  document
    .getElementById("contact-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();

      const messageDiv = document.createElement("div");
      messageDiv.style.cssText =
        "margin-top:1rem;padding:1rem;background:#B28A5A;color:#F7F5F2;border-radius:4px;text-align:center;font-family:Inter,sans-serif;";
      messageDiv.textContent =
        "Thank you for your message! I'll get back to you soon.";

      const form = document.getElementById("contact-form");
      form.appendChild(messageDiv);
      form.reset();

      setTimeout(() => messageDiv.remove(), 5000);
    });

  /* -------------------- NAV SCROLL -------------------- */
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* -------------------- FADE IN -------------------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("fade-in");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".project-card, .portfolio-card, .about-content")
    .forEach((el) => observer.observe(el));
});
