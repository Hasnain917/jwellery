// Section 1: Editorial Luxury Hero using Client's Signature Fine-Jewelry Image
import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Award, Sparkles } from 'lucide-react';

export default function Hero({ onStartCustom, onShopNow }) {
  return (
    <section 
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#141210',
        color: '#FFFFFF',
        overflow: 'hidden',
        padding: '5.5rem 0'
      }}
    >
      {/* 1. Full-Bleed Editorial Background Image (User's Signature Oval Diamond Hand Shot) */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("/images/hero-ring.jpg")`,
          backgroundPosition: 'right center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          transform: 'scale(1.01)',
          transition: 'transform 0.8s ease'
        }}
      />

      {/* 2. Soft Editorial Left-to-Right Shadow Gradient for Maximum Text Legibility */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(16, 14, 12, 0.92) 0%, rgba(16, 14, 12, 0.75) 35%, rgba(16, 14, 12, 0.35) 65%, rgba(16, 14, 12, 0.1) 100%)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Subtle top & bottom vignette */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(16, 14, 12, 0.4) 0%, transparent 25%, transparent 75%, rgba(16, 14, 12, 0.7) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* 3. Hero Content — Editorial, Minimal, Clean (Left Side Negative Space) */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '680px' }}>
          
          {/* Atelier Badge */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              marginBottom: '1.6rem'
            }}
          >
            <span 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#FAF7F2',
                display: 'inline-block'
              }}
            />
            <span 
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: '#FAF7F2'
              }}
            >
              Chicago Bespoke Atelier • Jewelers Row
            </span>
          </div>

          {/* Headline in Elegant Serif */}
          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.9rem, 6.2vw, 4.9rem)',
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#FAF7F2',
              marginBottom: '1.4rem',
              textShadow: '0 2px 25px rgba(0,0,0,0.5)'
            }}
          >
            Your Vision. <br />
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(250, 247, 242, 0.9)' }}>
              Handcrafted in Chicago.
            </span>
          </h1>

          {/* Subline */}
          <p 
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: 'rgba(250, 247, 242, 0.88)',
              fontWeight: 300,
              lineHeight: 1.65,
              maxWidth: '560px',
              marginBottom: '2.4rem'
            }}
          >
            Bespoke custom engagement rings, concierge-crafted from 3D sketch to delivery in 3–4 weeks. Featuring certified IGI lab-grown diamonds and GRA moissanite.
          </p>

          {/* Minimalist High-End Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            
            {/* Primary Button */}
            <button 
              onClick={onStartCustom}
              style={{
                backgroundColor: '#FAF7F2',
                color: '#151515',
                padding: '1.05rem 2.2rem',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                borderRadius: '2px',
                border: '1px solid #FAF7F2',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#EAE4D8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#FAF7F2';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Design Your Custom Ring
            </button>

            {/* Secondary Button */}
            <button 
              onClick={onShopNow}
              style={{
                backgroundColor: 'transparent',
                color: '#FAF7F2',
                padding: '1.05rem 2.2rem',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 500,
                borderRadius: '2px',
                border: '1px solid rgba(250, 247, 242, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(250, 247, 242, 0.12)';
                e.currentTarget.style.borderColor = '#FAF7F2';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(250, 247, 242, 0.5)';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Shop Ready-to-Ship
              <ArrowRight size={15} />
            </button>

          </div>

          {/* Minimalist Trust Badges */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              marginTop: '3.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(250, 247, 242, 0.18)',
              fontSize: '0.82rem',
              color: 'rgba(250, 247, 242, 0.8)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Clock size={15} style={{ color: '#FAF7F2' }} />
              <span><strong>3–4 Weeks</strong> Custom Turnaround</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <ShieldCheck size={15} style={{ color: '#FAF7F2' }} />
              <span><strong>100% Insured</strong> Doorstep Delivery</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Award size={15} style={{ color: '#FAF7F2' }} />
              <span><strong>4.9 / 5★</strong> (380+ Couples)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
