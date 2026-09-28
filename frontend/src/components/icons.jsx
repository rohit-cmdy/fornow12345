// A small, dependency-free icon set. Every icon takes { size, className }
// and inherits color via currentColor, so it themes automatically.

const base = (size) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none' });

export function IconShield({ size = 20, className }) {
  return (
    <svg {...base(size)} className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 5.5V11C4 16.5 7.4 21.2 12 22C16.6 21.2 20 16.5 20 11V5.5L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12.2L11.2 14.4L15.5 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconGrid({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconCamera({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8.5C3 7.12 4.12 6 5.5 6H14.5C15.88 6 17 7.12 17 8.5V15.5C17 16.88 15.88 18 14.5 18H5.5C4.12 18 3 16.88 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 10.5L20.15 8.45C20.62 8.14 21.25 8.48 21.25 9.05V14.95C21.25 15.52 20.62 15.86 20.15 15.55L17 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBell({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 9C6 6.24 8.24 4 11 4H13C15.76 4 18 6.24 18 9V13.5L20 17H4L6 13.5V9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.5 17C9.5 18.38 10.62 19.5 12 19.5C13.38 19.5 14.5 18.38 14.5 17" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function IconFileText({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 3H14L19 8V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V5C5 3.9 5.9 3 7 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 12H15M9 16H15M9 8H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconSettings({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M19.4 15A1.65 1.65 0 0021 13.35 1.65 1.65 0 0019.4 9c-.5-.1-.9-.5-1-1a1.65 1.65 0 00-2.35-2.1c-.4.3-1 .3-1.4 0A1.65 1.65 0 0012.9 3a1.65 1.65 0 00-2.35 2.1c-.4.3-1 .3-1.4 0A1.65 1.65 0 006.6 6.9c-.1.5-.5.9-1 1A1.65 1.65 0 004.6 11a1.65 1.65 0 001.65 1.65c.5.1.9.5 1 1a1.65 1.65 0 002.35 2.1c.4-.3 1-.3 1.4 0a1.65 1.65 0 002.35 2.1c.4-.3 1-.3 1.4 0A1.65 1.65 0 0017.2 19c.1-.5.5-.9 1-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCameraGear({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8.5C3 7.12 4.12 6 5.5 6H12V18H5.5C4.12 18 3 16.88 3 15.5V8.5Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="14.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M17.5 12V12.9M17.5 16.1V17M15.8 13.2L16.5 13.6M18.5 15.4L19.2 15.8M15.8 15.8L16.5 15.4M18.5 13.6L19.2 13.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function IconWaveform({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 12H5L7 6L10 18L13 4L16 16L18 9L19 12H21" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBarChart({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 20V10M9.5 20V4M15 20V13M20.5 20V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconSun({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 2.5V5M12 19V21.5M4.5 12H2M22 12H19.5M5.6 5.6L7.3 7.3M16.7 16.7L18.4 18.4M18.4 5.6L16.7 7.3M7.3 16.7L5.6 18.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconMoon({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 14.5A8.5 8.5 0 119.5 4 6.8 6.8 0 0020 14.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLogOut({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 21H6C4.9 21 4 20.1 4 19V5C4 3.9 4.9 3 6 3H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronDown({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMenu({ size = 20, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconActivity({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 12H7L9.5 5L14.5 19L17 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconAlertTriangle({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10.3 4.2L2.6 18.4C2.1 19.3 2.8 20.4 3.8 20.4H20.2C21.2 20.4 21.9 19.3 21.4 18.4L13.7 4.2C13.2 3.3 10.8 3.3 10.3 4.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 10V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function IconWifi({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 9C9.5 5 14.5 5 19 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M8 12.5C10.5 10.3 13.5 10.3 16 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.3" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function IconExpand({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 4H5C4.45 4 4 4.45 4 5V9M15 4H19C19.55 4 20 4.45 20 5V9M9 20H5C4.45 20 4 19.55 4 19V15M15 20H19C19.55 20 20 19.55 20 19V15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconSearch({ size = 15, className }) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconUserCircle({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20C5 16.5 8.13 14 12 14C15.87 14 19 16.5 19 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconChevronsSwitch({ size = 16, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 7H17M17 7L14 4M17 7L14 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 17H7M7 17L10 14M7 17L10 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMic({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconSpeaker({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 10v4H8l5 4V6L8 10H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M16.5 9c1 1 1 5 0 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronRight({ size = 14, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconTarget({ size = 18, className }) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconTrendUp({ size = 12, className }) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 16L10 10L14 14L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6H20V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Map a nav-item label to its icon component, used by Sidebar.
export const NAV_ICON_MAP = {
  Dashboard: IconGrid,
  'Live Monitoring': IconCamera,
  'Events & Alerts': IconBell,
  'Camera Management': IconCameraGear,
  'Audio Analysis': IconWaveform,
  Analytics: IconBarChart,
  Reports: IconFileText,
  Settings: IconSettings,
};
