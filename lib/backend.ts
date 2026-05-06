// Shared types and utilities
export type CreateBaseInput = {
  userId: string;
  title: string;
  category: string;
  description: string;
  location: string;
  date: string;
  timeRange: string;
  fee: number;
  capacity: number;
  imageUri?: string;
};

export type CreateCourtInput = CreateBaseInput & {
  courtCount: number;
};

// Re-export functions from organized modules
export { completeOnboarding } from "./auth/backend";
export { getUserBookings } from "./bookings/backend";
export { createCourt, createEvent } from "./create/backend";
export { getHomeFeed } from "./home/backend";
export { getAllListings, getListingById } from "./lists/backend";

