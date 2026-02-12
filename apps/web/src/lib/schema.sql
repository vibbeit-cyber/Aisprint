-- ============================================================
-- EdTech Platform - Database Schema
-- Run this against your PostgreSQL database before deploying
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(20) NOT NULL,
  experience    VARCHAR(100) NOT NULL,
  career_goal   TEXT NOT NULL,
  course_type   VARCHAR(100) NOT NULL,
  source        VARCHAR(100) DEFAULT 'website',
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by email
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Index for filtering by course
CREATE INDEX IF NOT EXISTS idx_leads_course_type ON leads(course_type);

-- Index for date-range queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  subject     VARCHAR(500) NOT NULL,
  message     TEXT NOT NULL,
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_inquiries(created_at DESC);
