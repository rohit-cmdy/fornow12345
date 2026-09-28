import { useEffect, useMemo, useState } from 'react';
import { IconSearch } from './icons.jsx';
import { getEvents } from '../api.js';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'normal', label: 'Normal' },
  { key: 'medium', label: 'Medium' },
  { key: 'high', label: 'High' },
];

function severityDot(sev) {
  if (sev === 'high') return 'dot-red';
  if (sev === 'medium') return 'dot-amber';
  return 'dot-green';
}

export default function EventsTable() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getEvents()
      .then((data) => {
        if (!active) return;
        setEvents(data.map((event) => ({
          ...event,
          camera: event.camera_id,
          event: event.event_type,
          severity: event.metadata?.severity || 'normal',
          time: new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        })));
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || 'Unable to load events.');
      });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    return events.filter((ev) => {
      const matchesFilter = filter === 'all' || ev.severity === filter || (filter === 'normal' && ev.severity === 'low');
      const haystack = `${ev.camera} ${ev.event}`.toLowerCase();
      const matchesSearch = haystack.includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [events, search, filter]);

  return (
    <div className="panel">
      <div className="panel-head panel-head-wrap">
        <h2>Recent Events</h2>
        <div className="events-controls">
          <div className="search-box">
            <IconSearch size={15} />
            <input
              type="text"
              placeholder="Search events, cameras..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-chips">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`chip ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-scroll">
        {error ? (
          <p className="empty-state">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="empty-state">No events match your search.</p>
        ) : (
          <table className="events-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Camera</th>
                <th>Event Type</th>
                <th>Confidence</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ev, i) => (
                <tr key={i}>
                  <td className="cell-time">{ev.time}</td>
                  <td className="cell-camera">{ev.camera}</td>
                  <td>{ev.event}</td>
                  <td className="cell-time">{Math.round(ev.confidence * 100)}%</td>
                  <td>
                    <span className="status-cell">
                      <span className={`dot ${severityDot(ev.severity)}`}></span>
                      {ev.severity.charAt(0).toUpperCase() + ev.severity.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
