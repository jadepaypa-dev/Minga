import { supabase } from "@/lib/supabase";

type CreateBaseInput = {
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

type CreateCourtInput = CreateBaseInput & {
  courtCount: number;
};

const STORAGE_BUCKET = "listing-images";

const getExtFromUri = (uri: string) => {
  const cleanUri = uri.split("?")[0];
  const parts = cleanUri.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "jpg";
};

const getMimeType = (ext: string) => {
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  return "image/jpeg";
};

const resolveSportIdByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from("sports")
    .select("id")
    .ilike("name", category.trim())
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data?.id ?? null;
};

export const uploadListingImage = async (userId: string, imageUri: string) => {
  const response = await fetch(imageUri);
  const buffer = await response.arrayBuffer();
  const ext = getExtFromUri(imageUri);
  const mimeType = getMimeType(ext);
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, buffer, { contentType: mimeType, upsert: false });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(path);

  return publicUrlData.publicUrl;
};

export const createEvent = async (input: CreateBaseInput) => {
  const sportId = await resolveSportIdByCategory(input.category);
  const imageUrl = input.imageUri
    ? await uploadListingImage(input.userId, input.imageUri)
    : null;

  const { data, error } = await supabase
    .from("events")
    .insert({
      created_by: input.userId,
      title: input.title.trim(),
      description: input.description.trim(),
      location: input.location.trim(),
      date: input.date.trim(),
      time_range: input.timeRange.trim(),
      fee: input.fee,
      capacity: input.capacity,
      sport_id: sportId,
      category: input.category.trim(),
      image_url: imageUrl,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createCourt = async (input: CreateCourtInput) => {
  const sportId = await resolveSportIdByCategory(input.category);
  const imageUrl = input.imageUri
    ? await uploadListingImage(input.userId, input.imageUri)
    : null;

  const { data, error } = await supabase
    .from("courts")
    .insert({
      created_by: input.userId,
      title: input.title.trim(),
      description: input.description.trim(),
      location: input.location.trim(),
      date: input.date.trim(),
      time_range: input.timeRange.trim(),
      fee: input.fee,
      capacity: input.capacity,
      court_count: input.courtCount,
      sport_id: sportId,
      category: input.category.trim(),
      image_url: imageUrl,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
