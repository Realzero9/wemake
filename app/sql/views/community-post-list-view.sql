CREATE VIEW community_post_list_view AS
SELECT
    p.post_id,
    p.title,
    p.created_at,
    t.name AS topic,
    pr.name AS author,
    pr.avatar AS author_avatar,
    pr.username AS author_username,
    COUNT(upvotes.post_id) AS upvotes
FROM posts p
INNER JOIN topics t USING (topic_id)
INNER JOIN profiles pr USING (profile_id)
LEFT JOIN post_upvotes upvotes USING (post_id)
GROUP BY p.post_id, t.name, pr.name, pr.avatar, pr.username;