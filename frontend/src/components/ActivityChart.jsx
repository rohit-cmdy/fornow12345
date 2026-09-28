import { useMemo, useState } from 'react';
import { CHART_SERIES, CHART_LABELS } from '../data/mockData.js';

const RANGES = ['1H', '6H', '24H', '7D'];

// Deterministically reshapes the base series for a given range so switching
// ranges visibly changes the chart without needing a real backend yet.
function buildDataForRange(range) {
  if (range === '1H') return { labels: CHART_LABELS, series: CHART_SERIES };

  const config = {
    '6H': { labels: ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30'], scale: 1.4 },
    '24H': { labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'], scale: 2.4 },
    '7D': { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], scale: 5.2 },
  }[range];

  const series = CHART_SERIES.map((s, si) => ({
    ...s,
    data: config.labels.map((_, i) => {
      const base = s.data[i % s.data.length];
      const wobble = ((i * 7 + si * 3) % 5) - 2; // small deterministic variation
      return Math.max(0, Math.round(base * config.scale + wobble));
    }),
  }));

  return { labels: config.labels, series };
}

export default function ActivityChart() {
  const [range, setRange] = useState('1H');
  const { labels, series } = useMemo(() => buildDataForRange(range), [range]);

  const W = 560, H = 220;
  const padL = 30, padR = 10, padT = 14, padB = 14;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxVal = Math.max(...series.flatMap((s) => s.data), 1) * 1.15;
  const stepX = plotW / Math.max(labels.length - 1, 1);

  const yToPixel = (v) => padT + plotH - (v / maxVal) * plotH;
  const xToPixel = (i) => padL + i * stepX;

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Security Activity</h2>
        <div className="range-toggle">
          {RANGES.map((r) => (
            <button
              key={r}
              className={`range-btn ${range === r ? 'active' : ''}`}
              onClick={() => setRange(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-legend">
        {series.map((s) => (
          <div className="legend-item" key={s.name}>
            <span className="legend-swatch" style={{ background: s.color }}></span>
            {s.name}
          </div>
        ))}
      </div>

      <div className="chart-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="activity-chart">
          {[0, 1, 2, 3, 4].map((i) => {
            const y = padT + (plotH / 4) * i;
            return <line key={i} x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--border-subtle)" strokeWidth="1" />;
          })}

          {series.map((s, si) => {
            const points = s.data.map((v, i) => `${xToPixel(i)},${yToPixel(v)}`).join(' ');
            const areaPoints = si === 0
              ? `${padL},${padT + plotH} ${points} ${xToPixel(s.data.length - 1)},${padT + plotH}`
              : null;

            return (
              <g key={s.name}>
                {areaPoints && <polygon points={areaPoints} fill={s.color} opacity="0.08" />}
                <polyline points={points} fill="none" stroke={s.color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
                {s.data.map((v, i) => (
                  <circle key={i} cx={xToPixel(i)} cy={yToPixel(v)} r="2.6" fill={s.color} />
                ))}
              </g>
            );
          })}
        </svg>
        <div className="chart-x-labels">
          {labels.map((l) => <span key={l}>{l}</span>)}
        </div>
      </div>
    </div>
  );
}
