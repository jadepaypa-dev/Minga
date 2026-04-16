import { Feather } from "@expo/vector-icons";
import { FlatList, Text, View } from "react-native";

type BookingItem = {
  id: string;
  title: string;
  type: "Booking" | "Joined Event";
  date: string;
  time: string;
  location: string;
  status: "Upcoming" | "Confirmed";
};

const items: BookingItem[] = [
  {
    id: "b1",
    title: "Shoho-Q Basketball",
    type: "Booking",
    date: "Apr 20, 2026",
    time: "1:00pm - 3:00pm",
    location: "House of Curry, Cebu City",
    status: "Confirmed",
  },
  {
    id: "b2",
    title: "Poona Badminton Court",
    type: "Booking",
    date: "Apr 24, 2026",
    time: "8:00am - 10:00am",
    location: "Brgy. Pajo, Lapu-Lapu City",
    status: "Upcoming",
  },
  {
    id: "j1",
    title: "Bonita Trail Run",
    type: "Joined Event",
    date: "Apr 26, 2026",
    time: "5:00am - 9:00am",
    location: "Talamban, Cebu City",
    status: "Upcoming",
  },
];

export default function BookingsScreen() {
  return (
    <View className="flex-1 bg-white px-5 py-10">
      <View className="mb-5">
        <Text className="text-2xl font-bold text-black">My Bookings</Text>
        <Text className="text-gray-500 mt-1">
          Track your booked courts and joined events.
        </Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
        renderItem={({ item }) => (
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
                    item.status === "Confirmed" ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <Text className="text-xs font-medium text-green-700 mb-2">{item.type}</Text>

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
        )}
      />
    </View>
  );
}
