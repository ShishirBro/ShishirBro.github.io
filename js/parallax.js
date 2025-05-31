// js/parallax.js - Futuristic cursor tracking and parallax

document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Dynamically check if parallax-section exists (loaded after fetch)
    const parallax = document.querySelector(".parallax-section");
    if (parallax) {
      const sensitivity = 0.03;
      const x = (e.clientX - window.innerWidth / 2) * sensitivity;
      const y = (e.clientY - window.innerHeight / 2) * sensitivity;
      parallax.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
});