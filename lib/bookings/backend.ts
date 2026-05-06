import { supabase } from "@/lib/supabase";

export const getUserBookings = async (userId: string) => {
  const { data: eventBookings, error: eventBookingsError } = await supabase
    .from("event_bookings")
    .select(`
      *,
      events(*, sports(name))
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const { data: courtBookings, error: courtBookingsError } = await supabase
    .from("court_bookings")
    .select(`
      *,
      courts(*, sports(name))
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (eventBookingsError) {
    throw new Error(eventBookingsError.message);
  }

  if (courtBookingsError) {
    throw new Error(courtBookingsError.message);
  }

  const categorizedBookings = {
    events: (eventBookings ?? []).map((booking: any) => ({
      ...booking,
      type: "event",
      title: booking.events?.title || "Unknown Event",
      location: booking.events?.location || "",
      date: booking.date,
      time: booking.time_range,
      fee: booking.events?.fee || 0,
      status: booking.status || "Upcoming",
    })),
    courts: (courtBookings ?? []).map((booking: any) => ({
      ...booking,
      type: "court",
      title: booking.courts?.title || "Unknown Court",
      location: booking.courts?.location || "",
      date: booking.date,
      time: booking.time_range,
      fee: booking.courts?.fee || 0,
      status: booking.status || "Upcoming",
    })),
  };

  return categorizedBookings;
};
