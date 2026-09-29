// Section 10: Client Love Stories — Testimonial Carousel with Photos
import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/jewelryData';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';

export default function LoveStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx > 0 ? prevIdx - 1 : TESTIMONIALS.length - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx < TESTIMONIALS.length - 1 ? prevIdx + 1 : 0));
  };

  const story = TESTIMONIALS[currentIndex] || TESTIMONIALS[0];

  return (
    <section className="section-padding love-stories-section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="eyebrow">Real Couples & Proposals</span>
          <h2>Client Love Stories</h2>
          <p className="subheading">
            Honored to craft the enduring symbols of love for couples across Chicago and nationwide.
          </p>
        </div>

        {/* Testimonial Card */}
        <div 
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            backgroundColor: 'var(--bg-warm-ivory)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-soft)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              alignItems: 'stretch'
            }}
          >
            {/* Couple Photo */}
            <div style={{ position: 'relative', minHeight: '380px' }}>
              <img 
                src={story.image} 
                alt={story.author}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(4px)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--text-charcoal)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Heart size={12} fill="#E53E3E" color="#E53E3E" />
                Verified Avi Couple
              </div>
            </div>

            {/* Testimonial Content */}
            <div 
              style={{
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', color: 'var(--gold-primary)', marginBottom: '1.2rem' }}>
                  {[...Array(story.rating || 5)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--gold-primary)" />
                  ))}
                </div>

                {/* Review Title */}
                <h3 style={{ fontSize: '1.45rem', marginBottom: '1rem', lineHeight: 1.3, color: 'var(--text-charcoal)' }}>
                  "{story.title}"
                </h3>

                {/* Review Text */}
                <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--text-charcoal-light)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  {story.quote}
                </p>

                {/* Custom Ring Info Pill */}
                <div 
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-gold)',
                    padding: '0.65rem 1rem',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    color: 'var(--text-charcoal)',
                    marginBottom: '1.5rem'
                  }}
                >
                  <span style={{ color: 'var(--gold-primary)', fontWeight: 600 }}>Custom Ring: </span>
                  {story.ring}
                </div>
              </div>

              {/* Author & Carousel Controls */}
              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border-soft)',
                  paddingTop: '1.2rem'
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-charcoal)' }}>
                    {story.author}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    {story.location}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={prev}
                    aria-label="Previous review"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-soft)',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-charcoal)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-soft)'}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next review"
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      border: '1px solid var(--border-soft)',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-charcoal)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold-primary)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-soft)'}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
