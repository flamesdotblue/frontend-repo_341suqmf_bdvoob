import { useMemo } from 'react';

// Simple SVG line chart with neon glow
export default function HypeVelocityChart() {
  // Mock data: last 24 hours at 1h interval
  const points = useMemo(() => {
    const base = 40;
    const arr = Array.from({ length: 24 }, (_, i) => {
      const wave = Math.sin(i / 3) * 12 + Math.cos(i / 2.2) * 6;
      const noise = (Math.random() - 0.5) * 6;
      return Math.max(8, base + wave + noise + i * 0.6);
    });
    return arr;
  }, []);

  const width = 900;
  const height = 280;
  const padding = 40;
  const maxVal = Math.max(...points) * 1.1;
  const minVal = Math.min(...points) * 0.9;

  const scaleX = (i) => padding + (i / (points.length - 1)) * (width - padding * 2);
  const scaleY = (v) => height - padding - ((v - minVal) / (maxVal - minVal)) * (height - padding * 2);

  const pathD = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i).toFixed(2)} ${scaleY(v).toFixed(2)}`)
    .join(' ');

  // Area under curve for subtle fill
  const areaD = `${points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(i).toFixed(2)} ${scaleY(v).toFixed(2)}`)
    .join(' ')} L ${scaleX(points.length - 1)} ${height - padding} L ${scaleX(0)} ${height - padding} Z`;

  const ticks = 6;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[280px]"
        role="img"
        aria-label="Hype Velocity line chart"
      >
        <defs>
          <linearGradient id="gradLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="50%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          <linearGradient id="gradArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(168,85,247,0.35)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid */}
        <g opacity="0.25">
          {Array.from({ length: ticks }).map((_, i) => {
            const y = padding + (i * (height - padding * 2)) / (ticks - 1);
            return (
              <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.07)" />
            );
          })}
        </g>

        {/* Area fill */}
        <path d={areaD} fill="url(#gradArea)" />

        {/* Line with glow */}
        <path d={pathD} stroke="url(#gradLine)" strokeWidth="3" fill="none" filter="url(#glow)" />

        {/* Points */}
        {points.map((v, i) => (
          <circle
            key={i}
            cx={scaleX(i)}
            cy={scaleY(v)}
            r={2.8}
            fill="#c084fc"
            style={{ filter: 'drop-shadow(0 0 8px rgba(168,85,247,0.9))' }}
          />
        ))}

        {/* Axes labels */}
        <g fontSize="10" fill="rgba(255,255,255,0.6)">
          {Array.from({ length: 6 }).map((_, i) => (
            <text key={i} x={padding + i * ((width - padding * 2) / 5)} y={height - 12} textAnchor="middle">
              {`${i * 4}h`}
            </text>
          ))}
          <text x={padding} y={18}>
            Velocity Index
          </text>
        </g>
      </svg>
    </div>
  );
}
