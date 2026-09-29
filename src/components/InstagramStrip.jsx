import React from 'react';
import { INSTAGRAM_POSTS } from '../data/jewelryData';
import { Heart } from 'lucide-react';

const InstagramIcon = ({ size = 20, style = {} }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function InstagramStrip() {
  return (
    <section className="instagram-strip-section" style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-soft)' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', padding: '3.5rem 1rem 2rem' }}>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-charcoal)', marginBottom: '0.4rem' }}
        >
          <InstagramIcon size={18} style={{ color: 'var(--gold-primary)' }} />
          <span style={{ fontSize: '0.84rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
            @AVIJEWELERSUSA
          </span>
        </a>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-charcoal)' }}>
          Follow Our Chicago Atelier
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
          Daily bespoke ring reveals, workshop goldsmithing, and proposal moments.
        </p>
      </div>

      {/* 6 Grid Strip */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '2px',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              overflow: 'hidden',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              const overlay = e.currentTarget.querySelector('.ig-overlay');
              if (overlay) overlay.style.opacity = '1';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={e => {
              const overlay = e.currentTarget.querySelector('.ig-overlay');
              if (overlay) overlay.style.opacity = '0';
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.transform = 'scale(1)';
            }}
          >
            <img 
              src={post.image} 
              alt={post.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease'
              }}
              loading="lazy"
            />
            {/* Hover overlay with Instagram icon & like counter */}
            <div 
              className="ig-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(28, 28, 28, 0.65)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                opacity: 0,
                transition: 'opacity 0.25s ease',
                padding: '1rem',
                textAlign: 'center'
              }}
            >
              <InstagramIcon size={24} style={{ marginBottom: '0.5rem', color: 'var(--gold-muted)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', fontWeight: 600 }}>
                <Heart size={14} fill="#FFFFFF" />
                <span>{post.likes.toLocaleString()}</span>
              </div>
              <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', marginTop: '0.4rem', lineHeight: 1.3 }}>
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
