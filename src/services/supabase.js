// Avi Jewelers USA — Supabase Client & Data Synchronization Layer
// Supports live Supabase cloud database with automatic fallback to persistent local storage

import { createClient } from '@supabase/supabase-js';
import { INITIAL_PRODUCTS, CUSTOM_SHOWCASE, TESTIMONIALS } from '../data/jewelryData';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// LocalStorage Keys for persistent fallback
const STORAGE_KEYS = {
  PRODUCTS: 'avi_jewelers_products_v5',
  INQUIRIES: 'avi_jewelers_inquiries_v1',
  APPOINTMENTS: 'avi_jewelers_appointments_v1',
  SHOWCASE: 'avi_jewelers_showcase_v2',
  TESTIMONIALS: 'avi_jewelers_testimonials_v1'
};

// Helper to safely get local items
function getLocalItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

// Helper to safely save local items
function setLocalItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to storage:`, err);
  }
}

// Initialize seed data if empty, and sanitize any legacy cached broken links
export function initStoreData() {
  // Purge legacy v1 cache if exists to ensure immediate fresh images
  if (localStorage.getItem('avi_jewelers_products_v1')) {
    localStorage.removeItem('avi_jewelers_products_v1');
  }
  if (localStorage.getItem('avi_jewelers_showcase_v1')) {
    localStorage.removeItem('avi_jewelers_showcase_v1');
  }

  if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
    setLocalItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  } else {
    // Check if stored products contains any broken legacy URL and auto-repair
    const existing = getLocalItem(STORAGE_KEYS.PRODUCTS, []);
    const jsonStr = JSON.stringify(existing);
    if (jsonStr.includes('photo-1543290176-a0bc7e8245ea') || jsonStr.includes('photo-1611591475837-7756e4093910')) {
      const repaired = JSON.parse(
        jsonStr
          .replaceAll('photo-1543290176-a0bc7e8245ea', 'photo-1602751584552-8ba73aad10e1')
          .replaceAll('photo-1611591475837-7756e4093910', 'photo-1599643477877-530eb83abc8e')
      );
      setLocalItem(STORAGE_KEYS.PRODUCTS, repaired);
    }
  }

  if (!localStorage.getItem(STORAGE_KEYS.SHOWCASE)) {
    setLocalItem(STORAGE_KEYS.SHOWCASE, CUSTOM_SHOWCASE);
  }
  if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
    setLocalItem(STORAGE_KEYS.TESTIMONIALS, TESTIMONIALS);
  }
}

// ==========================================
// PRODUCTS API
// ==========================================

export async function fetchProducts() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
    }
  }

  // Fallback to local storage
  initStoreData();
  return getLocalItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export async function saveProduct(product) {
  const currentProducts = await fetchProducts();
  const existingIndex = currentProducts.findIndex(p => p.id === product.id);
  let updatedProducts;

  if (existingIndex >= 0) {
    updatedProducts = [...currentProducts];
    updatedProducts[existingIndex] = { ...updatedProducts[existingIndex], ...product, updatedAt: new Date().toISOString() };
  } else {
    const newId = product.id || `avi-${Date.now().toString().slice(-4)}`;
    const newProduct = {
      ...product,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    updatedProducts = [newProduct, ...currentProducts];
  }

  setLocalItem(STORAGE_KEYS.PRODUCTS, updatedProducts);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').upsert(product);
    } catch (err) {
      console.error('Supabase saveProduct error:', err);
    }
  }

  return updatedProducts;
}

export async function deleteProduct(productId) {
  const currentProducts = await fetchProducts();
  const filtered = currentProducts.filter(p => p.id !== productId);
  setLocalItem(STORAGE_KEYS.PRODUCTS, filtered);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').delete().eq('id', productId);
    } catch (err) {
      console.error('Supabase deleteProduct error:', err);
    }
  }

  return filtered;
}

// Bulk CSV Importer for 40-50 products
export async function importProductsFromCsv(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) throw new Error('CSV must contain a header and at least one data row');

  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const parsedProducts = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle comma-separated fields with quote escapes
    const regex = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g;
    const values = [];
    let match;
    while ((match = regex.exec(line)) !== null && values.length < headers.length) {
      let val = match[1];
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      values.push(val.trim());
    }

    const row = {};
    headers.forEach((h, index) => {
      row[h] = values[index] || '';
    });

    const product = {
      id: row.id || `avi-import-${Date.now()}-${i}`,
      name: row.name || 'Bespoke Fine Jewelry Piece',
      category: row.category || 'engagement-rings',
      shape: row.shape || 'round',
      stoneType: row.stoneType || 'lab-diamond',
      badge: row.badge || 'IGI Certified Lab Diamond',
      price: parseFloat(row.price) || 2500,
      compareAtPrice: parseFloat(row.compareAtPrice) || (parseFloat(row.price) ? parseFloat(row.price) * 1.25 : 3200),
      rating: parseFloat(row.rating) || 5.0,
      reviewCount: parseInt(row.reviewCount, 10) || 12,
      primaryImage: row.primaryImage || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=85',
      secondaryImage: row.secondaryImage || 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=85',
      metalOptions: row.metalOptions ? row.metalOptions.split(';') : ["14k Yellow Gold", "14k White Gold", "Platinum"],
      carat: row.carat || '2.00 Carat',
      color: row.color || 'E',
      clarity: row.clarity || 'VS1',
      cut: row.cut || 'Ideal',
      certification: row.certification || 'Certified',
      leadTime: row.leadTime || 'Ships in 3-4 weeks',
      description: row.description || 'Masterfully crafted in Chicago with certified diamonds or moissanite.',
      isBestSeller: row.isBestSeller === 'true' || row.isBestSeller === '1',
      isFeatured: row.isFeatured === 'true' || row.isFeatured === '1'
    };

    parsedProducts.push(product);
  }

  const existing = await fetchProducts();
  // Merge by ID or append
  const mergedMap = new Map();
  existing.forEach(p => mergedMap.set(p.id, p));
  parsedProducts.forEach(p => mergedMap.set(p.id, p));

  const allUpdated = Array.from(mergedMap.values());
  setLocalItem(STORAGE_KEYS.PRODUCTS, allUpdated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('products').upsert(parsedProducts);
    } catch (err) {
      console.error('Supabase bulk upsert error:', err);
    }
  }

  return allUpdated;
}

// ==========================================
// CUSTOM INQUIRIES API (/custom)
// ==========================================

export async function submitCustomInquiry(inquiryData) {
  const referenceId = `AVI-BESP-${Math.floor(100000 + Math.random() * 900000)}`;
  const submission = {
    ...inquiryData,
    referenceId,
    status: 'New',
    createdAt: new Date().toISOString()
  };

  // Local storage save
  const existing = getLocalItem(STORAGE_KEYS.INQUIRIES, []);
  setLocalItem(STORAGE_KEYS.INQUIRIES, [submission, ...existing]);

  // Cloud Supabase save
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('custom_inquiries').insert([submission]);
    } catch (err) {
      console.error('Supabase submitCustomInquiry error:', err);
    }
  }

  // Simulated email dispatch notification to owner (e.g. info@avijewelersusa.com)
  console.log(`[Avi Jewelers Notification] New bespoke custom inquiry received: #${referenceId} from ${inquiryData.firstName} ${inquiryData.lastName} (${inquiryData.email})`);

  return submission;
}

export async function fetchCustomInquiries() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('custom_inquiries')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase fetchCustomInquiries fallback:', err);
    }
  }
  return getLocalItem(STORAGE_KEYS.INQUIRIES, [
    {
      referenceId: 'AVI-BESP-892104',
      firstName: 'Emily',
      lastName: 'Vance',
      email: 'emily.vance@example.com',
      phone: '312-555-0199',
      ringShape: 'oval',
      ringType: 'Hidden Halo Solitaire',
      metal: 'Platinum',
      stonePreference: 'IGI Lab-Grown Diamond',
      budgetRange: '$5,000 - $7,500',
      ringSize: '6.5',
      inspoLink: 'https://pinterest.com/pin/sample-ring',
      description: 'Looking for a thin 1.8mm band, hidden halo with pink sapphire detail underneath.',
      consultationDate: '2026-10-15',
      consultationTime: '2:00 PM CST',
      status: 'CAD In Progress',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    }
  ]);
}

export async function updateInquiryStatus(referenceId, newStatus) {
  const inquiries = await fetchCustomInquiries();
  const updated = inquiries.map(item =>
    item.referenceId === referenceId ? { ...item, status: newStatus } : item
  );
  setLocalItem(STORAGE_KEYS.INQUIRIES, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('custom_inquiries')
        .update({ status: newStatus })
        .eq('referenceId', referenceId);
    } catch (err) {
      console.error('Supabase updateInquiryStatus error:', err);
    }
  }

  return updated;
}

// ==========================================
// APPOINTMENTS API
// ==========================================

export async function submitAppointment(appointmentData) {
  const appt = {
    ...appointmentData,
    id: `APPT-${Date.now().toString().slice(-6)}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  };

  const existing = getLocalItem(STORAGE_KEYS.APPOINTMENTS, []);
  setLocalItem(STORAGE_KEYS.APPOINTMENTS, [appt, ...existing]);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('appointments').insert([appt]);
    } catch (err) {
      console.error('Supabase appointment save error:', err);
    }
  }

  return appt;
}

export async function fetchAppointments() {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('createdAt', { ascending: false });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase fetchAppointments fallback:', err);
    }
  }
  return getLocalItem(STORAGE_KEYS.APPOINTMENTS, [
    {
      id: 'APPT-781920',
      fullName: 'Michael Torres',
      email: 'm.torres@gmail.com',
      phone: '331-555-8812',
      type: 'Virtual Zoom Consultation',
      date: '2026-10-18',
      time: '4:00 PM CST',
      notes: 'Wants to compare 2.5ct vs 3.0ct radiant cuts on hand.',
      status: 'Confirmed',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ]);
}
