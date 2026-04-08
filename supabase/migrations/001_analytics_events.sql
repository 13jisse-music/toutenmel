CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id TEXT NOT NULL, fingerprint TEXT, user_id UUID,
    is_authenticated BOOLEAN DEFAULT false, event_type TEXT NOT NULL,
    event_data JSONB DEFAULT '{}', page_path TEXT NOT NULL, page_title TEXT,
    referrer TEXT, utm_source TEXT, utm_medium TEXT, utm_campaign TEXT, utm_content TEXT,
    device_type TEXT, browser TEXT, os TEXT, screen_width INTEGER, screen_height INTEGER,
    viewport_width INTEGER, viewport_height INTEGER, language TEXT,
    ip_address INET, city TEXT, region TEXT, country TEXT,
    latitude DOUBLE PRECISION, longitude DOUBLE PRECISION,
    project TEXT NOT NULL DEFAULT 'tem',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_ae_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_ae_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_ae_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_ae_page_path ON analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_ae_project ON analytics_events(project);
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role insert analytics_events" ON analytics_events FOR INSERT WITH CHECK (true);
