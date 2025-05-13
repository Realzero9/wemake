import { browserClient } from "~/supa-client";
import type { Route } from "./+types/product-visit-page";
import { redirect } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { error, data } = await browserClient.from("products")
    .select("url")
    .eq("product_id", Number(params.productId))
    .single();
  if (data) {
    await browserClient.rpc("track_events", {
      event_type: "product_visit",
      event_data: {
        product_id: params.productId,
      },
    });
    return redirect(data.url);
  }
}
