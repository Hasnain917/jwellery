import React, { useState, useRef } from 'react';
import { Sparkles, Play } from 'lucide-react';

export default function ProductCardMedia({ 
  primaryImage, 
  secondaryImage, 
  name, 
  videoUrl = '/videos/product-preview.mp4',
  aspectRatio = '1 / 1',
  padding = '1.2rem',
  isDetailView = false
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoUrl && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlayingVideo(true))
          .catch(() => {
            // Autoplay prevented or fallback
            setIsPlayingVideo(false);
          });
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlayingVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div 
      className="product-card-media-wrap"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: aspectRatio,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: padding,
        borderRadius: isDetailView ? '6px' : '4px'
      }}
    >
      {/* 1. Primary Static Image */}
      <img
        src={primaryImage}
        alt={name}
        className="primary-img"
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'center',
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          transform: isHovered && !isPlayingVideo ? 'scale(1.06)' : 'scale(1)',
          opacity: isPlayingVideo ? 0 : 1,
          zIndex: 1
        }}
      />

      {/* 2. Secondary Static Angle (Fallback underneath video) */}
      {secondaryImage && !isPlayingVideo && (
        <img
          src={secondaryImage}
          alt={`${name} alternate angle`}
          className="secondary-img"
          loading="lazy"
          style={{
            position: 'absolute',
            inset: padding,
            width: `calc(100% - (${padding} * 2))`,
            height: `calc(100% - (${padding} * 2))`,
            objectFit: 'contain',
            objectPosition: 'center',
            opacity: isHovered && !isPlayingVideo ? 1 : 0,
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1
          }}
        />
      )}

      {/* 3. 2-Second Looping Studio Video on Hover */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          playsInline
          loop
          preload="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isPlayingVideo ? 1 : 0,
            transition: 'opacity 0.35s ease',
            zIndex: 2,
            pointerEvents: 'none',
            borderRadius: isDetailView ? '6px' : '4px'
          }}
        />
      )}

      {/* 4. Cute Light Beam Shimmer Sweep */}
      <div
        className={`diamond-shine-beam ${isHovered ? 'animate-beam' : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '60%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
          opacity: 0
        }}
      />

      {/* 5. Cute Twinkling Sparkle Stars Array */}
      {isHovered && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
          {/* Sparkle 1: Top Right Facet */}
          <div 
            className="cute-sparkle sparkle-1"
            style={{
              position: 'absolute',
              top: '24%',
              right: '28%',
              color: '#111111',
              filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.95))'
            }}
          >
            <Sparkles size={16} fill="#111111" />
          </div>

          {/* Sparkle 2: Center Diamond Table */}
          <div 
            className="cute-sparkle sparkle-2"
            style={{
              position: 'absolute',
              top: '40%',
              left: '32%',
              color: '#111111',
              filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.95))'
            }}
          >
            <Sparkles size={13} fill="#111111" />
          </div>

          {/* Sparkle 3: Left Girdle Flare */}
          <div 
            className="cute-sparkle sparkle-3"
            style={{
              position: 'absolute',
              bottom: '32%',
              right: '35%',
              color: '#111111',
              filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.95))'
            }}
          >
            <Sparkles size={18} fill="#111111" />
          </div>
        </div>
      )}

      {/* 6. Cute Micro Badge ("2s Studio Video") */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: isDetailView ? '1rem' : 'auto',
          left: isDetailView ? 'auto' : 'auto',
          bottom: !isDetailView ? '0.75rem' : 'auto',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(6px)',
          transition: 'all 0.25s ease',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            backgroundColor: 'rgba(20, 20, 20, 0.88)',
            color: '#FAF7F2',
            padding: '0.25rem 0.55rem',
            borderRadius: '99px',
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            backdropFilter: 'blur(6px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.18)'
          }}
        >
          <span 
            style={{ 
              width: '5px', 
              height: '5px', 
              borderRadius: '50%', 
              backgroundColor: '#10B981',
              display: 'inline-block',
              animation: 'cutePulse 1.2s infinite ease-in-out'
            }} 
          />
          {isPlayingVideo ? 'Playing 2s Video' : '2s Studio View'}
        </span>
      </div>

    </div>
  );
}
