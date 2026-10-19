CREATE TABLE IF NOT EXISTS moderation_cases (
 id BIGSERIAL PRIMARY KEY,
 guild_id TEXT NOT NULL,
 action TEXT NOT NULL,
 target_id TEXT NOT NULL,
 actor_id TEXT NOT NULL,
 reason TEXT,
 details JSONB NOT NULL DEFAULT '{}'::jsonb,
 voided BOOLEAN NOT NULL DEFAULT FALSE,
 void_reason TEXT,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS moderation_cases_lookup ON moderation_cases(guild_id,target_id,id DESC);
CREATE TABLE IF NOT EXISTS moderation_config (
 guild_id TEXT PRIMARY KEY,
 channel_id TEXT
);
