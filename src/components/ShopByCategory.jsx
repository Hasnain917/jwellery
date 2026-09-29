// Section 7: Shop by Category Tiles
import React from 'react';
import { CATEGORIES } from '../data/jewelryData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ShopByCategory({ onSelectCategory }) {
  return (
    <section className="section-padding shop-by-category" style={{ backgroundColor: 'var(--bg-warm-ivory)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <span className="eyebrow">Fine Jewelry Portfolio</span>
          <h2>Explore By Category</h2>
          <p className="subheading">
            From heirloom bespoke engagement rings to everyday certified diamond essentials.
          </p>
        </div>

        {/* Category Tiles Layout */}
        <div className="shop-by-category-grid">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className="category-tile"
              style={{
                position: 'relative',
                height: '340px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-subtle)',
                border: '1px solid var(--border-soft)'
              }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.08)';
                e.currentTarget.style.borderColor = 'var(--border-gold)';
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                e.currentTarget.style.borderColor = 'var(--border-soft)';
              }}
            >
              {/* Background Image */}
              <img 
                src={category.image} 
                alt={category.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                loading="lazy"
              />

              {/* Gradient Dark Overlay */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.2) 55%, transparent 100%)'
                }}
              />

              {/* Content Box */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  color: '#FFFFFF'
                }}
              >
                <h3 
                  style={{
                    color: '#FAF7F2',
                    fontSize: '1.5rem',
                    marginBottom: '0.35rem',
                    fontFamily: 'var(--font-serif)'
                  }}
                >
                  {category.name}
                </h3>
                <p 
                  style={{
                    fontSize: '0.8rem',
                    color: 'rgba(250, 247, 242, 0.85)',
                    marginBottom: '0.8rem',
                    lineHeight: 1.4
                  }}
                >
                  {category.description}
                </p>
                <div 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.74rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-muted)',
                    fontWeight: 600
                  }}
                >
                  Discover Collection <ArrowRight size={13} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
