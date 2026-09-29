// About Page — Authentic Story & Ethos from avijewelersco.com
import React from 'react';
import { Award, ShieldCheck, Sparkles, CheckCircle2, Hammer, Heart, Phone, Mail } from 'lucide-react';

export default function AboutPage({ onStartCustom, onShopNow }) {
  return (
    <div className="about-page" style={{ backgroundColor: 'var(--bg-warm-ivory)', minHeight: '100vh', paddingBottom: '6rem' }}>
      
      {/* Hero Header */}
      <section 
        style={{
          position: 'relative',
          padding: 'clamp(4.5rem, 8vw, 7rem) 0',
          background: 'linear-gradient(rgba(18, 18, 18, 0.65), rgba(18, 18, 18, 0.85)), url("https://static.wixstatic.com/media/ec0575_15f3ce294af440c99d28d234bc4404ddf002.jpg") center/cover no-repeat',
          color: '#FAF7F2',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '840px', position: 'relative', zIndex: 2 }}>
          <span className="eyebrow" style={{ color: 'rgba(250, 247, 242, 0.8)', letterSpacing: '0.2em' }}>
            Avi Jewelers USA • Chicago Custom Designers
          </span>
          <h1 style={{ color: '#FAF7F2', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', marginBottom: '1.2rem', lineHeight: 1.15 }}>
            About Avi Jewelry USA
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', color: 'rgba(250, 247, 242, 0.9)', lineHeight: 1.6, maxWidth: '700px', margin: '0 auto' }}>
            Welcome to our bespoke concierge jewelry service. Collaborate with us to design a unique piece from start to finish in only 3–4 weeks.
          </p>
        </div>
      </section>

      {/* Narrative Story Section */}
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '1080px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            
            {/* Left Story Imagery */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  aspectRatio: '4 / 5',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-soft)',
                  boxShadow: 'var(--shadow-card)'
                }}
              >
                <img 
                  src="https://static.wixstatic.com/media/ec0575_dc50e86533d54fd8bab86e2bc7947c7e~mv2.jpg" 
                  alt="Avi Jewelers handcrafted certified jewelry"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '-1.2rem',
                  right: '-0.8rem',
                  backgroundColor: '#FFFFFF',
                  padding: '1.2rem 1.6rem',
                  borderRadius: '4px',
                  border: '1px solid var(--border-soft)',
                  boxShadow: 'var(--shadow-hover)',
                  maxWidth: '280px'
                }}
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Client Commitment
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-charcoal)', marginTop: '0.2rem' }}>
                  "Let us help you find your next AVI!"
                </div>
              </div>
            </div>

            {/* Right Story Text (Authentic client text from avijewelersco.com) */}
            <div>
              <span className="eyebrow">Our Story & Mission</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', marginBottom: '1.2rem', lineHeight: 1.2 }}>
                Passion for Certified Excellence
              </h2>

              <p style={{ fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--text-charcoal-light)', marginBottom: '1.2rem' }}>
                At <strong>Avi Jewelry USA</strong>, we are passionate about providing our customers with the highest quality, ethically sourced, and certified jewelry. Our team strives for excellence and is comprised of an experienced panel of jewelry experts who are dedicated to helping you find the perfect piece for any occasion.
              </p>

              <p style={{ fontSize: '0.98rem', lineHeight: 1.75, color: 'var(--text-charcoal-light)', marginBottom: '1.2rem' }}>
                Whether you're searching for an engagement ring, necklace, earrings, or any other type of fine jewelry, we have a wide variety of high quality pieces to choose from. We take pride in our commitment to quality and excellent customer service.
              </p>

              <div 
                style={{
                  backgroundColor: '#FFFFFF',
                  borderLeft: '3px solid var(--text-charcoal)',
                  padding: '1.2rem 1.5rem',
                  borderRadius: '0 4px 4px 0',
                  marginBottom: '1.8rem',
                  fontSize: '0.92rem',
                  lineHeight: 1.65,
                  color: 'var(--text-charcoal)'
                }}
              >
                "Welcome to our bespoke CONCIERGE jewelry service, where we turn your vision into exquisite creations. Collaborate with us to design a unique piece from start to finish in <strong>ONLY 3–4 WEEKS</strong>, with comfortable virtual consultations and secure delivery to your doorstep. Let's create something remarkable together."
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-charcoal)', fontFamily: 'var(--font-serif)' }}>IGI & GRA</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Certified Authenticity</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-charcoal)', fontFamily: 'var(--font-serif)' }}>3–4 Weeks</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Design to Delivery</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
                  <div style={{ fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-charcoal)', fontFamily: 'var(--font-serif)' }}>Chicago</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Custom Designers</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={onStartCustom} 
                  className="btn btn-lg"
                  style={{ backgroundColor: 'var(--text-charcoal)', color: '#FFFFFF', fontSize: '0.8rem' }}
                >
                  <Sparkles size={15} /> Start Your Custom Ring
                </button>
                <button 
                  onClick={onShopNow} 
                  className="btn btn-outline btn-lg"
                  style={{ borderColor: 'var(--text-charcoal)', fontSize: '0.8rem' }}
                >
                  View Collections
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Direct Contact Bar */}
      <section style={{ backgroundColor: '#FFFFFF', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)', padding: '2.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.3rem' }}>
              Have Questions or Custom Ideas?
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Call or text our Chicago atelier directly at (331) 575-4525 for immediate concierge assistance.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <a 
              href="tel:3315754525" 
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderColor: 'var(--text-charcoal)', fontSize: '0.78rem' }}
            >
              <Phone size={14} /> Call / Text 331-575-4525
            </a>
            <a 
              href="mailto:avijewelersusa@gmail.com" 
              className="btn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--text-charcoal)', color: '#FFFFFF', fontSize: '0.78rem' }}
            >
              <Mail size={14} /> Email Inquiries
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
