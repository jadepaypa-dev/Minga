import Avatar from "@/components/ui/avatar";
import CustomInput from "@/components/ui/customInput";
import { getAllListings } from "@/lib/lists/backend";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListsTabScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, [search, selectedCategory]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const data = await getAllListings(search, selectedCategory);
      setListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className="flex-col gap-5 px-6"
      style={{ backgroundColor: "#ffffff", flex: 1 }}
    >
      <View className="flex-row items-center gap-3 mt-5">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm"
        >
          <Feather name="arrow-left" size={20} color="black" />
        </Pressable>
        <View className="min-w-0 flex-1">
          <CustomInput
            value={search}
            onChange={(val: any) => setSearch(val)}
            prefixIcon={<Feather name="search" size={20} color="black" />}
            placeholder="What game are you into?"
          />
        </View>
      </View>
      <View className="flex-row items-center gap-3 w-full">
        <Pressable
          onPress={() => setSelectedCategory("All")}
          className={`shadow-lg px-4 py-1 rounded-full flex-1 ${
            selectedCategory === "All" ? "bg-green-800" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-center ${
              selectedCategory === "All" ? "text-white" : "text-black"
            }`}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedCategory("Courts")}
          className={`shadow-lg px-4 py-1 rounded-full flex-1 ${
            selectedCategory === "Courts" ? "bg-green-800" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-center ${
              selectedCategory === "Courts" ? "text-white" : "text-black"
            }`}
          >
            Courts
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedCategory("Events")}
          className={`shadow-lg px-4 py-1 rounded-full flex-1 ${
            selectedCategory === "Events" ? "bg-green-800" : "bg-gray-100"
          }`}
        >
          <Text
            className={`text-center ${
              selectedCategory === "Events" ? "text-white" : "text-black"
            }`}
          >
            Events
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, flexGrow: 1 }}
        style={{ flex: 1 }}
        refreshing={loading}
        onRefresh={fetchListings}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(protected)/(tabs)/(lists)/details",
                params: { id: item.id, type: item.type },
              })
            }
          >
            <View className="flex-col w-full gap-2 bg-gray-100 rounded-[1rem]">
              <View className="relative w-full">
                <Image
                  source={
                    item.image_url
                      ? { uri: item.image_url }
                      : require("@/assets/images/badminton.jpg")
                  }
                  className="h-[180px] w-full rounded-3xl shadow-lg"
                />
                <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                  ₱{item.fee} / {item.type === "event" ? "Game" : "Hour"}
                </Text>
              </View>
              <View className="w-full flex-col gap-2 px-4 py-2">
                <View className="flex-row items-center justify-between flex-wrap">
                  <Text className="font-semibold text-lg">{item.title}</Text>
                  <Text className="text-sm bg-gray-200 px-4 py-1 rounded-full">
                    {item.sports?.name || item.category}
                  </Text>
                </View>
                <Text numberOfLines={2}>{item.description}</Text>
                <View className="flex-row items-center w-full gap-5">
                  <Avatar size={30} />
                  <View className="flex-1 flex-col">
                    <View className="flex-row items-center gap-1">
                      <Feather name="map-pin" size={14} color={"#eeba00"} />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-sm flex-1"
                      >
                        {item.location}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={14} color={"#11d2ce"} />
                      <Text numberOfLines={1} className="text-sm">
                        {item.time_range}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-gray-500">No listings found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
