// Avi Jewelers USA — Luxury Client Sign In & Registration Experience
import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  KeyRound,
  AlertCircle
} from 'lucide-react';
import { loginUser, registerUser, DEMO_CLIENT } from '../services/authService';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  initialMode = 'login',
  messagePrompt = null 
}) {
  const [mode, setMode] = useState(initialMode); // 'login', 'register', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
    newsletter: true
  });

  // Sync mode if initialMode changes
  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter both your email and password.');
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser(formData.email, formData.password);
      if (result.success) {
        setSuccessMsg(`Welcome back, ${result.user.name || 'valued client'}.`);
        setTimeout(() => {
          onSuccess(result.user);
          onClose();
        }, 600);
      } else {
        setErrorMsg(result.error || 'Authentication failed. Please verify credentials.');
      }
    } catch {
      setErrorMsg('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (result.success) {
        setSuccessMsg('Your Avi Jewelers Private Client account has been created.');
        setTimeout(() => {
          onSuccess(result.user);
          onClose();
        }, 800);
      } else {
        setErrorMsg(result.error || 'Registration was unsuccessful.');
      }
    } catch {
      setErrorMsg('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address to receive reset instructions.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg(`A private password reset link has been dispatched to ${formData.email}.`);
    }, 800);
  };

  const handleQuickDemoLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await loginUser(DEMO_CLIENT.email, 'password123');
      if (res.success) {
        setSuccessMsg('Logging in as VIP Client Alexandra Montgomery...');
        setTimeout(() => {
          onSuccess(res.user);
          onClose();
        }, 500);
      }
    } catch {
      setErrorMsg('Demo login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(18, 18, 18, 0.72)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease'
      }}
    >
      <div 
        className="auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          maxWidth: '480px',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-modal)',
          border: '1px solid var(--border-soft)',
          overflow: 'hidden',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-cream-tint)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-charcoal)',
            zIndex: 10,
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--border-soft)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-cream-tint)'}
        >
          <X size={16} />
        </button>

        {/* Top Atelier Brand Header */}
        <div 
          style={{
            backgroundColor: 'var(--bg-warm-ivory)',
            padding: '2rem 2rem 1.4rem',
            textAlign: 'center',
            borderBottom: '1px solid var(--border-soft)'
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <Sparkles size={14} style={{ color: 'var(--text-charcoal)' }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-charcoal)', fontWeight: 600 }}>
              Avi Jewelers Chicago Atelier
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.65rem', color: 'var(--text-charcoal)', marginBottom: '0.3rem', fontWeight: 500 }}>
            {mode === 'login' && 'Client Sign In'}
            {mode === 'register' && 'Create Atelier Account'}
            {mode === 'forgot' && 'Reset Security Credentials'}
          </h2>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-charcoal-light)', maxWidth: '340px', margin: '0 auto', lineHeight: 1.45 }}>
            {mode === 'login' && 'Access bespoke orders, certified appraisals, and private jewelry portfolio.'}
            {mode === 'register' && 'Register for complimentary CAD previews, insured order tracking, and private events.'}
            {mode === 'forgot' && 'Enter your registered email to receive an instant authentication link.'}
          </p>

          {messagePrompt && (
            <div style={{ marginTop: '0.8rem', padding: '0.5rem 0.8rem', backgroundColor: '#FFFFFF', borderRadius: '4px', border: '1px solid var(--border-soft)', fontSize: '0.76rem', color: 'var(--text-charcoal)' }}>
              ✦ {messagePrompt}
            </div>
          )}
        </div>

        {/* Tab Switcher (Login / Register) */}
        {mode !== 'forgot' && (
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-soft)', backgroundColor: '#FAF8F5' }}>
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '0.85rem 1rem',
                fontSize: '0.82rem',
                fontWeight: mode === 'login' ? 600 : 400,
                color: mode === 'login' ? 'var(--text-charcoal)' : 'var(--text-muted)',
                backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderBottom: mode === 'login' ? '2px solid var(--text-charcoal)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              style={{
                flex: 1,
                padding: '0.85rem 1rem',
                fontSize: '0.82rem',
                fontWeight: mode === 'register' ? 600 : 400,
                color: mode === 'register' ? 'var(--text-charcoal)' : 'var(--text-muted)',
                backgroundColor: mode === 'register' ? '#FFFFFF' : 'transparent',
                border: 'none',
                borderBottom: mode === 'register' ? '2px solid var(--text-charcoal)' : '2px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em'
              }}
            >
              New Client Registration
            </button>
          </div>
        )}

        {/* Body Content */}
        <div style={{ padding: '1.6rem 2rem 2rem' }}>

          {/* Error Message */}
          {errorMsg && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#FFF4F2',
                border: '1px solid #FFD0CA',
                color: '#C62828',
                padding: '0.65rem 0.9rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                marginBottom: '1.2rem',
                lineHeight: 1.4
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                backgroundColor: '#F0F9F1',
                border: '1px solid #C8E6C9',
                color: '#2E7D32',
                padding: '0.65rem 0.9rem',
                borderRadius: '6px',
                fontSize: '0.78rem',
                marginBottom: '1.2rem',
                lineHeight: 1.4
              }}
            >
              <CheckCircle2 size={16} style={{ flexShrink: 0 }} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '1.1rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. client@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-soft)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--text-charcoal)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-soft)'}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', letterSpacing: '0.02em' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setErrorMsg(''); setSuccessMsg(''); }}
                    style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your confidential password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 2.4rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-soft)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--text-charcoal)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-soft)'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    style={{
                      position: 'absolute',
                      right: '0.8rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.4rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.76rem', color: 'var(--text-charcoal-light)', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--text-charcoal)' }}
                  />
                  <span>Remember my atelier device</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--text-charcoal)',
                  color: '#FFFFFF',
                  padding: '0.85rem',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: 'var(--shadow-card)',
                  marginBottom: '1rem'
                }}
              >
                {loading ? 'Authenticating...' : (
                  <>
                    <span>Sign In to Atelier</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* Quick Demo Login Preset Button */}
              <div 
                style={{
                  backgroundColor: 'var(--bg-cream-tint)',
                  border: '1px dashed var(--border-soft)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  textAlign: 'center',
                  marginTop: '1.2rem'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: 'var(--text-charcoal)', fontWeight: 600, marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Instant Evaluation Mode
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                  Log in immediately as demo client <strong>Alexandra Montgomery</strong> to test order tracking and profile history.
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  disabled={loading}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--text-charcoal)',
                    color: 'var(--text-charcoal)',
                    padding: '0.45rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--text-charcoal)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.color = 'var(--text-charcoal)';
                  }}
                >
                  <Sparkles size={13} />
                  <span>One-Click Demo VIP Login</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. REGISTRATION FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                  Full Legal Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Sarah Jenkins"
                    style={{
                      width: '100%',
                      padding: '0.72rem 0.9rem 0.72rem 2.4rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-soft)',
                      fontSize: '0.84rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="client@mail.com"
                      style={{
                        width: '100%',
                        padding: '0.72rem 0.7rem 0.72rem 2.4rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.84rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                    Phone (Bespoke SMS)
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(312) 555-0199"
                      style={{
                        width: '100%',
                        padding: '0.72rem 0.7rem 0.72rem 2.4rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.84rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '1.2rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                    Create Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 6 chars"
                      style={{
                        width: '100%',
                        padding: '0.72rem 0.7rem 0.72rem 2.4rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.84rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter"
                      style={{
                        width: '100%',
                        padding: '0.72rem 0.7rem 0.72rem 2.4rem',
                        borderRadius: '6px',
                        border: '1px solid var(--border-soft)',
                        fontSize: '0.84rem',
                        outline: 'none',
                        backgroundColor: '#FFFFFF'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-charcoal-light)', cursor: 'pointer', lineHeight: 1.4 }}>
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    style={{ accentColor: 'var(--text-charcoal)', marginTop: '2px' }}
                  />
                  <span>Receive bespoke private diamond drops and Chicago atelier cocktail invitations</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--text-charcoal)',
                  color: '#FFFFFF',
                  padding: '0.85rem',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                {loading ? 'Creating Private Account...' : (
                  <>
                    <span>Complete Atelier Registration</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword}>
              <div style={{ marginBottom: '1.4rem' }}>
                <label style={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-charcoal)', marginBottom: '0.35rem', letterSpacing: '0.02em' }}>
                  Registered Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. client@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem 0.75rem 2.4rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-soft)',
                      fontSize: '0.85rem',
                      outline: 'none',
                      backgroundColor: '#FFFFFF'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--text-charcoal)',
                  color: '#FFFFFF',
                  padding: '0.85rem',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  marginBottom: '1rem',
                  cursor: 'pointer'
                }}
              >
                {loading ? 'Transmitting Request...' : 'Send Confidential Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ← Return to Sign In
              </button>
            </form>
          )}

          {/* Trust Footer Note */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginTop: '1.4rem', fontSize: '0.71rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} style={{ color: 'var(--text-charcoal)' }} />
            <span>256-Bit SSL Encrypted • Chicago Diamond District Verified</span>
          </div>

        </div>
      </div>
    </div>
  );
}
