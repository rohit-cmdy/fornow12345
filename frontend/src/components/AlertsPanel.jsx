import { useEffect, useState } from 'react';
import { IconClose } from './icons.jsx';
import { getAlerts, markAlertRead } from '../api.js';

export default function AlertsPanel({ title = 'Recent Alerts', limit }) {
  const [alerts, setAlerts] = useState([]);
  const [dismissingId, setDismissingId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getAlerts()
      .then((data) => {
        if (!active) return;
        setAlerts(data.map((alert) => ({
          ...alert,
          message: alert.message || alert.alert_type,
          source: `Incident #${alert.incident_id}`,
          time: new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })));
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Unable to load alerts.');
      });
    return () => { active = false; };
  }, []);

  const visible = limit ? alerts.slice(0, limit) : alerts;

  async function dismiss(id) {
    setDismissingId(id);
    try {
      await markAlertRead(id);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    } catch (requestError) {
      setError(requestError.message || 'Unable to update alert.');
    } finally {
      setDismissingId(null);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{title}</h2>
        <span className="panel-head-meta">{alerts.length} open</span>
      </div>

      <div className="alert-list">
        {error && <div className="empty-alerts">{error}</div>}
        {!error && visible.length === 0 && <div className="empty-alerts">No active alerts. All clear.</div>}

        {visible.map((a) => (
          <div
            key={a.id}
            className={`alert-item sev-${a.severity} ${dismissingId === a.id ? 'dismissed' : ''}`}
          >
            <div className="alert-top">
              <span className={`alert-sev ${a.severity}`}>{a.severity.toUpperCase()}</span>
              <button className="alert-dismiss" aria-label="Dismiss alert" onClick={() => dismiss(a.id)}>
                <IconClose size={13} />
              </button>
            </div>
            <div className="alert-msg">{a.message}</div>
            <div className="alert-source">{a.source}</div>
            <div className="alert-time">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
