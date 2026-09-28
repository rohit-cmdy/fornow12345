import StatCardRow from '../components/StatCardRow.jsx';
import AudioWaveform from '../components/AudioWaveform.jsx';
import { IconMic, IconWaveform, IconSpeaker, IconChevronRight } from '../components/icons.jsx';
import { AUDIO_STATS, AUDIO_EVENTS } from '../data/mockData.js';

const SEVERITY_LABEL = { critical: 'Critical', high: 'High', medium: 'Medium', info: 'Info' };
const EVENT_ICON = { waveform: IconWaveform, speaker: IconSpeaker };

export default function AudioAnalysisPage({ onNavigate }) {
  return (
    <div className="page-stack">
      <StatCardRow stats={AUDIO_STATS} />

      <section className="grid-2col">
        <div className="panel">
          <div className="panel-head">
            <h2>Live Audio Feed</h2>
            <span className="panel-head-meta"><span className="dot dot-green"></span>Monitoring Active</span>
          </div>

          <div className="audio-feed-card">
            <div className="audio-feed-icon">
              <IconMic size={26} />
            </div>
            <div className="audio-feed-main">
              <AudioWaveform />
              <div className="audio-feed-meta">
                <div>
                  <span className="audio-feed-title">Live Audio Stream</span>
                  <span className="audio-feed-sub">Processing real-time audio...</span>
                </div>
                <span className="stat-tag tag-green">Normal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h2>Recent Audio Events</h2>
            <button className="panel-link" onClick={() => onNavigate && onNavigate('Events & Alerts')}>
              View All →
            </button>
          </div>

          <div className="audio-event-list">
            {AUDIO_EVENTS.map((ev) => {
              const EvIcon = EVENT_ICON[ev.icon];
              return (
                <div className="audio-event-row" key={ev.id}>
                  <div className={`audio-event-icon tone-${ev.severity}`}>
                    <EvIcon size={17} />
                  </div>
                  <div className="audio-event-info">
                    <span className="audio-event-title">{ev.title}</span>
                    <span className="audio-event-sub">{ev.zone} · {ev.time}</span>
                  </div>
                  <span className={`severity-badge ${ev.severity}`}>{SEVERITY_LABEL[ev.severity]}</span>
                  <IconChevronRight size={14} className="row-chevron" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
