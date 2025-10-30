import Spline from '@splinetool/react-spline';

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Interactive 3D scene */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/wwTRdG1D9CkNs368/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient and grain overlays (non-blocking for interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0b12]/40 to-[#0b0b12]" />
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at top, rgba(147,51,234,0.25), transparent 60%), radial-gradient(ellipse at bottom, rgba(59,130,246,0.25), transparent 60%)' }} />

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_3px_rgba(168,85,247,0.8)]" />
            Realtime Analytics
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-black leading-tight">
            Music Event Analytics
            <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">Dashboard</span>
          </h1>
          <p className="mt-4 text-white/70 max-w-xl">
            Track hype velocity, audience demographics, and live attendee activity in a polished, futuristic interface designed for professional organizers.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-2.5 text-sm font-semibold shadow-[0_0_30px_0_rgba(59,130,246,0.4)] hover:opacity-90 transition">
              View Live
            </button>
            <button className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition">
              Export Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
