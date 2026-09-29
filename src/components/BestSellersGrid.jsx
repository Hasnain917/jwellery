// Section 6: Best Sellers Grid (8 Products) with Dual Hover Image, Badges & Quick View
import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';

export default function BestSellersGrid({ 
  products, 
  onSelectProduct,
  onQuickView, 
  onAddToCart, 
  onToggleWishlist, 
  wishlistIds = [],
  onViewAll 
}) {
  const [addedId, setAddedId] = useState(null);

  // Take top 8 best sellers or first 8
  const bestSellers = products
    .filter(p => p.isBestSeller || p.isFeatured)
    .slice(0, 8);

  const handleQuickAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedMetal: product.metalOptions ? product.metalOptions[0] : "14k White Gold",
      selectedSize: "6.5"
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section className="section-padding best-sellers-section" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <div>
            <span className="eyebrow">Signature Creations</span>
            <h2>Most Coveted Best Sellers</h2>
            <p className="subheading" style={{ margin: '0.4rem 0 0' }}>
              Our most celebrated engagement rings and certified fine jewelry essentials, available for immediate delivery or custom sizing.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="btn btn-outline"
            style={{ fontSize: '0.78rem' }}
          >
            Explore All Creations
          </button>
        </div>

        {/* 8 Product Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'clamp(1.2rem, 2.5vw, 2rem)'
          }}
        >
          {bestSellers.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isRecentlyAdded = addedId === product.id;

            return (
              <div 
                key={product.id}
                className="product-card"
                onClick={() => (onSelectProduct ? onSelectProduct(product) : onQuickView(product))}
                style={{ cursor: 'pointer' }}
              >
                {/* Image Container with Second Image Hover Flip */}
                <div className="product-img-wrap">
                  
                  {/* Primary Image */}
                  <img 
                    src={product.primaryImage} 
                    alt={product.name}
                    className="primary-img"
                    loading="lazy"
                  />

                  {/* Secondary Image (Visible on Hover) */}
                  {product.secondaryImage && (
                    <img 
                      src={product.secondaryImage} 
                      alt={`${product.name} alternate view`}
                      className="secondary-img"
                      style={{
                        position: 'absolute',
                        inset: '1.1rem',
                        width: 'calc(100% - 2.2rem)',
                        height: 'calc(100% - 2.2rem)',
                        objectFit: 'contain',
                        opacity: 0
                      }}
                      loading="lazy"
                    />
                  )}

                  {/* Top Badges: Stone Type & Certification */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      zIndex: 2
                    }}
                  >
                    <span 
                      className={product.stoneType === 'lab-diamond' ? 'badge-gold' : 'badge-dark'}
                      style={{ fontSize: '0.62rem' }}
                    >
                      {product.stoneType === 'lab-diamond' ? 'IGI Lab Diamond' : 'GRA Moissanite'}
                    </span>
                    {product.carat && (
                      <span 
                        style={{
                          fontSize: '0.6rem',
                          background: 'rgba(255,255,255,0.9)',
                          color: 'var(--text-charcoal)',
                          padding: '0.2rem 0.45rem',
                          borderRadius: '3px',
                          fontWeight: 600,
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        {product.carat}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label="Add to wishlist"
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.88)',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isWishlisted ? '#E53E3E' : 'var(--text-charcoal)',
                      transition: 'transform 0.2s',
                      zIndex: 2
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Heart size={16} fill={isWishlisted ? '#E53E3E' : 'none'} />
                  </button>

                  {/* Hover Quick Action Overlay */}
                  <div 
                    className="product-card-actions"
                    style={{
                      position: 'absolute',
                      bottom: '0.75rem',
                      left: '0.75rem',
                      right: '0.75rem',
                      display: 'flex',
                      gap: '0.5rem',
                      zIndex: 3
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="btn btn-white btn-sm"
                      style={{
                        flex: 1,
                        fontSize: '0.7rem',
                        padding: '0.55rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Eye size={13} />
                      Quick View
                    </button>
                    <button
                      onClick={(e) => handleQuickAdd(product, e)}
                      className="btn btn-gold btn-sm"
                      style={{
                        padding: '0.55rem 0.8rem',
                        fontSize: '0.7rem'
                      }}
                      title="Quick Add to Bag"
                    >
                      {isRecentlyAdded ? <Check size={14} /> : <ShoppingBag size={14} />}
                    </button>
                  </div>

                </div>

                {/* Product Content Details */}
                <div style={{ padding: '1.2rem' }}>
                  
                  {/* Category & Shape */}
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '0.3rem' }}>
                    {product.shape ? `${product.shape} cut • ` : ''}{product.category.replace('-', ' ')}
                  </div>

                  {/* Product Title */}
                  <h4 
                    style={{
                      fontSize: '1.05rem',
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--text-charcoal)',
                      marginBottom: '0.5rem',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {product.name}
                  </h4>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.6rem' }}>
                    <div style={{ display: 'flex', color: 'var(--gold-primary)' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="var(--gold-primary)" />
                      ))}
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      ({product.reviewCount || 18})
                    </span>
                  </div>

                  {/* Price & Compare At Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                    <span style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--text-charcoal)' }}>
                      ${product.price.toLocaleString()}
                    </span>
                    {product.compareAtPrice && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ${product.compareAtPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Lead Time text */}
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                    ✦ {product.leadTime || 'Handcrafted in 3 weeks'}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
