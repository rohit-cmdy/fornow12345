import CameraGrid from '../components/CameraGrid.jsx';

export default function LiveMonitoringPage({ onOpenCamera }) {
  return (
    <div className="page-stack">
      <div className="panel">
        <div className="panel-head">
          <h2>Live Monitoring</h2>
          <span className="panel-head-meta"><span className="dot dot-green"></span>2 feeds active</span>
        </div>
        <CameraGrid onOpenCamera={onOpenCamera} size="large" />
      </div>
    </div>
  );
}
