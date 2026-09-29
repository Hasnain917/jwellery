-- =========================================================================
-- AVI JEWELERS USA — SUPABASE DATABASE SCHEMA
-- Execute in your Supabase SQL Editor (https://app.supabase.com)
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  shape TEXT,
  "stoneType" TEXT,
  badge TEXT,
  price NUMERIC(10, 2) NOT NULL,
  "compareAtPrice" NUMERIC(10, 2),
  rating NUMERIC(3, 1) DEFAULT 5.0,
  "reviewCount" INTEGER DEFAULT 0,
  "primaryImage" TEXT NOT NULL,
  "secondaryImage" TEXT,
  "metalOptions" TEXT[],
  carat TEXT,
  color TEXT,
  clarity TEXT,
  cut TEXT,
  certification TEXT,
  "leadTime" TEXT,
  description TEXT,
  "isBestSeller" BOOLEAN DEFAULT false,
  "isFeatured" BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CUSTOM INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.custom_inquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  "referenceId" TEXT UNIQUE NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  "ringType" TEXT,
  "ringShape" TEXT,
  metal TEXT,
  "stonePreference" TEXT,
  "budgetRange" TEXT,
  "ringSize" TEXT,
  "inspoLink" TEXT,
  description TEXT,
  "imageUrls" TEXT[],
  "consultationDate" DATE,
  "consultationTime" TEXT,
  status TEXT DEFAULT 'New',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  type TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'Confirmed',
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) policies
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Allow public read access to products" ON public.products
  FOR SELECT USING (true);

-- Allow authenticated or anon insert for custom inquiries and appointments
CREATE POLICY "Allow public insert to custom inquiries" ON public.custom_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to appointments" ON public.appointments
  FOR INSERT WITH CHECK (true);

-- Allow read and write for admin / anon with public key (or configure your Supabase service role key)
CREATE POLICY "Allow anon read custom inquiries" ON public.custom_inquiries
  FOR SELECT USING (true);

CREATE POLICY "Allow anon update custom inquiries" ON public.custom_inquiries
  FOR UPDATE USING (true);

CREATE POLICY "Allow anon read appointments" ON public.appointments
  FOR SELECT USING (true);

CREATE POLICY "Allow anon all on products" ON public.products
  FOR ALL USING (true);
