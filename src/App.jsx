import HeroSection from './components/HeroSection.jsx';
import HypeVelocityChart from './components/HypeVelocityChart.jsx';
import AudienceDonutChart from './components/AudienceDonutChart.jsx';
import LiveAttendeeGlobe from './components/LiveAttendeeGlobe.jsx';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0b0b12] text-white">
      <HeroSection />

      <main className="mx-auto max-w-7xl px-6 pb-20 -mt-10">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-[#0f1120] border border-white/10 shadow-xl shadow-purple-500/10">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold tracking-tight">Hype Velocity</h2>
              <p className="text-xs text-white/60">Real-time momentum across socials, streams, and buzz</p>
            </div>
            <div className="p-4">
              <HypeVelocityChart />
            </div>
          </div>

          <div className="rounded-2xl bg-[#0f1120] border border-white/10 shadow-xl shadow-blue-500/10">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold tracking-tight">Audience Demographics</h2>
              <p className="text-xs text-white/60">Breakdown by listener profile</p>
            </div>
            <div className="p-4">
              <AudienceDonutChart />
            </div>
          </div>

          <div className="lg:col-span-3 rounded-2xl bg-[#0f1120] border border-white/10 shadow-xl shadow-purple-500/10">
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">Live Attendee Map</h2>
                <p className="text-xs text-white/60">Glowing pings indicate live check-ins</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/60">
                <span className="inline-block h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_12px_2px_rgba(168,85,247,0.7)]" />
                Live
              </div>
            </div>
            <div className="p-4">
              <LiveAttendeeGlobe />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
