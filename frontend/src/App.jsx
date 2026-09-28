import { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import CameraModal from './components/CameraModal.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import LiveMonitoringPage from './pages/LiveMonitoringPage.jsx';
import EventsAlertsPage from './pages/EventsAlertsPage.jsx';
import AudioAnalysisPage from './pages/AudioAnalysisPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import StubPage from './pages/StubPage.jsx';
import { ADMIN_NAV_ITEMS, USER_NAV_ITEMS } from './data/mockData.js';
import { logout } from './api.js';

function AppShell() {
  const { setTheme } = useTheme();
  const [role, setRole] = useState(() => localStorage.getItem('app_role'));
  const [activePage, setActivePage] = useState('Dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeCamera, setActiveCamera] = useState(null);

  function handleSelectRole(selectedRole) {
    setRole(selectedRole);
    localStorage.setItem('app_role', selectedRole);
    // Admin defaults to dark (control-room feel), User defaults to light —
    // both remain fully switchable afterwards from Settings.
    setTheme(selectedRole === 'admin' ? 'dark' : 'light');
    setActivePage('Dashboard');
  }

  function handleSwitchRole() {
    handleSelectRole(role === 'admin' ? 'user' : 'admin');
  }

  function handleLogout() {
    setRole(null);
    logout();
    localStorage.removeItem('app_role');
    setActivePage('Dashboard');
  }

  if (!role) {
    return <AuthPage onAuthenticated={handleSelectRole} />;
  }

  const navItems = role === 'admin' ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  function renderPage() {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage onOpenCamera={setActiveCamera} />;
      case 'Live Monitoring':
        return <LiveMonitoringPage onOpenCamera={setActiveCamera} />;
      case 'Events & Alerts':
        return <EventsAlertsPage />;
      case 'Audio Analysis':
        return <AudioAnalysisPage onNavigate={setActivePage} />;
      case 'Reports':
        return <ReportsPage />;
      case 'Settings':
        return <SettingsPage role={role} onSwitchRole={handleSwitchRole} />;
      default:
        return <StubPage title={activePage} />;
    }
  }

  return (
    <div className={`app-shell ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {mobileNavOpen && <div className="mobile-overlay show" onClick={() => setMobileNavOpen(false)} />}

      <Sidebar
        role={role}
        navItems={navItems}
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          setMobileNavOpen(false);
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
        mobileOpen={mobileNavOpen}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
      />

      <div className="app-main">
        <Header
          role={role}
          activePage={activePage}
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onLogout={handleLogout}
        />
        <main className="app-content">{renderPage()}</main>
      </div>

      <CameraModal camera={activeCamera} onClose={() => setActiveCamera(null)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider initialTheme="light">
      <AppShell />
    </ThemeProvider>
  );
}
