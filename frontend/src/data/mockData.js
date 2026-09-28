// All data here is mock data, deliberately shaped like a real API response
// (ids, timestamps, nested fields) so it can be swapped for real fetch()
// calls later without touching any component.

// Admin and User now share the exact same navigation — Camera Management
// and Analytics were dropped from the User workspace, and Audio Analysis
// was added to both.
export const NAV_ITEMS = [
  'Dashboard',
  'Live Monitoring',
  'Events & Alerts',
  'Audio Analysis',
  'Reports',
  'Settings',
];

// Kept as separate exports (both pointing at the same list) so a future
// role can still diverge from the other without touching every import site.
export const ADMIN_NAV_ITEMS = NAV_ITEMS;
export const USER_NAV_ITEMS = NAV_ITEMS;

export const CAMERAS = [
  {
    id: 'CAM-01',
    name: 'CAM 01',
    location: 'Main Entrance',
    status: 'online',
    resolution: '1920×1080',
    fps: 30,
    tag: 'Movement Detected',
    tagLevel: 'normal',
    lastEvent: 'Movement Detected — 2 min ago',
  },
  {
    id: 'CAM-02',
    name: 'CAM 02',
    location: 'Parking Area',
    status: 'online',
    resolution: '1920×1080',
    fps: 30,
    tag: 'Weapon Detected',
    tagLevel: 'critical',
    lastEvent: 'Weapon Detected — 4 min ago',
  },
];

export const STATS = [
  { id: 'cameras', label: 'Total Cameras', value: '2', meta: '2 Online', icon: 'camera', tone: 'blue' },
  { id: 'detections', label: 'Active Detections', value: '3', meta: 'Last 5 minutes', icon: 'activity', tone: 'green' },
  { id: 'audio', label: 'Audio Events', value: '1', meta: 'Scream detected', icon: 'audio', tone: 'blue' },
  { id: 'alerts', label: 'High Priority Alerts', value: '1', meta: 'Weapon · Zone 2', icon: 'alert', tone: 'red' },
];

export const ALERTS = [
  { id: 'al1', severity: 'critical', message: 'Weapon Detected', source: 'Object: Gun · Zone 2 - Parking', time: '14:28' },
  { id: 'al2', severity: 'critical', message: 'Scream Detected', source: 'Zone 3 - Lobby', time: '14:24' },
  { id: 'al3', severity: 'high', message: 'Fighting Detected', source: 'Zone 1 - Main Entrance', time: '14:17' },
  { id: 'al4', severity: 'high', message: 'Weapon Detected', source: 'Zone 4 - Warehouse', time: '14:10' },
  { id: 'al5', severity: 'low', message: 'Suspicious Movement', source: 'Zone 1 - Main Entrance', time: '13:58' },
];

export const EVENTS = [
  { time: '14:28', camera: 'CAM 02', event: 'Weapon Detected', confidence: 0.92, severity: 'high' },
  { time: '14:24', camera: 'CAM 02', event: 'Scream Detected', confidence: 0.87, severity: 'high' },
  { time: '14:17', camera: 'CAM 01', event: 'Fighting Detected', confidence: 0.76, severity: 'medium' },
  { time: '13:58', camera: 'CAM 01', event: 'Movement Detected', confidence: 0.68, severity: 'low' },
  { time: '13:42', camera: 'CAM 02', event: 'Normal Activity', confidence: 0.45, severity: 'normal' },
];

export const CHART_LABELS = ['08:00', '10:00', '12:00', '14:00'];
export const CHART_SERIES = [
  { name: 'Movement', color: 'var(--c-blue)', data: [8, 12, 10, 12] },
  { name: 'Fighting', color: 'var(--c-amber)', data: [1, 2, 3, 5] },
  { name: 'Weapon', color: 'var(--c-red)', data: [0, 1, 2, 3] },
  { name: 'Audio', color: 'var(--c-purple)', data: [2, 3, 3, 4] },
];

export const HEALTH = [
  { id: 'cpu', label: 'CPU', value: 42 },
  { id: 'ram', label: 'RAM', value: 68 },
  { id: 'gpu', label: 'GPU', value: 28 },
];

export const LATENCY_MS = 180;

export const PIPELINE = [
  { name: 'Vision', sub: 'MediaPipe + YOLOv8', detail: 'Pose · Objects · Weapons', tone: 'green' },
  { name: 'Sequence Analysis', sub: 'LSTM / Transformer', detail: 'Falling · Fighting, etc.', tone: 'purple' },
  { name: 'Audio Analysis', sub: 'CRNN', detail: 'Gunshots · Screams, etc.', tone: 'blue' },
  { name: 'Fusion Engine', sub: 'Multimodal correlation', detail: '+ zone / time', tone: 'amber' },
  { name: 'DeepSORT Tracking', sub: 'Cross-camera tracking', detail: '& zones', tone: 'teal' },
];

/* ------------------------------------------------------------------ *
 * Audio Analysis page
 * ------------------------------------------------------------------ */

export const AUDIO_STATS = [
  { id: 'total', label: 'Total Audio Events', value: '5', trend: '+25%', icon: 'waveform', tone: 'blue' },
  { id: 'suspicious', label: 'Suspicious Sounds Detected', value: '2', trend: '+100%', icon: 'mic', tone: 'green' },
  { id: 'monitoring', label: 'Audio Monitoring', value: '1', badge: 'Live', icon: 'speaker', tone: 'blue' },
  { id: 'alerts', label: 'High Priority Alerts', value: '1', badge: 'Zone 2 - Parking', icon: 'alert', tone: 'red' },
];

export const AUDIO_EVENTS = [
  { id: 'ae1', title: 'Gunshot Detected', zone: 'Zone 2 - Parking', time: '10:42:18 AM', severity: 'critical', icon: 'waveform' },
  { id: 'ae2', title: 'Shouting Detected', zone: 'Zone 1 - Main Entrance', time: '10:36:45 AM', severity: 'high', icon: 'waveform' },
  { id: 'ae3', title: 'Loud Noise Detected', zone: 'Zone 3 - Lobby', time: '10:21:07 AM', severity: 'medium', icon: 'speaker' },
  { id: 'ae4', title: 'Audio Back to Normal', zone: 'Zone 4 - Warehouse', time: '09:58:32 AM', severity: 'info', icon: 'speaker' },
];

/* ------------------------------------------------------------------ *
 * Reports page
 * ------------------------------------------------------------------ */

export const TOTAL_REPORTS = 24;

export const REPORT_STATS = [
  { id: 'total', label: 'Total Reports', value: String(TOTAL_REPORTS), trend: '+12%', icon: 'fileText', tone: 'blue' },
  { id: 'critical', label: 'Critical Reports', value: '6', trend: '+2%', icon: 'alert', tone: 'red' },
  { id: 'high', label: 'High Priority Reports', value: '9', trend: '+3%', icon: 'alert', tone: 'amber' },
  { id: 'resolved', label: 'Resolved Reports', value: '17', trend: '+8%', icon: 'check', tone: 'green' },
];

export const REPORTS_TIMELINE = {
  labels: ['Sep 20', 'Sep 21', 'Sep 22', 'Sep 23', 'Sep 24', 'Sep 25', 'Sep 26'],
  data: [5, 9, 6, 7, 8, 10, 12],
};

export const REPORT_SEVERITY_BREAKDOWN = [
  { label: 'Critical', value: 6, color: 'var(--c-red)' },
  { label: 'High', value: 9, color: 'var(--c-amber)' },
  { label: 'Medium', value: 5, color: 'var(--c-blue)' },
  { label: 'Low', value: 4, color: 'var(--c-purple)' },
];

export const REPORT_TYPE_DISTRIBUTION = [
  { label: 'Weapon Detection', value: 29, color: 'var(--c-red)' },
  { label: 'Vehicle/Person Detection', value: 25, color: 'var(--c-blue)' },
  { label: 'Audio Analysis', value: 17, color: 'var(--c-green)' },
  { label: 'Object Recognition', value: 13, color: 'var(--c-purple)' },
  { label: 'Other', value: 16, color: 'var(--text-tertiary)' },
];

export const RECENT_REPORTS = [
  { id: 'RPT-0068', type: 'Weapon Detection', typeTone: 'red', event: 'Weapon Detected', priority: 'critical', location: 'Zone 2 - Parking', time: '10:42:18 AM', status: 'open' },
  { id: 'RPT-0067', type: 'Audio Analysis', typeTone: 'green', event: 'Gunshot Detected', priority: 'high', location: 'Zone 1 - Main Entrance', time: '10:36:45 AM', status: 'open' },
  { id: 'RPT-0066', type: 'Video Detection', typeTone: 'blue', event: 'Person Detected', priority: 'medium', location: 'Zone 4 - Warehouse', time: '10:21:12 AM', status: 'progress' },
  { id: 'RPT-0065', type: 'Audio Analysis', typeTone: 'green', event: 'Loud Noise', priority: 'high', location: 'Zone 3 - Lobby', time: '10:12:07 AM', status: 'resolved' },
  { id: 'RPT-0064', type: 'Object Recognition', typeTone: 'purple', event: 'Vehicle Detected', priority: 'medium', location: 'Zone 5 - Gate', time: '09:58:33 AM', status: 'resolved' },
  { id: 'RPT-0063', type: 'Weapon Detection', typeTone: 'red', event: 'Weapon Detected', priority: 'critical', location: 'Zone 2 - Parking', time: '09:41:02 AM', status: 'resolved' },
  { id: 'RPT-0062', type: 'Video Detection', typeTone: 'blue', event: 'Person Detected', priority: 'medium', location: 'Zone 1 - Main Entrance', time: '09:22:47 AM', status: 'resolved' },
  { id: 'RPT-0061', type: 'Object Recognition', typeTone: 'purple', event: 'Vehicle Detected', priority: 'low', location: 'Zone 5 - Gate', time: '09:03:19 AM', status: 'resolved' },
];
