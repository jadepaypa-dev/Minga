import { supabase } from "@/lib/supabase";

export const completeOnboarding = async (userId: string, sportIds: number[]) => {
  const normalizedSportIds = Array.from(new Set(sportIds)).filter(
    (sportId) => Number.isInteger(sportId) && sportId > 0,
  );

  const { error: deleteError } = await supabase
    .from("user_sports")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  if (normalizedSportIds.length > 0) {
    const payload = normalizedSportIds.map((sportId) => ({
      user_id: userId,
      sport_id: sportId,
    }));

    const { error: insertError } = await supabase
      .from("user_sports")
      .insert(payload);

    if (insertError) {
      throw new Error(insertError.message);
    }
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ completed_onboarding: true })
    .eq("id", userId);

  if (profileError) {
    throw new Error(profileError.message);
  }
};
