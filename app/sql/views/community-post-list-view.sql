CREATE OR REPLACE VIEW community_post_list_view AS
SELECT
    p.post_id,
    p.title,
    p.created_at,
    t.name AS topic,
    pr.name AS author,
    pr.avatar AS author_avatar,
    pr.username AS author_username,
    p.upvotes,
    t.slug AS topic_slug
FROM posts p
INNER JOIN topics t USING (topic_id)
INNER JOIN profiles pr USING (profile_id);