import {
  IconWaveform,
  IconMic,
  IconSpeaker,
  IconAlertTriangle,
  IconFileText,
  IconCheck,
  IconTrendUp,
} from './icons.jsx';

const ICONS = {
  waveform: IconWaveform,
  mic: IconMic,
  speaker: IconSpeaker,
  alert: IconAlertTriangle,
  fileText: IconFileText,
  check: IconCheck,
};

export default function StatCardRow({ stats }) {
  return (
    <section className="stat-grid" aria-label="Overview statistics">
      {stats.map((s) => {
        const Icon = ICONS[s.icon];
        return (
          <div className="stat-card" key={s.id}>
            <div className={`stat-icon-wrap stat-icon-${s.tone}`}>
              <Icon size={20} />
            </div>
            <div className="stat-body">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>

              {s.trend && (
                <span className="stat-trend">
                  <IconTrendUp size={12} />
                  {s.trend}
                  <span className="stat-trend-sub">vs. last 7 days</span>
                </span>
              )}

              {s.badge && (
                <span className={`stat-tag tag-${s.tone}`}>{s.badge}</span>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
