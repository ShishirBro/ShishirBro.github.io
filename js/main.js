// js/main.js - Add scroll reveal and minor animations

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
  });
});