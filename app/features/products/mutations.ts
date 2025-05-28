import type { SupabaseClient } from "@supabase/supabase-js";

export const createProductReview = async (
    client: SupabaseClient,
    {
        productId,
        review,
        rating,
        userId,
    }: {
        productId: number,
        review: string,
        rating: number,
        userId: string
    }
) => {
    const { error } = await client.from("reviews").insert({
        product_id: Number(productId),
        review: review,
        rating: rating,
        profile_id: userId,
    });
    if (error) {
        throw error;
    }
}