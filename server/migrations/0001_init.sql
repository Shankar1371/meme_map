-- enable postgis extension
to be safe we use 'CREATE EXTENSION IF NOT EXISTS postgis;'
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE users (
  id UUID PRIMARY KEY,
  handle TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now(),
  strike_count INT DEFAULT 0
);

CREATE TABLE memes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  image_url TEXT NOT NULL,
  text_top TEXT DEFAULT '',
  text_bottom TEXT DEFAULT '',
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  geohash TEXT NOT NULL,
  geom GEOGRAPHY(Point,4326) NOT NULL,
  score INT DEFAULT 0,
  comment_count INT DEFAULT 0,
  status TEXT DEFAULT 'active', -- active|quarantined|deleted
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_memes_geom ON memes USING GIST(geom);
CREATE INDEX idx_memes_score ON memes(score DESC);

CREATE TABLE votes (
  user_id UUID REFERENCES users(id),
  meme_id UUID REFERENCES memes(id),
  value SMALLINT NOT NULL CHECK (value IN (-1,1)),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, meme_id)
);

CREATE TABLE comments (
  id UUID PRIMARY KEY,
  meme_id UUID REFERENCES memes(id),
  user_id UUID REFERENCES users(id),
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active'
);

CREATE TABLE reports (
  id UUID PRIMARY KEY,
  meme_id UUID REFERENCES memes(id),
  user_id UUID REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
