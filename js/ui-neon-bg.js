// ui-neon-bg.js - Neon animated geometric background and interactive section highlights

document.addEventListener('DOMContentLoaded', () => {
  // --- Neon Floating SVG Shapes ---
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('id', 'neon-bg-svg');
  svg.setAttribute('width', '100vw');
  svg.setAttribute('height', '100vh');
  svg.style.position = 'fixed';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100vw';
  svg.style.height = '100vh';
  svg.style.zIndex = '-1';
  svg.style.pointerEvents = 'none';

  // Neon palette
  const palette = [
    getComputedStyle(document.documentElement).getPropertyValue('--neon-cyan').trim() || '#00ffe7',
    getComputedStyle(document.documentElement).getPropertyValue('--neon-purple').trim() || '#a259ff',
    getComputedStyle(document.documentElement).getPropertyValue('--neon-green').trim() || '#00ff85',
    getComputedStyle(document.documentElement).getPropertyValue('--neon-pink').trim() || '#ff00c8',
    getComputedStyle(document.documentElement).getPropertyValue('--neon-yellow').trim() || '#fff700',
    '#fff'
  ];

  // Helper functions
  function createPolygon(points, stroke, opacity, strokeWidth = 2) {
    const poly = document.createElementNS(svgNS, 'polygon');
    poly.setAttribute('points', points);
    poly.setAttribute('fill', 'none');
    poly.setAttribute('stroke', stroke);
    poly.setAttribute('stroke-width', strokeWidth);
    poly.setAttribute('opacity', opacity);
    poly.setAttribute('filter', 'drop-shadow(0 0 12px ' + stroke + ')');
    return poly;
  }
  function createCircle(cx, cy, r, stroke, opacity, strokeWidth = 2) {
    const circ = document.createElementNS(svgNS, 'circle');
    circ.setAttribute('cx', cx);
    circ.setAttribute('cy', cy);
    circ.setAttribute('r', r);
    circ.setAttribute('fill', 'none');
    circ.setAttribute('stroke', stroke);
    circ.setAttribute('stroke-width', strokeWidth);
    circ.setAttribute('opacity', opacity);
    circ.setAttribute('filter', 'drop-shadow(0 0 12px ' + stroke + ')');
    return circ;
  }
  function createLine(x1, y1, x2, y2, stroke, opacity, strokeWidth = 1) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', stroke);
    line.setAttribute('stroke-width', strokeWidth);
    line.setAttribute('opacity', opacity);
    line.setAttribute('filter', 'drop-shadow(0 0 12px ' + stroke + ')');
    return line;
  }

  // Create random shapes
  const shapes = [];
  for (let i = 0; i < 8; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    const points = `${100 + Math.random()*800},${100 + Math.random()*400} ${200 + Math.random()*800},${100 + Math.random()*400} ${200 + Math.random()*800},${200 + Math.random()*400}`;
    shapes.push(createPolygon(points, color, 0.18 + Math.random()*0.09, 2 + Math.random()*2));
  }
  for (let i = 0; i < 8; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    const cx = 100 + Math.random() * 1600;
    const cy = 100 + Math.random() * 700;
    const r = 40 + Math.random() * 120;
    shapes.push(createCircle(cx, cy, r, color, 0.15 + Math.random()*0.08, 1.5 + Math.random()*2));
  }
  for (let i = 0; i < 6; i++) {
    const color = palette[Math.floor(Math.random() * palette.length)];
    const x1 = Math.random() * 1920;
    const y1 = Math.random() * 1080;
    const x2 = Math.random() * 1920;
    const y2 = Math.random() * 1080;
    shapes.push(createLine(x1, y1, x2, y2, color, 0.13 + Math.random()*0.07, 1 + Math.random()*2));
  }
  shapes.forEach(shape => svg.appendChild(shape));
  document.body.appendChild(svg);

  // Animate shapes
  let angle = 0;
  function animateShapes() {
    angle += 0.0035;
    shapes.forEach((shape, i) => {
      const t = angle + i;
      if (shape.tagName === 'polygon') {
        shape.setAttribute('transform', `translate(${Math.sin(t)*30},${Math.cos(t)*20}) rotate(${Math.sin(t)*10})`);
      } else if (shape.tagName === 'circle') {
        shape.setAttribute('cy', parseFloat(shape.getAttribute('cy')) + Math.sin(t)*0.7);
        shape.setAttribute('cx', parseFloat(shape.getAttribute('cx')) + Math.cos(t)*0.7);
      } else if (shape.tagName === 'line') {
        shape.setAttribute('transform', `translate(${Math.sin(t)*10},${Math.cos(t)*10})`);
      }
    });
    requestAnimationFrame(animateShapes);
  }
  animateShapes();

  // --- Section Mouse Interaction ---
  document.querySelectorAll('.content-section').forEach(section => {
    section.addEventListener('mouseenter', () => {
      section.style.boxShadow = '0 0 40px var(--neon-green), 0 0 80px var(--neon-cyan)';
      section.style.borderLeft = '4px solid var(--neon-green)';
      section.style.transition = 'box-shadow 0.4s, border-color 0.4s';
    });
    section.addEventListener('mouseleave', () => {
      section.style.boxShadow = '';
      section.style.borderLeft = '';
      section.style.transition = '';
    });
  });

  // --- Certifications Section Special Color ---
  const certSection = document.getElementById('certifications-section');
  if (certSection) {
    certSection.style.background = 'linear-gradient(120deg, #18182a 0%, #ff00c8 100%)';
    certSection.style.borderLeft = '4px solid var(--neon-pink)';
    certSection.style.boxShadow = '0 0 32px var(--neon-pink)55, 0 0 32px var(--neon-yellow)33';
  }
});
