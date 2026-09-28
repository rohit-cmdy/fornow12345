import { useEffect } from 'react';
import { IconClose } from './icons.jsx';

export default function CameraModal({ camera, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = camera ? 'hidden' : '';
    return () => document.removeEventListener('keydown', onKey);
  }, [camera, onClose]);

  if (!camera) return null;

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={camera.name}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <IconClose size={16} />
        </button>
        <div className="modal-video">
          <div className="modal-live-badge">
            <span className="rec-dot"></span>LIVE
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-header-row">
            <h3>{camera.name} · {camera.location}</h3>
            <span className="stat-tag tag-green">Connected</span>
          </div>
          <p className="modal-location">{camera.location}</p>

          <div className="modal-spec-grid">
            <div className="modal-spec"><span>Resolution</span><strong>{camera.resolution}</strong></div>
            <div className="modal-spec"><span>Frame Rate</span><strong>{camera.fps} FPS</strong></div>
            <div className="modal-spec"><span>Connection</span><strong>Stable · 14ms</strong></div>
            <div className="modal-spec"><span>Storage</span><strong>72h rolling</strong></div>
          </div>

          <div className="modal-detection">
            <span className="modal-detection-label">Last Detected Event</span>
            <div className="modal-detection-row">
              <span className={`dot ${camera.tagLevel === 'critical' ? 'dot-red' : 'dot-amber'}`}></span>
              <span>{camera.lastEvent}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
