import AlertsPanel from '../components/AlertsPanel.jsx';
import EventsTable from '../components/EventsTable.jsx';

export default function EventsAlertsPage() {
  return (
    <div className="page-stack">
      <section className="grid-2col">
        <EventsTable />
        <AlertsPanel title="Active Alerts" />
      </section>
    </div>
  );
}
