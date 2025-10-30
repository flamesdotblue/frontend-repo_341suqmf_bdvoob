import { useEffect, useMemo, useRef } from 'react';

// Wireframe globe with animated glowing pings to represent live attendees
export default function LiveAttendeeGlobe() {
  const canvasRef = useRef(null);

  // Precompute random points (lat/lon converted to 2D using simple equirect projection onto a circle)
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      const lat = (Math.random() * 180 - 90) * (Math.PI / 180);
      const lon = (Math.random() * 360 - 180) * (Math.PI / 180);
      pts.push({ lat, lon, phase: Math.random() * Math.PI * 2 });
    }
    return pts;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const drawGlobe = (t) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Background subtle gradient
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, 'rgba(147,51,234,0.12)');
      g.addColorStop(1, 'rgba(59,130,246,0.05)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.38;

      // Sphere glow
      const glow = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r);
      glow.addColorStop(0, 'rgba(168,85,247,0.12)');
      glow.addColorStop(1, 'rgba(168,85,247,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      // Wireframe latitude/longitude
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth = 1;
      for (let i = -60; i <= 60; i += 30) {
        const rr = r * Math.cos((i * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, rr, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, r, r * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Animated pings
      points.forEach((p, idx) => {
        const spin = t * 0.0002; // slow rotation
        const lon = p.lon + spin; // rotate around Y
        const x = Math.cos(p.lat) * Math.sin(lon);
        const y = Math.sin(p.lat);
        const z = Math.cos(p.lat) * Math.cos(lon); // depth

        // simple 3D to 2D projection on circle
        const px = cx + x * r * 0.95;
        const py = cy - y * r * 0.95;

        // fade back-facing points
        const visible = z > -0.2;
        if (!visible) return;

        const pulse = (Math.sin(t * 0.004 + p.phase + idx) + 1) / 2; // 0..1
        const size = 2 + pulse * 3;

        // glow
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, size * 4);
        glowGrad.addColorStop(0, 'rgba(168,85,247,0.9)');
        glowGrad.addColorStop(1, 'rgba(168,85,247,0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(px, py, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // core
        ctx.fillStyle = 'rgba(168,85,247,1)';
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = (t) => {
      drawGlobe(t || 0);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onResize = () => {
      // reset transform before rescale to avoid stacking scales
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [points]);

  return (
    <div className="relative w-full h-[420px] rounded-xl overflow-hidden bg-gradient-to-br from-[#0b0b12] to-[#0f1120]">
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* subtle corner glows */}
      <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full opacity-30" style={{
        background: 'radial-gradient(circle, rgba(167,139,250,0.8) 0%, rgba(167,139,250,0) 60%)'
      }} />
      <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20" style={{
        background: 'radial-gradient(circle, rgba(59,130,246,0.7) 0%, rgba(59,130,246,0) 60%)'
      }} />
    </div>
  );
}
