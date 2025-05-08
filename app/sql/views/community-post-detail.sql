CREATE OR REPLACE VIEW community_post_detail AS
SELECT
    p.post_id,
    p.title,
    p.content,
    p.upvotes,
    p.created_at,
    t.topic_id,
    t.name AS topic_name,
    t.slug AS topic_slug,
    COUNT(pr.post_reply_id) AS replies,
    pf.name AS author_name,
    pf.avatar AS author_avatar,
    pf.role AS author_role,
    pf.created_at AS author_created_at,
    (SELECT COUNT(*) FROM products WHERE products.profile_id = pf.profile_id) AS products
FROM posts p
INNER JOIN topics t USING (topic_id)
LEFT JOIN post_replies pr USING (post_id)
INNER JOIN profiles pf ON (pf.profile_id = p.profile_id)
GROUP BY p.post_id, t.topic_id, t.name, t.slug, pf.profile_id, pf.name, pf.avatar, pf.role, pf.created_at;