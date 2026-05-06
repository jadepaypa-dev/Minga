import { useAuthContext } from "@/hooks/use-auth-context";
import { getUserBookings } from "@/lib/bookings/backend";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function BookingsScreen() {
  const { claims } = useAuthContext();
  const [bookings, setBookings] = useState<any>({ events: [], courts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (claims?.sub) {
      fetchBookings();
    }
  }, [claims?.sub]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      if (!claims?.sub) return;
      const data = await getUserBookings(claims.sub);
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookingItem = (item: any) => (
    <View className="rounded-2xl border border-gray-200 px-4 py-4 bg-white">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold text-black flex-1">
          {item.title}
        </Text>
        <View
          className={`px-3 py-1 rounded-full ${
            item.status === "Confirmed" ? "bg-emerald-100" : "bg-amber-100"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              item.status === "Confirmed"
                ? "text-emerald-700"
                : "text-amber-700"
            }`}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <Text className="text-xs font-medium text-green-700 mb-2">
        {item.type === "event" ? "Joined Event" : "Court Booking"}
      </Text>

      <View className="flex-row items-center gap-2 mb-1">
        <Feather name="calendar" size={14} color="#6b7280" />
        <Text className="text-sm text-gray-700">{item.date}</Text>
      </View>

      <View className="flex-row items-center gap-2 mb-1">
        <Feather name="clock" size={14} color="#6b7280" />
        <Text className="text-sm text-gray-700">{item.time}</Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Feather name="map-pin" size={14} color="#6b7280" />
        <Text className="text-sm text-gray-700 flex-1">{item.location}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 bg-white px-5 py-10 items-center justify-center">
        <Text>Loading bookings...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 py-10">
      <View className="mb-5">
        <Text className="text-2xl font-bold text-black">My Bookings</Text>
        <Text className="text-gray-500 mt-1">
          Track your booked courts and joined events.
        </Text>
      </View>

      {/* Events Section */}
      {bookings.events.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Events
          </Text>
          <FlatList
            data={bookings.events}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => renderBookingItem(item)}
          />
        </View>
      )}

      {/* Courts Section */}
      {bookings.courts.length > 0 && (
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            Court Bookings
          </Text>
          <FlatList
            data={bookings.courts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 12 }}
            renderItem={({ item }) => renderBookingItem(item)}
          />
        </View>
      )}

      {/* Empty State */}
      {bookings.events.length === 0 && bookings.courts.length === 0 && (
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-gray-500 text-center">No bookings found</Text>
          <Text className="text-gray-400 text-sm mt-2">
            Book a court or join an event to get started
          </Text>
        </View>
      )}
    </View>
  );
}
