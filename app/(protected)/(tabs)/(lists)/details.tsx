import { getListingById } from "@/lib/lists/backend";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

const amenities = [
  { icon: "droplet", label: "Water" },
  { icon: "sun", label: "Outdoor" },
  { icon: "users", label: "10 slots" },
  { icon: "droplet", label: "Water" },
  { icon: "sun", label: "Outdoor" },
  { icon: "users", label: "10 slots" },
  { icon: "droplet", label: "Water" },
  { icon: "sun", label: "Outdoor" },
  { icon: "users", label: "10 slots" },
];

export default function Details() {
  const router = useRouter();
  const { id, type } = useLocalSearchParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListing();
  }, [id, type]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const data = await getListingById(
        String(id),
        String(type) as "event" | "court",
      );
      setListing(data);
    } catch (error) {
      console.error("Error fetching listing:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!listing) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text>Listing not found</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-white">
      <StatusBar translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={{ height: 320 }}>
          <Image
            source={
              listing.image_url
                ? { uri: listing.image_url }
                : require("@/assets/images/badminton.jpg")
            }
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />

          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            className="absolute left-4 bg-white/90 p-2 rounded-full top-16"
          >
            <Feather name="arrow-left" size={20} color="black" />
          </Pressable>

          {/* Image counter */}
          <View className="absolute bottom-8 left-0 right-0 items-center">
            <View className="bg-black/40 px-3 py-1 rounded-full">
              <Text className="text-white text-sm">1 / 5</Text>
            </View>
          </View>
        </View>

        {/* Content Card — overlaps image slightly */}
        <View
          className="flex-1 bg-white px-5 pt-5 gap-4"
          style={{ borderRadius: 28, marginTop: -20 }} // 👈 key to overlap
        >
          {/* Title Row */}
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-semibold flex-1">
              {listing.title}
            </Text>
            <View className="py-2 px-4 bg-green-600 rounded-full">
              <Text className="text-sm text-white">Available</Text>
            </View>
          </View>

          <View className="flex-row">
            <Text className="text-justify">{listing.description}</Text>
          </View>

          {/* Amenities/Tags */}
          <View className="flex-row flex-wrap py-3 gap-2 border border-gray-100 rounded-2xl px-3 justify-evenly">
            {amenities.map((item, index) => (
              <View
                key={index}
                className="items-center gap-1 py-2 px-3 bg-gray-50 rounded-xl"
              >
                <Feather name={item.icon as any} size={20} color="#3B6D11" />
                <Text className="text-xs text-gray-500">{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Booking Options */}
          <View className="gap-3">
            {/* Option 1 */}
            <View className="border border-gray-100 rounded-2xl p-4 gap-2">
              <View className="self-start bg-green-50 px-3 py-1 rounded-full">
                <Text className="text-green-700 text-xs font-medium">
                  Regular
                </Text>
              </View>
              <Text className="font-semibold text-base">Book Now</Text>
              <Text className="text-gray-400 text-sm">
                2 days before cancellation
              </Text>
              <View className="flex-row items-center justify-between mt-1">
                <Text className="text-xl font-semibold">
                  ₱{listing.fee}
                  <Text className="text-sm font-normal text-gray-400">
                    {" "}
                    / {listing.type === "event" ? "game" : "hour"}
                  </Text>
                </Text>
                <Pressable className="bg-green-800 px-5 py-2.5 rounded-full">
                  <Text className="text-white font-medium">Book Slot</Text>
                </Pressable>
              </View>
            </View>

            {/* Option 2 */}
            <View className="border border-gray-100 rounded-2xl p-4 gap-2">
              <View className="self-start bg-amber-50 px-3 py-1 rounded-full">
                <Text className="text-amber-700 text-xs font-medium">
                  Best Value
                </Text>
              </View>
              <Text className="font-semibold text-base">Full Day Rate</Text>
              <Text className="text-gray-400 text-sm">Non-refundable</Text>
              <View className="flex-row items-center justify-between mt-1">
                <Text className="text-xl font-semibold">
                  ₱{listing.fee * 8}
                  <Text className="text-sm font-normal text-gray-400">
                    {" "}
                    / day
                  </Text>
                </Text>
                <Pressable className="bg-green-800 px-5 py-2.5 rounded-full">
                  <Text className="text-white font-medium">Book Slot</Text>
                </Pressable>
              </View>
            </View>
          </View>

          {/* Host info */}
          <View className="flex-row items-center gap-3 py-3 border-t border-gray-100">
            <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
              <Text className="text-green-800 font-semibold">JD</Text>
            </View>
            <View>
              <Text className="font-medium text-sm">Juan Dela Cruz</Text>
              <Text className="text-gray-400 text-xs">Court Owner</Text>
            </View>
            <Pressable className="ml-auto border border-gray-200 px-4 py-1.5 rounded-full">
              <Text className="text-sm">Message</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
