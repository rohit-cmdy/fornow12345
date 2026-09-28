import { IconShield, IconLogOut, IconChevronsSwitch, NAV_ICON_MAP } from './icons.jsx';

export default function Sidebar({
  role,
  navItems,
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onLogout,
  onSwitchRole,
}) {
  const roleLabel = role === 'admin' ? 'Security Operator' : 'User (Client)';
  const roleInitials = role === 'admin' ? 'SO' : 'U';

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-top">
        <div className="brand">
          <div className="brand-mark">
            <IconShield size={22} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Multimodal</span>
            <span className="brand-sub">Security System</span>
          </div>
        </div>
        <button className="sidebar-collapse-btn" onClick={onToggleCollapse} aria-label="Collapse sidebar">
          <IconChevronsSwitch size={15} />
        </button>
      </div>

      <nav className="nav">
        <div className="nav-group">
          {navItems.map((label) => {
            const Icon = NAV_ICON_MAP[label];
            const isActive = label === activePage;
            return (
              <a
                key={label}
                href="#"
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(label);
                }}
              >
                {Icon && <Icon className="nav-icon" />}
                <span>{label}</span>
              </a>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-bottom">
        {role === 'user' && (
          <button className="switch-role-btn" onClick={onSwitchRole}>
            <IconChevronsSwitch size={15} />
            <span>Admin Panel</span>
          </button>
        )}

        <div className="operator-card">
          <div className="operator-avatar">{roleInitials}</div>
          <div className="operator-meta">
            <span className="operator-name">{roleLabel}</span>
            <span className="operator-status">
              <span className="dot dot-green"></span>Online
            </span>
          </div>
          <button className="operator-settings" onClick={onLogout} aria-label="Log out" title="Log out">
            <IconLogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
