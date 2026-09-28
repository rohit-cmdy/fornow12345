import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import {
  IconMenu,
  IconBell,
  IconSun,
  IconMoon,
  IconUserCircle,
  IconSettings,
  IconLogOut,
} from './icons.jsx';
import { ALERTS } from '../data/mockData.js';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Header({ role, activePage, onOpenMobileNav, onLogout }) {
  const { theme, toggleTheme } = useTheme();
  const now = useClock();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // close dropdowns on outside click
  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const roleLabel = role === 'admin' ? 'Security Operator' : 'User (Client)';
  const roleInitials = role === 'admin' ? 'SO' : 'U';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={onOpenMobileNav} aria-label="Open menu">
          <IconMenu size={22} />
        </button>
        <div>
          <h1 className="page-title">{activePage === 'Dashboard' ? 'Security Dashboard' : activePage}</h1>
          <p className="page-sub">{dateStr} · {timeStr}</p>
        </div>
      </div>

      <div className="topbar-right">
        <div className="system-status-pill">
          <span className="pulse-dot"></span>
          <span>All Systems Operational</span>
        </div>

        <button className="topbar-icon-btn" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle light / dark mode">
          {theme === 'dark' ? <IconSun size={17} /> : <IconMoon size={17} />}
        </button>

        <div className="topbar-icon-btn" ref={notifRef}>
          <button
            className="icon-btn-trigger"
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <IconBell size={18} />
            {ALERTS.length > 0 && <span className="icon-badge">{ALERTS.length}</span>}
          </button>

          {notifOpen && (
            <div className="notif-dropdown open">
              <div className="notif-dropdown-head">
                <span>Notifications</span>
              </div>
              <div className="notif-list">
                {ALERTS.slice(0, 4).map((a) => (
                  <div className="notif-row" key={a.id}>
                    <span className={`dot ${a.severity === 'critical' ? 'dot-red' : a.severity === 'high' ? 'dot-amber' : 'dot-blue'}`} style={{ marginTop: 5 }}></span>
                    <div className="notif-row-text">
                      <strong>{a.message}</strong>
                      {a.source}
                      <div className="notif-row-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="topbar-profile" ref={profileRef}>
          <button
            className="icon-btn-trigger"
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            aria-label="Profile menu"
          >
            <div className="topbar-avatar">{roleInitials}</div>
          </button>

          {profileOpen && (
            <div className="profile-dropdown open">
              <div className="profile-dropdown-head">
                <div className="topbar-avatar">{roleInitials}</div>
                <div>
                  <strong>{roleLabel}</strong>
                  <span>{role}@monitor.local</span>
                </div>
              </div>
              <button className="profile-dropdown-item">
                <IconUserCircle size={15} />
                View Profile
              </button>
              <button className="profile-dropdown-item">
                <IconSettings size={15} />
                Preferences
              </button>
              <div className="profile-dropdown-divider"></div>
              <button className="profile-dropdown-item danger" onClick={onLogout}>
                <IconLogOut size={15} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
