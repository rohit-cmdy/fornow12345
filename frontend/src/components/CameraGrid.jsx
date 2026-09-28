import { IconCamera, IconWifi, IconExpand } from './icons.jsx';
import { CAMERAS } from '../data/mockData.js';

export default function CameraGrid({ onOpenCamera, size = 'default' }) {
  return (
    <div className={`camera-grid ${size === 'large' ? 'camera-grid-large' : ''}`}>
      {CAMERAS.map((cam) => (
        <div className="camera-card" key={cam.id} onClick={() => onOpenCamera(cam)}>
          <div className="camera-feed">
            <div className="feed-grid-overlay"></div>
            <div className="camera-feed-icon">
              <IconCamera size={46} />
            </div>
            <div className="live-badge">
              <span className="rec-dot"></span>LIVE
            </div>
            <div className="conn-badge">
              <IconWifi size={13} />
            </div>
            <span className={`feed-tag tag-${cam.tagLevel}`}>{cam.tag}</span>
            <button
              className="feed-fullscreen"
              aria-label={`Fullscreen ${cam.name}`}
              onClick={(e) => {
                e.stopPropagation();
                onOpenCamera(cam);
              }}
            >
              <IconExpand size={13} />
            </button>
          </div>
          <div className="camera-meta">
            <div className="camera-meta-left">
              <span className="camera-name">{cam.name} · {cam.location}</span>
              <span className="camera-location">{cam.resolution} · {cam.fps} FPS</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
