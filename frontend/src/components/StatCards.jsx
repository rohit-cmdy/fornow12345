import { IconCamera, IconActivity, IconWaveform, IconAlertTriangle } from './icons.jsx';
import { STATS } from '../data/mockData.js';

const ICONS = {
  camera: IconCamera,
  activity: IconActivity,
  audio: IconWaveform,
  alert: IconAlertTriangle,
};

export default function StatCards() {
  return (
    <section className="stat-grid" aria-label="Overview statistics">
      {STATS.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <div className="stat-card" key={s.id}>
            <div className={`stat-icon-wrap stat-icon-${s.tone}`}>
              <Icon size={20} />
            </div>
            <div className="stat-body">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
              <span className={`stat-tag tag-${s.tone === 'red' ? 'red' : s.tone === 'green' ? 'green' : 'neutral'}`}>
                {s.meta}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
