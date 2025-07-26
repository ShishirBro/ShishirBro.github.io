// js/floating-coder-bg.js
// Subtle, coder-inspired floating geometric objects for background
// Shapes: hexagons, triangles, circles, code brackets, and subtle lines
// Colors: soft neon (magenta, green, yellow, purple, white), low opacity, no blue/cyan

(function() {
  const COLORS = [
    '#00ffe7', // neon cyan
    '#a259ff', // neon purple
    '#00ff85', // neon green
    '#ff00c8', // neon magenta
    '#fff700', // neon yellow
    '#ffffff', // white
    '#23234a', // dark accent
    '#6cfff7', // light cyan
    '#ffb3ff', // light magenta
    '#baffc9'  // light green
  ];
  const SHAPES = ['hex', 'triangle', 'circle', 'bracket', 'line', 'square', 'rect', 'dot', 'polygon'];
  const NUM_SHAPES = 22;
  const canvas = document.createElement('canvas');
  canvas.className = 'floating-coder-bg-canvas';
  document.body.prepend(canvas);
  let dpr = window.devicePixelRatio || 1;
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  function random(min, max) { return Math.random() * (max - min) + min; }

  function makeShape() {
    const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const size = random(28, 80);
    const glow = Math.random() > 0.7;
    const gradient = Math.random() > 0.8;
    return {
      type,
      color,
      size,
      x: random(0, w),
      y: random(0, h),
      dx: random(-0.08, 0.08),
      dy: random(-0.04, 0.04),
      rot: random(0, Math.PI * 2),
      dr: random(-0.002, 0.002),
      glow,
      gradient
    };
  }

  let shapes = Array.from({length: NUM_SHAPES}, makeShape);

  function drawShape(s) {
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    if (s.glow) {
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 18;
    } else {
      ctx.shadowBlur = 0;
    }
    if (s.gradient && (s.type === 'circle' || s.type === 'hex' || s.type === 'square')) {
      const grad = ctx.createLinearGradient(-s.size/2, -s.size/2, s.size/2, s.size/2);
      grad.addColorStop(0, s.color);
      grad.addColorStop(1, COLORS[Math.floor(Math.random()*COLORS.length)]);
      ctx.strokeStyle = grad;
      ctx.fillStyle = grad;
    } else {
      ctx.strokeStyle = s.color;
      ctx.fillStyle = s.color;
    }
    ctx.lineWidth = 2.2;
    switch(s.type) {
      case 'hex':
        ctx.beginPath();
        for(let i=0;i<6;i++) {
          const angle = Math.PI/3*i;
          const px = Math.cos(angle) * s.size/2;
          const py = Math.sin(angle) * s.size/2;
          if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.closePath();
        ctx.stroke();
        break;
      case 'triangle':
        ctx.beginPath();
        for(let i=0;i<3;i++) {
          const angle = Math.PI*2/3*i - Math.PI/2;
          const px = Math.cos(angle) * s.size/2;
          const py = Math.sin(angle) * s.size/2;
          if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.closePath();
        ctx.stroke();
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(0,0,s.size/2,0,Math.PI*2);
        ctx.stroke();
        break;
      case 'bracket':
        ctx.beginPath();
        ctx.moveTo(-s.size/2, -s.size/4);
        ctx.quadraticCurveTo(-s.size/2.2, 0, -s.size/2, s.size/4);
        ctx.moveTo(s.size/2, -s.size/4);
        ctx.quadraticCurveTo(s.size/2.2, 0, s.size/2, s.size/4);
        ctx.stroke();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(-s.size/2, 0);
        ctx.lineTo(s.size/2, 0);
        ctx.stroke();
        break;
      case 'square':
        ctx.beginPath();
        ctx.rect(-s.size/2, -s.size/2, s.size, s.size);
        ctx.stroke();
        break;
      case 'rect':
        ctx.beginPath();
        ctx.rect(-s.size/2, -s.size/4, s.size, s.size/2);
        ctx.stroke();
        break;
      case 'dot':
        ctx.beginPath();
        ctx.arc(0,0,s.size/8,0,Math.PI*2);
        ctx.fill();
        break;
      case 'polygon':
        ctx.beginPath();
        const sides = Math.floor(random(5,8));
        for(let i=0;i<sides;i++) {
          const angle = Math.PI*2/sides*i;
          const px = Math.cos(angle) * s.size/2;
          const py = Math.sin(angle) * s.size/2;
          if(i===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
        }
        ctx.closePath();
        ctx.stroke();
        break;
    }
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0,0,w,h);
    for(const s of shapes) {
      drawShape(s);
      s.x += s.dx;
      s.y += s.dy;
      s.rot += s.dr;
      // wrap around
      if(s.x < -80) s.x = w+80;
      if(s.x > w+80) s.x = -80;
      if(s.y < -80) s.y = h+80;
      if(s.y > h+80) s.y = -80;
    }
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(dpr, dpr);
  });

  animate();
})();
