import StatCards from '../components/StatCards.jsx';
import CameraGrid from '../components/CameraGrid.jsx';
import AlertsPanel from '../components/AlertsPanel.jsx';
import SystemHealth from '../components/SystemHealth.jsx';
import ActivityChart from '../components/ActivityChart.jsx';
import DetectionPipeline from '../components/DetectionPipeline.jsx';
import EventsTable from '../components/EventsTable.jsx';

export default function DashboardPage({ onOpenCamera }) {
  return (
    <div className="page-stack">
      <StatCards />

      <section className="grid-2col">
        <div className="panel">
          <div className="panel-head">
            <h2>Live Camera Feeds</h2>
            <span className="panel-head-meta"><span className="dot dot-green"></span>2 feeds active</span>
          </div>
          <CameraGrid onOpenCamera={onOpenCamera} />
        </div>

        <AlertsPanel title="Recent Alerts" limit={5} />
      </section>

      <section className="grid-2col">
        <SystemHealth />
        <ActivityChart />
      </section>

      <DetectionPipeline />

      <EventsTable />
    </div>
  );
}
