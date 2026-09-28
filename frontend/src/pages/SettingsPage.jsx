import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { IconSun, IconMoon, IconChevronsSwitch } from '../components/icons.jsx';

export default function SettingsPage({ role, onSwitchRole }) {
  const { theme, setTheme } = useTheme();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  return (
    <div className="page-stack">
      <div className="panel">
        <div className="panel-head">
          <h2>Appearance</h2>
        </div>
        <p className="settings-desc">Choose how the security monitor looks on this device.</p>

        <div className="theme-option-row">
          <button
            className={`theme-option ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <IconSun size={20} />
            <span>Light Mode</span>
          </button>
          <button
            className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <IconMoon size={20} />
            <span>Dark Mode</span>
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Notifications</h2>
        </div>

        <div className="settings-row">
          <div>
            <span className="settings-row-title">Email Alerts</span>
            <span className="settings-row-sub">Receive an email when a high-priority event is detected.</span>
          </div>
          <button
            className={`toggle-switch ${emailAlerts ? 'on' : ''}`}
            onClick={() => setEmailAlerts((v) => !v)}
            aria-pressed={emailAlerts}
          >
            <span className="toggle-knob"></span>
          </button>
        </div>

        <div className="settings-row">
          <div>
            <span className="settings-row-title">Critical Alerts Only</span>
            <span className="settings-row-sub">Mute normal and medium severity notifications.</span>
          </div>
          <button
            className={`toggle-switch ${criticalOnly ? 'on' : ''}`}
            onClick={() => setCriticalOnly((v) => !v)}
            aria-pressed={criticalOnly}
          >
            <span className="toggle-knob"></span>
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h2>Account</h2>
        </div>
        <div className="settings-row">
          <div>
            <span className="settings-row-title">Current role</span>
            <span className="settings-row-sub">
              You're viewing the {role === 'admin' ? 'Admin' : 'User'} workspace.
            </span>
          </div>
          <button className="switch-role-btn inline" onClick={onSwitchRole}>
            <IconChevronsSwitch size={15} />
            <span>Switch to {role === 'admin' ? 'User' : 'Admin'} view</span>
          </button>
        </div>
      </div>
    </div>
  );
}
