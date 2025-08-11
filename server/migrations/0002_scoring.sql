CREATE OR REPLACE FUNCTION recompute_meme_score(m_id UUID) RETURNS VOID AS $$
DECLARE
  up INT;
  down INT;
  comments INT;
  created TIMESTAMPTZ;
  newscore FLOAT;
  decay FLOAT;
BEGIN
  SELECT created_at INTO created FROM memes WHERE id = m_id;
  SELECT COALESCE(SUM(CASE WHEN value = 1 THEN 1 END),0),
         COALESCE(SUM(CASE WHEN value = -1 THEN 1 END),0)
    INTO up, down
    FROM votes WHERE meme_id = m_id;
  SELECT COUNT(*) INTO comments FROM comments WHERE meme_id = m_id AND status='active';
  decay := floor(EXTRACT(EPOCH FROM (now()-created))/3600) * 0.1;
  newscore := up - down + 0.5 * comments - decay;
  UPDATE memes SET score = newscore, comment_count = comments WHERE id = m_id;
END;
$$ LANGUAGE plpgsql;
