CREATE OR REPLACE VIEW gpt_ideas_view AS
SELECT
    gi.gpt_idea_id,
    CASE WHEN
        gi.claimed_at IS NULL THEN gi.idea
        ELSE 'ClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimedClaimed'
    END AS idea,
    gi.views,
    CASE WHEN
        gi.claimed_at IS NULL THEN FALSE
        ELSE TRUE
    END AS is_claimed,
    COUNT(gil.gpt_idea_id) AS likes,
    gi.created_at
FROM public.gpt_ideas gi
LEFT JOIN public.gpt_ideas_likes gil USING (gpt_idea_id)
GROUP BY gi.gpt_idea_id;
