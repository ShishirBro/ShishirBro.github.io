// js/parallax.js - Multiple water bubbles trailing effect

document.addEventListener("DOMContentLoaded", () => {
    const bubbleContainer = document.createElement("div");
    bubbleContainer.style.position = "fixed";
    bubbleContainer.style.top = "0";
    bubbleContainer.style.left = "0";
    bubbleContainer.style.width = "100vw";
    bubbleContainer.style.height = "100vh";
    bubbleContainer.style.pointerEvents = "none";
    bubbleContainer.style.zIndex = "9999";
    document.body.appendChild(bubbleContainer);

    document.addEventListener("mousemove", (e) => {
        createBubble(e.clientX, e.clientY);
    });

    function createBubble(x, y) {
        const bubble = document.createElement("div");
        const size = Math.random() * 20 + 10; // 10px to 30px
        bubble.style.position = "absolute";
        bubble.style.left = `${x - size / 2}px`;
        bubble.style.top = `${y - size / 2}px`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.borderRadius = "50%";
        bubble.style.background = "rgba(173,216,230,0.5)";
        bubble.style.boxShadow = "0 0 10px 2px rgba(173,216,230,0.3)";
        bubble.style.pointerEvents = "none";
        bubble.style.transition = "opacity 0.8s, transform 0.8s";
        bubbleContainer.appendChild(bubble);

        // Animate bubble fade and scale
        setTimeout(() => {
            bubble.style.opacity = "0";
            bubble.style.transform = "scale(1.5)";
        }, 10);

        // Remove bubble after animation
        setTimeout(() => {
            bubbleContainer.removeChild(bubble);
        }, 900);
    }
});