import { supabase } from "@/lib/supabase";

export const getHomeFeed = async (userId: string) => {
  const today = new Date().toISOString().slice(0, 10);

  const { data: userSports, error: userSportsError } = await supabase
    .from("user_sports")
    .select("sport_id")
    .eq("user_id", userId);

  if (userSportsError) {
    throw new Error(userSportsError.message);
  }

  const userSportSet = new Set(
    (userSports ?? []).map((item: { sport_id: number }) => item.sport_id),
  );

  const [
    { data: happeningNow, error: eventsError },
    { data: courts, error: courtsError },
  ] = await Promise.all([
    supabase
      .from("events")
      .select("*, sports(name)")
      .eq("date", today)
      .order("created_at", { ascending: false }),
    supabase
      .from("courts")
      .select("*, sports(name)")
      .order("created_at", { ascending: false }),
  ]);

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  if (courtsError) {
    throw new Error(courtsError.message);
  }

  const prioritizedCourts = (courts ?? []).sort((a: any, b: any) => {
    const aPriority = userSportSet.has(a.sport_id) ? 1 : 0;
    const bPriority = userSportSet.has(b.sport_id) ? 1 : 0;
    return bPriority - aPriority;
  });

  return {
    happeningNow: happeningNow ?? [],
    placesToPlay: prioritizedCourts,
  };
};
