import { useState } from 'react';
import {
  IconAlertTriangle,
  IconWaveform,
  IconCamera,
  IconTarget,
  IconChevronRight,
} from './icons.jsx';
import { RECENT_REPORTS } from '../data/mockData.js';

const TYPE_ICON = {
  'Weapon Detection': IconAlertTriangle,
  'Audio Analysis': IconWaveform,
  'Video Detection': IconCamera,
  'Object Recognition': IconTarget,
};

const PRIORITY_LABEL = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
const STATUS_LABEL = { open: 'Open', progress: 'In Progress', resolved: 'Resolved' };

const COLLAPSED_COUNT = 5;

export default function ReportsTable() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? RECENT_REPORTS : RECENT_REPORTS.slice(0, COLLAPSED_COUNT);

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Recent Reports</h2>
        <button className="panel-link" onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Show Less' : `View All (${RECENT_REPORTS.length}) →`}
        </button>
      </div>

      <div className="table-scroll">
        <table className="events-table reports-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Event</th>
              <th>Priority</th>
              <th>Location</th>
              <th>Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => {
              const TypeIcon = TYPE_ICON[r.type];
              return (
                <tr key={r.id}>
                  <td className="cell-time">{r.id}</td>
                  <td>
                    <span className={`type-badge tone-${r.typeTone}`}>
                      <TypeIcon size={13} />
                      {r.type}
                    </span>
                  </td>
                  <td>{r.event}</td>
                  <td><span className={`severity-badge ${r.priority}`}>{PRIORITY_LABEL[r.priority]}</span></td>
                  <td className="cell-camera">{r.location}</td>
                  <td className="cell-time">{r.time}</td>
                  <td><span className={`status-badge ${r.status}`}>{STATUS_LABEL[r.status]}</span></td>
                  <td><IconChevronRight size={14} className="row-chevron" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
