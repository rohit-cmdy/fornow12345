import { useEffect, useMemo, useRef, useState } from 'react';
import StatCardRow from '../components/StatCardRow.jsx';
import DonutChart from '../components/DonutChart.jsx';
import ReportsTable from '../components/ReportsTable.jsx';
import { IconChevronDown } from '../components/icons.jsx';
import {
  REPORT_STATS,
  REPORTS_TIMELINE,
  REPORT_SEVERITY_BREAKDOWN,
  REPORT_TYPE_DISTRIBUTION,
  TOTAL_REPORTS,
} from '../data/mockData.js';

const RANGE_OPTIONS = ['Last 7 Days', 'Last 30 Days', 'This Month'];

// Deterministically reshapes the base week of data for the other range
// options so the selector visibly does something without a real backend yet.
function buildTimelineForRange(range) {
  if (range === 'Last 7 Days') return REPORTS_TIMELINE;

  const config = {
    'Last 30 Days': { labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'], scale: 3.6 },
    'This Month': { labels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'], scale: 2.4 },
  }[range];

  const data = config.labels.map((_, i) => {
    const base = REPORTS_TIMELINE.data[i % REPORTS_TIMELINE.data.length];
    return Math.max(1, Math.round(base * config.scale));
  });

  return { labels: config.labels, data };
}

function TimelineChart({ labels, data }) {
  const W = 560, H = 200;
  const padL = 28, padR = 10, padT = 14, padB = 14;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const maxVal = Math.max(...data, 1) * 1.2;
  const stepX = plotW / Math.max(labels.length - 1, 1);
  const yToPixel = (v) => padT + plotH - (v / maxVal) * plotH;
  const xToPixel = (i) => padL + i * stepX;

  const points = data.map((v, i) => `${xToPixel(i)},${yToPixel(v)}`).join(' ');
  const areaPoints = `${padL},${padT + plotH} ${points} ${xToPixel(data.length - 1)},${padT + plotH}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="reports-chart">
      {[0, 1, 2, 3].map((i) => {
        const y = padT + (plotH / 3) * i;
        return <line key={i} x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--border-subtle)" strokeWidth="1" />;
      })}
      <polygon points={areaPoints} fill="var(--c-blue)" opacity="0.1" />
      <polyline points={points} fill="none" stroke="var(--c-blue)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {data.map((v, i) => (
        <circle key={i} cx={xToPixel(i)} cy={yToPixel(v)} r="3" fill="var(--c-blue)" />
      ))}
    </svg>
  );
}

function RangeDropdown({ range, setRange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="range-dropdown" ref={ref}>
      <button className="range-dropdown-trigger" onClick={() => setOpen((v) => !v)}>
        {range}
        <IconChevronDown size={13} />
      </button>
      {open && (
        <div className="range-dropdown-menu">
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={opt === range ? 'active' : ''}
              onClick={() => { setRange(opt); setOpen(false); }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReportsPage() {
  const [range, setRange] = useState('Last 7 Days');
  const timeline = useMemo(() => buildTimelineForRange(range), [range]);

  return (
    <div className="page-stack">
      <StatCardRow stats={REPORT_STATS} />

      <section className="grid-2col">
        <div className="panel">
          <div className="panel-head">
            <h2>Reports Overview</h2>
            <RangeDropdown range={range} setRange={setRange} />
          </div>

          <div className="reports-chart-row">
            <div className="reports-chart-col">
              <TimelineChart labels={timeline.labels} data={timeline.data} />
              <div className="chart-x-labels">
                {timeline.labels.map((l) => <span key={l}>{l}</span>)}
              </div>
            </div>
            <div className="reports-breakdown-col">
              {REPORT_SEVERITY_BREAKDOWN.map((b) => (
                <div className="breakdown-row" key={b.label}>
                  <span className="breakdown-dot" style={{ background: b.color }}></span>
                  <span className="breakdown-label">{b.label}</span>
                  <span className="breakdown-value">{b.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Report Type Distribution</h2>
          </div>
          <div className="donut-row">
            <DonutChart data={REPORT_TYPE_DISTRIBUTION} centerValue={TOTAL_REPORTS} centerLabel="Total Reports" />
            <div className="donut-legend">
              {REPORT_TYPE_DISTRIBUTION.map((d) => (
                <div className="donut-legend-row" key={d.label}>
                  <span className="legend-swatch" style={{ background: d.color }}></span>
                  <span className="donut-legend-label">{d.label}</span>
                  <span className="donut-legend-value">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReportsTable />
    </div>
  );
}
