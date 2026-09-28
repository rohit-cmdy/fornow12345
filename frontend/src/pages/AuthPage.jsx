import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { ApiError, login, register } from '../api.js';
import './AuthPage.css';

const FEATURES = [
  ['shield', 'Real-time Threat Detection', 'Detects violence, weapons, and unusual activity'],
  ['audio', 'Audio Intelligence', 'Identifies gunshots, screams and dangerous sounds'],
  ['bell', 'Smart Alerts', 'Faster response, fewer false alarms'],
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  if (name === 'shield') return <svg {...common}><path d="M12 3l7 3v5.2c0 4.6-2.9 8.1-7 9.8-4.1-1.7-7-5.2-7-9.8V6l7-3Z" /><path d="m9.4 12 1.7 1.7 3.8-4" /></svg>;
  if (name === 'audio') return <svg {...common}><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" /></svg>;
  if (name === 'bell') return <svg {...common}><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></svg>;
  if (name === 'user') return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M5 20c.8-3.2 3-5 7-5s6.2 1.8 7 5" /></svg>;
  if (name === 'mail') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  if (name === 'lock') return <svg {...common}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>;
  if (name === 'phone') return <svg {...common}><path d="M6.5 3.5 9 3l1.5 4-2 1.5a14 14 0 0 0 7 7L17 13.5l4 1.5-.5 2.5a3 3 0 0 1-3.2 2.4C10.5 18.9 5.1 13.5 4.1 6.7A3 3 0 0 1 6.5 3.5Z" /></svg>;
  if (name === 'eye') return <svg {...common}><path d="M2.5 12s3.5-5 9.5-5 9.5 5 9.5 5-3.5 5-9.5 5-9.5-5-9.5-5Z" /><circle cx="12" cy="12" r="2.5" /></svg>;
  if (name === 'arrow') return <svg {...common}><path d="M5 12h13" /><path d="m13 7 5 5-5 5" /></svg>;
  if (name === 'sun') return <svg {...common}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>;
  if (name === 'moon') return <svg {...common}><path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" /></svg>;
  if (name === 'google') return <span className="google-g">G</span>;
  return null;
}

function BrandLogo() {
  return (
    <div className="brand-logo">
      <div className="logo-mark"><Icon name="shield" size={34} /></div>
      <div>
        <div className="auth-brand-name">Multimodal<br />Security System</div>
      </div>
    </div>
  );
}

function SurveillanceScene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="sky-glow" />
      <div className="city">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} style={{ height: `${34 + ((i * 19) % 72)}px`, width: `${18 + ((i * 7) % 22)}px` }} />
        ))}
      </div>
      <div className="grid-overlay" />
      <div className="camera">
        <div className="camera-head">
          <div className="lens"></div>
        </div>
        <div className="camera-neck"></div>
        <div className="camera-pole"></div>
      </div>
      <div className="scan-box box-one"></div>
      <div className="scan-box box-two"></div>
      <div className="scan-dot"></div>
    </div>
  );
}

function FeaturePanel() {
  return (
    <aside className="feature-panel">
      <BrandLogo />
      <p className="tagline">Smarter Vision. Safer Tomorrow.</p>
      <p className="description">AI-powered monitoring with video and audio intelligence for a safer environment.</p>
      <div className="features">
        {FEATURES.map(([icon, title, text]) => (
          <div className="feature" key={title}>
            <div className="feature-icon"><Icon name={icon} size={18} /></div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SurveillanceScene />
    </aside>
  );
}

function RoleSwitch({ role, setRole }) {
  return (
    <div className="role-switch">
      <button type="button" className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
        <Icon name="user" size={16} /> User (Client)
      </button>
      <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>
        <Icon name="shield" size={15} /> Admin
      </button>
    </div>
  );
}

function Field({
  icon, label, type = 'text', placeholder, value, onChange, optional = false,
  showPassword, onTogglePassword, error, autoComplete = 'off', minLength, pattern, inputMode,
}) {
  return (
    <label className={`field ${error ? 'has-error' : ''}`}>
      <span className="field-label">{label}{optional ? ' (Optional)' : ''}</span>
      <span className="input-wrap">
        <span className="input-icon"><Icon name={icon} size={18} /></span>
        <input
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          minLength={minLength}
          pattern={pattern}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
        />
        {type === 'password' && (
          <button type="button" className="eye" onClick={onTogglePassword} aria-label="Show password">
            <Icon name="eye" size={17} />
          </button>
        )}
      </span>
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.trim());
}
function validatePhone(phone) {
  if (!phone.trim()) return true;
  return /^\+?[0-9\s()-]{10,16}$/.test(phone.trim());
}
function validatePassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
}

function LoginForm({ role, setRole, goSignup, onAuthenticated }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!identifier.trim()) next.identifier = 'Email or username is required.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    if (Object.keys(next).length) return;

    setSubmitting(true);
    setNotice('');
    try {
      await login(identifier.trim(), password);
      onAuthenticated(role);
    } catch (error) {
      setNotice(error instanceof ApiError ? error.message : 'Unable to connect to the server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="heading">
        <h1>Welcome Back</h1>
        <p>Sign in to your account to continue.</p>
      </div>
      <RoleSwitch role={role} setRole={setRole} />
      <form onSubmit={submit} noValidate>
        <Field
          icon="mail"
          label="Email or Username"
          placeholder="Enter your email or username"
          value={identifier}
          onChange={(value) => { setIdentifier(value); setErrors((prev) => ({ ...prev, identifier: '' })); }}
          error={errors.identifier}
          autoComplete="username"
        />
        <Field
          icon="lock"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(value) => { setPassword(value); setErrors((prev) => ({ ...prev, password: '' })); }}
          showPassword={show}
          onTogglePassword={() => setShow(!show)}
          error={errors.password}
          autoComplete="current-password"
        />
        <div className="forgot">
          <button
            type="button"
            onClick={() => setNotice('If an account exists for that address, a reset link has been sent. (demo only)')}
          >
            Forgot password?
          </button>
        </div>
        {notice && <p className="auth-notice">{notice}</p>}
        <button className="primary-btn" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Login'} {!submitting && <Icon name="arrow" size={18} />}</button>
        <div className="or"><span>OR</span></div>
        <button
          className="google-btn"
          type="button"
          onClick={() => setNotice('Google sign-in isn\u2019t connected yet \u2014 hook up your OAuth provider here.')}
        >
          <Icon name="google" size={19} /> Continue with Google
        </button>
      </form>
      <div className="switch-copy">Don't have an account? <button type="button" onClick={goSignup}>Sign Up</button></div>
    </>
  );
}

function SignupForm({ role, setRole, goLogin, onAuthenticated }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!validateEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!validatePhone(form.phone)) next.phone = 'Enter a valid phone number.';
    if (!validatePassword(form.password)) {
      next.password = 'Use 8+ characters with uppercase, lowercase and a number.';
    }
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match.';
    setErrors(next);

    if (Object.keys(next).length) return;

    setSubmitting(true);
    setNotice('');
    try {
      await register({ email: form.email.trim(), password: form.password, full_name: form.name.trim() });
      await login(form.email.trim(), form.password);
      onAuthenticated(role);
    } catch (error) {
      setNotice(error instanceof ApiError ? error.message : 'Unable to connect to the server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="heading signup-heading">
        <h1>Create Your Account</h1>
        <p>Join to get started with the security system.</p>
      </div>
      <RoleSwitch role={role} setRole={setRole} />
      <form onSubmit={submit} noValidate>
        <Field icon="user" label="Full Name" placeholder="Enter your full name" value={form.name} onChange={update('name')} error={errors.name} autoComplete="name" />
        <Field icon="mail" label="Email" type="email" placeholder="Enter your email address" value={form.email} onChange={update('email')} error={errors.email} autoComplete="email" />
        <Field icon="phone" label="Phone Number" optional type="tel" placeholder="Enter your phone number" value={form.phone} onChange={update('phone')} error={errors.phone} autoComplete="tel" inputMode="tel" />
        <Field icon="lock" label="Password" type="password" placeholder="Create a password" value={form.password} onChange={update('password')} error={errors.password} showPassword={show} onTogglePassword={() => setShow(!show)} autoComplete="new-password" minLength={8} />
        <Field icon="lock" label="Confirm Password" type="password" placeholder="Confirm your password" value={form.confirm} onChange={update('confirm')} error={errors.confirm} showPassword={show} onTogglePassword={() => setShow(!show)} autoComplete="new-password" />
        {notice && <p className="auth-notice">{notice}</p>}
        <button className="primary-btn signup-btn" type="submit" disabled={submitting}>{submitting ? 'Creating account...' : 'Sign Up'} {!submitting && <Icon name="arrow" size={18} />}</button>
      </form>
      <div className="switch-copy">Already have an account? <button type="button" onClick={goLogin}>Login</button></div>
    </>
  );
}

function AuthCard({ mode, setMode, role, setRole, onAuthenticated }) {
  return (
    <section className={`auth-card ${mode === 'signup' ? 'signup-card' : ''}`}>
      {mode === 'login'
        ? <LoginForm role={role} setRole={setRole} goSignup={() => setMode('signup')} onAuthenticated={onAuthenticated} />
        : <SignupForm role={role} setRole={setRole} goLogin={() => setMode('login')} onAuthenticated={onAuthenticated} />}
    </section>
  );
}

export default function AuthPage({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [role, setRole] = useState('user');
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="auth-shell">
      <div className="theme-toggle">
        <button onClick={toggleTheme} aria-label="Toggle dark mode">
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
      <div className="auth-layout">
        <FeaturePanel />
        <AuthCard mode={mode} setMode={setMode} role={role} setRole={setRole} onAuthenticated={onAuthenticated} />
      </div>
      <footer>© 2026 Multimodal Security System · Secure access portal</footer>
    </main>
  );
}
