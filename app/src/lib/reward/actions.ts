"use server";

/**
 * Reward server actions — star spending, item purchase, room placement.
 * Based on: outputs/nolla_data_design_0d3.md (stars, collectibles, room_items)
 */
import { createClient } from "@/lib/supabase/server";
import { SHOP_ITEMS } from "./shop-items";

export async function getStarBalance(childId: string): Promise<number> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("stars")
    .select("amount")
    .eq("child_id", childId);

  if (error) return 0;
  return (data ?? []).reduce(
    (sum: number, row: { amount: number }) => sum + row.amount,
    0
  );
}

export async function purchaseItem(
  childId: string,
  itemId: string
): Promise<{ success: boolean; error?: string }> {
  const item = SHOP_ITEMS.find((i) => i.id === itemId);
  if (!item) return { success: false, error: "item_not_found" };

  const balance = await getStarBalance(childId);
  if (balance < item.price) {
    return { success: false, error: "insufficient_stars" };
  }

  const supabase = await createClient();

  // Deduct stars (negative amount)
  const { error: starError } = await supabase.from("stars").insert({
    child_id: childId,
    amount: -item.price,
    reason: "shop_purchase",
  });
  if (starError) return { success: false, error: "star_deduction_failed" };

  // Add collectible
  const { error: collectError } = await supabase
    .from("collectibles")
    .insert({
      child_id: childId,
      item_type: item.type,
      item_id: item.id,
    });
  if (collectError) return { success: false, error: "collectible_insert_failed" };

  return { success: true };
}

export async function placeItem(
  childId: string,
  collectibleId: string,
  x: number,
  y: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("room_items").insert({
    child_id: childId,
    collectible_id: collectibleId,
    position_x: x,
    position_y: y,
  });

  if (error) return { success: false, error: "place_failed" };
  return { success: true };
}

export async function removeItem(
  roomItemId: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("room_items")
    .delete()
    .eq("id", roomItemId);

  if (error) return { success: false, error: "remove_failed" };
  return { success: true };
}

export async function getOwnedCollectibles(childId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("collectibles")
    .select("*")
    .eq("child_id", childId)
    .order("acquired_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function getRoomItems(childId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("room_items")
    .select("*, collectibles(*)")
    .eq("child_id", childId);

  if (error) return [];
  return data ?? [];
}
