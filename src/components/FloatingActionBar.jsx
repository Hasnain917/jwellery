// Floating Mobile Quick Contact Action Bar (Call & WhatsApp)
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActionBar() {
  const phoneNumber = "3315754525";
  const whatsappUrl = `https://wa.me/13315754525?text=${encodeURIComponent("Hello Avi Jewelers! I am interested in designing a bespoke engagement ring.")}`;

  return (
    <div className="floating-action-bar show-mobile-only" style={{ display: 'none' }}>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn-whatsapp"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <a 
        href={`tel:${phoneNumber}`}
        className="floating-btn floating-btn-phone"
        aria-label="Call Avi Jewelers"
        title="Call (331) 575-4525"
      >
        <Phone size={22} />
      </a>
    </div>
  );
}
