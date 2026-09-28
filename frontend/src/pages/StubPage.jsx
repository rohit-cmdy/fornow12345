import { NAV_ICON_MAP, IconFileText } from '../components/icons.jsx';

export default function StubPage({ title }) {
  const Icon = NAV_ICON_MAP[title] || IconFileText;

  return (
    <div className="page-stack">
      <div className="panel stub-panel">
        <div className="stub-icon">
          <Icon size={28} />
        </div>
        <h2>{title}</h2>
        <p>
          This section is scaffolded and ready to be connected to a real backend or data
          source — the layout, theming and navigation are already wired up.
        </p>
      </div>
    </div>
  );
}
