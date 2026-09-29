// Section 8: Split Banner — "Can't Find It? We'll Make It."
import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function SplitBanner({ onStartCustom }) {
  return (
    <section className="split-banner-section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)' }}>
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          alignItems: 'stretch'
        }}
      >
        {/* Left Side: Atelier Visual */}
        <div 
          style={{
            position: 'relative',
            minHeight: '480px',
            background: 'url("https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85") center/cover no-repeat'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0.2))'
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              right: '2rem',
              color: '#FFFFFF'
            }}
          >
            <div className="badge-gold" style={{ marginBottom: '0.6rem' }}>
              Chicago Goldsmith Atelier
            </div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FAF7F2' }}>
              Handset in solid 14k/18k gold & platinum on Jewelers Row.
            </div>
          </div>
        </div>

        {/* Right Side: Editorial Message & CTA */}
        <div 
          style={{
            padding: 'clamp(2.5rem, 6vw, 5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'var(--bg-warm-ivory)'
          }}
        >
          <span className="eyebrow">Bespoke Concierge</span>
          
          <h2 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', marginBottom: '1.2rem', lineHeight: 1.15 }}>
            Can't find it? <br />
            <span style={{ fontStyle: 'italic', color: 'var(--gold-primary)' }}>
              We'll make it.
            </span>
          </h2>

          <p style={{ fontSize: '1.02rem', lineHeight: 1.7, color: 'var(--text-charcoal-light)', marginBottom: '1.8rem' }}>
            Never settle for off-the-shelf compromises. Whether it's an intricate antique setting you saw in a vintage boutique, a composite of multiple ring designs, or a customized setting tailored around an exact diamond ratio—our Chicago master designers turn your unique concept into a reality in 3–4 weeks.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '2.2rem', fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} style={{ color: 'var(--gold-primary)' }} />
              <span>Free 3D CAD Renderings</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} style={{ color: 'var(--gold-primary)' }} />
              <span>No Middleman Markups</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} style={{ color: 'var(--gold-primary)' }} />
              <span>Free Virtual Consultations</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Check size={16} style={{ color: 'var(--gold-primary)' }} />
              <span>Full IGI / GRA Certification</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onStartCustom}
              className="btn btn-gold btn-lg"
            >
              <Sparkles size={16} />
              Start Your Custom Design Form
            </button>
            <a 
              href="tel:3315754525"
              className="btn btn-outline btn-lg"
            >
              Call (331) 575-4525
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
