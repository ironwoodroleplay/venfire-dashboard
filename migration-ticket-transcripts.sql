CREATE TABLE IF NOT EXISTS ticket_transcripts (
 ticket_id BIGINT PRIMARY KEY,
 guild_id TEXT NOT NULL,
 opener_id TEXT NOT NULL,
 closed_by TEXT NOT NULL,
 content TEXT NOT NULL,
 saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS ticket_transcripts_guild_idx ON ticket_transcripts(guild_id,saved_at DESC);
