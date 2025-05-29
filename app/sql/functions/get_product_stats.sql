CREATE OR REPLACE FUNCTION get_product_stats(product_id bigint)
RETURNS TABLE (
    views bigint,
    visitors bigint,
    month text
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        COUNT(*) AS views,
        COUNT(DISTINCT events.profile_id) AS visitors,
        TO_CHAR(events.created_at, 'YYYY-MM') AS month
    FROM
        public.events
    WHERE
        event_data ->> 'product_id' = product_id::text
    GROUP BY month
    ORDER BY month;
END;
$$ LANGUAGE plpgsql;