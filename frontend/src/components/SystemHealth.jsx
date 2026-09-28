import { HEALTH, LATENCY_MS } from '../data/mockData.js';

const GAUGE_COLORS = {
  cpu: 'var(--c-blue)',
  ram: 'var(--c-purple)',
  gpu: 'var(--c-green)',
};

function CircularGauge({ label, value, color }) {
  const size = 74;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="gauge">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-hover)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
        <text x="50%" y="53%" textAnchor="middle" className="gauge-value" fill="var(--text-primary)">
          {value}%
        </text>
      </svg>
      <span className="gauge-label">{label}</span>
    </div>
  );
}

export default function SystemHealth() {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>System Health</h2>
      </div>

      <div className="gauge-row">
        {HEALTH.map((h) => (
          <CircularGauge key={h.id} label={h.label} value={h.value} color={GAUGE_COLORS[h.id]} />
        ))}

        <div className="latency-block">
          <span className="latency-label">Latency</span>
          <span className="latency-value">~{LATENCY_MS} ms</span>
          <span className="stat-tag tag-green">Within Range</span>
        </div>
      </div>
    </div>
  );
}
