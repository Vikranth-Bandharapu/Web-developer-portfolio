/* ==========================================================================
   STACKLY — MULTI-SECTION DYNAMIC 3D BACKGROUND ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  setupSectionZIndex();
  initAllSection3DEffects();
  init3DTiltCards();
});

/* ENSURE CONTENT IN ALL SECTIONS & CARDS FLOATS CLEANLY ABOVE SECTION CANVASES */
function setupSectionZIndex() {
  const sections = document.querySelectorAll('section, header, footer, .hero-section, .dashboard-wrapper, .login-container');
  sections.forEach(sec => {
    if (window.getComputedStyle(sec).position === 'static') {
      sec.style.position = 'relative';
    }
    sec.style.overflow = 'hidden';
    
    // Direct children get z-index 10 so section content is 100% visible
    Array.from(sec.children).forEach(child => {
      if (!child.classList.contains('section-3d-canvas')) {
        if (window.getComputedStyle(child).position === 'static') {
          child.style.position = 'relative';
        }
        child.style.zIndex = '10';
      }
    });
  });
}

/* INITIALIZE DISTINCT 3D EFFECT FOR EVERY SECTION */
function initAllSection3DEffects() {
  const path = window.location.pathname.toLowerCase();

  // Full-page app routes (Login, Signup, Dashboards)
  if (path.includes('login.html')) {
    initLogin3DGrid();
    return;
  } else if (path.includes('signup.html')) {
    initSignup3DWave();
    return;
  } else if (path.includes('dashboard-admin.html')) {
    initAdmin3DMatrix();
    return;
  } else if (path.includes('dashboard.html')) {
    initDashboard3DConstellation();
    return;
  }

  // Multi-Section Pages (Homepage, About, Services, Projects, Blog, Contact, 404)
  const sections = document.querySelectorAll('section, footer');
  
  sections.forEach((sec, idx) => {
    const secId = (sec.id || sec.className || '').toLowerCase();
    
    if (secId.includes('hero') || idx === 0) {
      initHero3D(sec);
    } else if (secId.includes('stat') || secId.includes('counter')) {
      initStats3D(sec);
    } else if (secId.includes('service') || secId.includes('feature')) {
      initServices3D(sec);
    } else if (secId.includes('project') || secId.includes('case')) {
      initProjects3D(sec);
    } else if (secId.includes('process') || secId.includes('arch')) {
      initProcess3D(sec);
    } else if (secId.includes('testimonial') || secId.includes('client')) {
      initTestimonials3D(sec);
    } else if (secId.includes('pricing') || secId.includes('roi') || secId.includes('calc')) {
      initPricing3D(sec);
    } else if (secId.includes('faq')) {
      initFaq3D(sec);
    } else if (secId.includes('contact') || secId.includes('cta')) {
      initCta3D(sec);
    } else if (sec.tagName.toLowerCase() === 'footer') {
      initFooter3D(sec);
    } else {
      // Alternate 3D background patterns by index for remaining sections
      const mode = idx % 5;
      if (mode === 0) initServices3D(sec);
      else if (mode === 1) initProjects3D(sec);
      else if (mode === 2) initStats3D(sec);
      else if (mode === 3) initProcess3D(sec);
      else initFaq3D(sec);
    }
  });
}

/* HELPER: CREATE & ATTACH FULL-COVER SECTION CANVAS WITH INTERSECTION OBSERVER */
function createSectionCanvas(parentEl) {
  if (!parentEl) return null;
  
  let canvas = parentEl.querySelector('.section-3d-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.className = 'section-3d-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    parentEl.prepend(canvas);
  }
  return canvas;
}

/* ==========================================================================
   SECTION 1: HERO SECTION 3D DUAL GYROSCOPE & NEON CORE
   ========================================================================== */
function initHero3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 600;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 600;
  });

  const particles = [];
  for (let i = 0; i < 90; i++) {
    particles.push({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 400,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      vz: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 3.5 + 2,
      color: i % 3 === 0 ? '#00f0ff' : (i % 3 === 1 ? '#6366f1' : '#ff007f')
    });
  }

  let angle = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.008;

    const cx = width / 2;
    const cy = height / 2;

    // Spinning 3D Wireframe Core
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#00f0ff';
    ctx.strokeRect(-100, -100, 200, 200);

    ctx.rotate(-angle * 1.6);
    ctx.strokeStyle = 'rgba(255, 0, 127, 0.45)';
    ctx.shadowColor = '#ff007f';
    ctx.strokeRect(-130, -130, 260, 260);
    ctx.restore();

    // 3D Particles with Connecting Vectors
    const fov = 300;
    for (let i = 0; i < particles.length; i++) {
      let p1 = particles[i];
      p1.x += p1.vx; p1.y += p1.vy; p1.z += p1.vz;

      if (Math.abs(p1.x) > width / 2) p1.vx *= -1;
      if (Math.abs(p1.y) > height / 2) p1.vy *= -1;
      if (p1.z < 10 || p1.z > 400) p1.vz *= -1;

      const scale1 = fov / (fov + p1.z);
      const x1 = p1.x * scale1 + cx;
      const y1 = p1.y * scale1 + cy;

      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        const scale2 = fov / (fov + p2.z);
        const x2 = p2.x * scale2 + cx;
        const y2 = p2.y * scale2 + cy;

        const dx = x1 - x2; const dy = y1 - y2;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.5 * (1 - dist / 140)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.beginPath();
      ctx.arc(x1, y1, p1.size * scale1, 0, Math.PI * 2);
      ctx.fillStyle = p1.color;
      ctx.shadowBlur = 12; ctx.shadowColor = p1.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 2: STATS SECTION 3D HEXAGONAL HONEYCOMB & PULSING NODES
   ========================================================================== */
function initStats3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 400;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 400;
  });

  let step = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    step += 0.02;

    const size = 35;
    const h = size * Math.sqrt(3);

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.18)';
    ctx.lineWidth = 1.5;

    for (let y = 0; y < height + h; y += h * 0.75) {
      for (let x = 0; x < width + size * 2; x += size * 3) {
        const cx = x + ((Math.floor(y / (h * 0.75)) % 2) * size * 1.5);
        const cy = y;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const px = cx + size * Math.cos(angle);
          const py = cy + size * Math.sin(angle);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const pulse = Math.sin(step + (cx + cy) * 0.005);
        if (pulse > 0.6) {
          ctx.strokeStyle = `rgba(0, 240, 255, ${pulse * 0.6})`;
          ctx.shadowBlur = 10; ctx.shadowColor = '#00f0ff';
        } else {
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
          ctx.shadowBlur = 0;
        }
        ctx.stroke();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 3: SERVICES SECTION 3D QUANTUM NEON SINE WAVE
   ========================================================================== */
function initServices3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 500;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 500;
  });

  const cols = 40;
  const rows = 20;
  let step = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    step += 0.04;

    const cx = width / 2;
    const cy = height * 0.6;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 32;
        const z = r * 30 + 80;
        const y = Math.sin(step + c * 0.2 + r * 0.3) * 40;

        const scale = 350 / (350 + z);
        const px = x * scale + cx;
        const py = y * scale + cy + r * 6;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(1.5, 3.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = r % 2 === 0 ? 'rgba(0, 240, 255, 0.7)' : 'rgba(0, 255, 157, 0.7)';
        ctx.shadowBlur = 8; ctx.shadowColor = '#00f0ff';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 4: PROJECTS SECTION 3D PARTICLE RING VORTEX
   ========================================================================== */
function initProjects3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 600;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 600;
  });

  const num = 70;
  const ring = [];
  for (let i = 0; i < num; i++) {
    ring.push({
      angle: (i / num) * Math.PI * 2,
      radius: Math.random() * 180 + 120,
      speed: Math.random() * 0.015 + 0.005,
      size: Math.random() * 4 + 2,
      color: i % 2 === 0 ? '#ff007f' : '#00f0ff'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    ring.forEach(p => {
      p.angle += p.speed;

      const x = cx + Math.cos(p.angle) * p.radius;
      const y = cy + Math.sin(p.angle) * (p.radius * 0.4);

      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 15; ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 5: PROCESS SECTION 3D CIRCUIT TELEMETRY TRACES
   ========================================================================== */
function initProcess3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 500;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 500;
  });

  const packets = [];
  for (let i = 0; i < 25; i++) {
    packets.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 3 + 1,
      dir: Math.random() > 0.5 ? 'H' : 'V',
      color: i % 2 === 0 ? '#a855f7' : '#00f0ff'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    packets.forEach(p => {
      if (p.dir === 'H') {
        p.x += p.speed;
        if (p.x > width) p.x = 0;
      } else {
        p.y += p.speed;
        if (p.y > height) p.y = 0;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12; ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 6: TESTIMONIALS SECTION 3D FLOATING GLASS SPHERES
   ========================================================================== */
function initTestimonials3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 500;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 500;
  });

  const spheres = [];
  for (let i = 0; i < 20; i++) {
    spheres.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 35 + 15,
      vy: (Math.random() - 0.5) * 0.6,
      color: i % 2 === 0 ? 'rgba(0, 240, 255, 0.25)' : 'rgba(99, 102, 241, 0.25)'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    spheres.forEach(s => {
      s.y += s.vy;
      if (s.y < 0 || s.y > height) s.vy *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15; ctx.shadowColor = s.color;
      ctx.stroke();
      ctx.fillStyle = s.color;
      ctx.globalAlpha = 0.1;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 7: PRICING SECTION 3D CYBER HORIZON GRID PLANE
   ========================================================================== */
function initPricing3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 500;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 500;
  });

  let speed = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    speed += 1.5;

    const cx = width / 2;
    const cy = height * 0.5;

    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 1.5;

    for (let x = -width * 0.5; x < width * 1.5; x += 60) {
      ctx.beginPath();
      ctx.moveTo(cx + (x - cx) * 0.08, cy);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const offset = speed % 30;
    for (let y = cy; y < height; y += 15 + (y - cy) * 0.12) {
      ctx.beginPath();
      ctx.moveTo(0, y + offset * 0.4);
      ctx.lineTo(width, y + offset * 0.4);
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 8: FAQ SECTION 3D SPINNING GEOMETRIC RINGS
   ========================================================================== */
function initFaq3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 500;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 500;
  });

  let angle = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    angle += 0.01;

    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    ctx.translate(cx, cy);

    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, 180, 70, angle, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15; ctx.shadowColor = '#00f0ff';
    ctx.stroke();

    ctx.rotate(-angle * 2);
    ctx.beginPath();
    ctx.ellipse(0, 0, 220, 80, -angle, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
    ctx.shadowColor = '#a855f7';
    ctx.stroke();

    ctx.restore();

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 9: CONTACT / CTA SECTION 3D SPEED TUNNEL LINES
   ========================================================================== */
function initCta3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 400;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 400;
  });

  const lines = [];
  for (let i = 0; i < 40; i++) {
    lines.push({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 300,
      speed: Math.random() * 4 + 2,
      color: i % 2 === 0 ? '#00f0ff' : '#6366f1'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    lines.forEach(l => {
      l.dist += l.speed;
      if (l.dist > width) l.dist = 10;

      const x1 = cx + Math.cos(l.angle) * l.dist;
      const y1 = cy + Math.sin(l.angle) * l.dist;

      const x2 = cx + Math.cos(l.angle) * (l.dist + 30);
      const y2 = cy + Math.sin(l.angle) * (l.dist + 30);

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = l.color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10; ctx.shadowColor = l.color;
      ctx.stroke();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   SECTION 10: FOOTER SECTION 3D TWINKLING STARFIELD & NEON WAVE
   ========================================================================== */
function initFooter3D(parentEl) {
  const canvas = createSectionCanvas(parentEl);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = canvas.width = parentEl.offsetWidth || window.innerWidth;
  let height = canvas.height = parentEl.offsetHeight || 300;

  window.addEventListener('resize', () => {
    width = canvas.width = parentEl.offsetWidth || window.innerWidth;
    height = canvas.height = parentEl.offsetHeight || 300;
  });

  const stars = [];
  for (let i = 0; i < 60; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.01
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${Math.abs(s.alpha)})`;
      ctx.shadowBlur = 8; ctx.shadowColor = '#00f0ff';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   DEDICATED APP PAGES 3D EFFECTS (LOGIN, SIGNUP, DASHBOARD 1 & 2)
   ========================================================================== */
function create3DCanvas(id) {
  let canvas = document.getElementById(id);
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);
  }
  return canvas;
}

function initLogin3DGrid() {
  const canvas = create3DCanvas('canvas-3d-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let speed = 0;
  const cubes = [];
  for (let i = 0; i < 35; i++) {
    cubes.push({
      x: (Math.random() - 0.5) * width * 1.6,
      y: (Math.random() - 0.5) * height * 1.6,
      z: Math.random() * 700 + 40,
      size: Math.random() * 50 + 25,
      angle: Math.random() * Math.PI,
      speedRot: (Math.random() - 0.5) * 0.04,
      color: i % 2 === 0 ? '#00f0ff' : '#6366f1'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);
    speed += 1.8;

    const cx = width / 2;
    const cy = height / 2;
    const horizon = height * 0.55;

    ctx.strokeStyle = 'rgba(99, 102, 241, 0.45)';
    ctx.lineWidth = 1.8;

    for (let x = -width * 0.6; x < width * 1.6; x += 65) {
      ctx.beginPath();
      ctx.moveTo(cx + (x - cx) * 0.08, horizon);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const offset = speed % 35;
    for (let y = horizon; y < height; y += 16 + (y - horizon) * 0.14) {
      ctx.beginPath();
      ctx.moveTo(0, y + offset * 0.45);
      ctx.lineTo(width, y + offset * 0.45);
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.2 + (y - horizon) / height * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    cubes.forEach(cube => {
      cube.z -= 2.5;
      if (cube.z <= 10) cube.z = 750;
      cube.angle += cube.speedRot;

      const scale = 350 / (350 + cube.z);
      const x = cube.x * scale + cx;
      const y = cube.y * scale + cy;
      const s = cube.size * scale;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(cube.angle);
      ctx.strokeStyle = cube.color;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 20; ctx.shadowColor = cube.color;
      ctx.strokeRect(-s / 2, -s / 2, s, s);
      ctx.fillStyle = cube.color;
      ctx.globalAlpha = 0.25;
      ctx.fillRect(-s / 2, -s / 2, s, s);
      ctx.restore();
    });

    requestAnimationFrame(render);
  }

  render();
}

function initSignup3DWave() {
  const canvas = create3DCanvas('canvas-3d-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const cols = 55; const rows = 32;
  let step = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);
    step += 0.05;
    const cx = width / 2; const cy = height * 0.6;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * 30;
        const z = r * 30 + 70;
        const y = Math.sin(step + c * 0.2 + r * 0.3) * 55;

        const scale = 380 / (380 + z);
        const px = x * scale + cx;
        const py = y * scale + cy + r * 7.5;

        ctx.beginPath();
        ctx.arc(px, py, Math.max(2, 4.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = r % 2 === 0 ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 255, 157, 0.8)';
        ctx.shadowBlur = 12; ctx.shadowColor = '#00f0ff';
        ctx.fill();
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

function initDashboard3DConstellation() {
  const canvas = create3DCanvas('canvas-3d-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const nodes = [];
  for (let i = 0; i < 80; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 4 + 2,
      color: i % 2 === 0 ? '#00f0ff' : '#818cf8'
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    nodes.forEach((node, i) => {
      node.x += node.vx; node.y += node.vy;
      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.shadowBlur = 15; ctx.shadowColor = node.color;
      ctx.fill();

      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = node.x - other.x; const dy = node.y - other.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y); ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 * (1 - dist / 140)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(render);
  }

  render();
}

function initAdmin3DMatrix() {
  const canvas = create3DCanvas('canvas-3d-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const streams = [];
  for (let i = 0; i < 55; i++) {
    streams.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 4 + 2,
      length: Math.random() * 150 + 70,
      color: i % 3 === 0 ? '#00f0ff' : (i % 3 === 1 ? '#a855f7' : '#00ff9d')
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    streams.forEach(stream => {
      stream.y += stream.speed;
      if (stream.y > height) stream.y = -stream.length;

      const grad = ctx.createLinearGradient(stream.x, stream.y, stream.x, stream.y - stream.length);
      grad.addColorStop(0, stream.color);
      grad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(stream.x, stream.y);
      ctx.lineTo(stream.x, stream.y - stream.length);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.2;
      ctx.shadowBlur = 15; ctx.shadowColor = stream.color;
      ctx.stroke();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* 3D TILT EFFECT ON HOVER FOR METRIC & FEATURE CARDS */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.dash-metric-card, .service-card, .feature-card, .node-card, .settings-card, .admin-hero-card, .bento-card');

  cards.forEach(card => {
    card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
    card.style.transformStyle = 'preserve-3d';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(12px)`;
      card.style.boxShadow = `0 20px 40px rgba(0, 240, 255, 0.3), 0 0 30px rgba(99, 102, 241, 0.35)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.boxShadow = '';
    });
  });
}
