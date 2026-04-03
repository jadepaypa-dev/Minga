import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const CHUNK_SIZE = 1900;

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(key);
    }

    const chunkCount = await SecureStore.getItemAsync(`${key}_chunks`);

    if (!chunkCount) return SecureStore.getItemAsync(key);

    let value = "";
    for (let i = 0; i < parseInt(chunkCount); i++) {
      const chunk = await SecureStore.getItemAsync(`${key}_chunk_${i}`);
      value += chunk ?? "";
    }
    return value;
  },

  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, value);
      return;
    }

    if (value.length <= CHUNK_SIZE) {
      await SecureStore.setItemAsync(key, value);
      return;
    }

    const chunks = [];
    for (let i = 0; i < value.length; i += CHUNK_SIZE) {
      chunks.push(value.slice(i, i + CHUNK_SIZE));
    }

    await SecureStore.setItemAsync(`${key}_chunks`, String(chunks.length));
    await Promise.all(
      chunks.map((chunk, i) =>
        SecureStore.setItemAsync(`${key}_chunk_${i}`, chunk),
      ),
    );
  },

  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      if (typeof window === "undefined") return;
      localStorage.removeItem(key);
      return;
    }

    const chunkCount = await SecureStore.getItemAsync(`${key}_chunks`);

    if (chunkCount) {
      await Promise.all(
        Array.from({ length: parseInt(chunkCount) }, (_, i) =>
          SecureStore.deleteItemAsync(`${key}_chunk_${i}`),
        ),
      );
      await SecureStore.deleteItemAsync(`${key}_chunks`);
    }

    await SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      storage: ExpoSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
