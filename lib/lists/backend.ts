import { supabase } from "@/lib/supabase";

export const getAllListings = async (search?: string, category?: string) => {
  let eventsQuery = supabase
    .from("events")
    .select("*, sports(name)")
    .order("created_at", { ascending: false });

  let courtsQuery = supabase
    .from("courts")
    .select("*, sports(name)")
    .order("created_at", { ascending: false });

  if (search) {
    eventsQuery = eventsQuery.ilike("title", `%${search}%`);
    courtsQuery = courtsQuery.ilike("title", `%${search}%`);
  }

  if (category && category !== "All") {
    eventsQuery = eventsQuery.eq("category", category);
    courtsQuery = courtsQuery.eq("category", category);
  }

  const [
    { data: events, error: eventsError },
    { data: courts, error: courtsError },
  ] = await Promise.all([eventsQuery, courtsQuery]);

  if (eventsError) {
    throw new Error(eventsError.message);
  }

  if (courtsError) {
    throw new Error(courtsError.message);
  }

  const combinedListings = [
    ...(events ?? []).map((event: any) => ({ ...event, type: "event" })),
    ...(courts ?? []).map((court: any) => ({ ...court, type: "court" })),
  ];

  return combinedListings.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
};

export const getListingById = async (id: string, type: "event" | "court") => {
  const table = type === "event" ? "events" : "courts";

  const { data, error } = await supabase
    .from(table)
    .select("*, sports(name)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { ...data, type };
};
