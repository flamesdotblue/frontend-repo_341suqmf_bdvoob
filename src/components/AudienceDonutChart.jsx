// Neon donut chart with legend
export default function AudienceDonutChart() {
  const segments = [
    { label: '18-24', value: 32, color: '#a78bfa' },
    { label: '25-34', value: 41, color: '#60a5fa' },
    { label: '35-44', value: 17, color: '#e879f9' },
    { label: '45+', value: 10, color: '#22d3ee' },
  ];

  const total = segments.reduce((a, b) => a + b.value, 0);
  const size = 260;
  const stroke = 24;
  const radius = (size - stroke) / 2;
  const center = size / 2;
  let cumulative = 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[320px]" role="img" aria-label="Audience demographics donut chart">
        <defs>
          <filter id="glow-arc">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle cx={center} cy={center} r={radius} fill="#0b0b12" />
        {segments.map((seg, idx) => {
          const start = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
          const end = ((cumulative + seg.value) / total) * Math.PI * 2 - Math.PI / 2;
          cumulative += seg.value;

          const x1 = center + radius * Math.cos(start);
          const y1 = center + radius * Math.sin(start);
          const x2 = center + radius * Math.cos(end);
          const y2 = center + radius * Math.sin(end);
          const largeArc = end - start > Math.PI ? 1 : 0;

          const d = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;

          return (
            <path
              key={idx}
              d={d}
              stroke={seg.color}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.6))' }}
            />
          );
        })}
        <g transform={`translate(${center}, ${center})`} textAnchor="middle">
          <text className="fill-white text-2xl font-bold">{total}%</text>
          <text y="22" className="fill-white/60 text-xs">Audience</text>
        </g>
      </svg>

      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm w-full max-w-sm">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color, boxShadow: `0 0 10px ${s.color}99` }} />
            <span className="text-white/80">{s.label}</span>
            <span className="ml-auto text-white/60">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
