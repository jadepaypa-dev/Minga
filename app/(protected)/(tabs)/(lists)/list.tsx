import Avatar from "@/components/ui/avatar";
import CustomInput from "@/components/ui/customInput";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const events = [
  {
    id: "1",
    title: "Shoho-Q",
    sport: "Basketball",
    price: "₱150 / Game",
    description: "Pasingot sa hapon open to all",
    location: "House of Curry, Cebu City",
    time: "1:00pm - 5:00pm",
    image: require("@/assets/images/events/basketball-event.jpg"),
  },
  {
    id: "2",
    title: "Poona",
    sport: "Badminton",
    price: "₱300 / Hour",
    description:
      "We offer covered court so no need to worry about the heat or rain.",
    location: "Brgy. Pajo Lapu-Lapu City, Cebu",
    time: "8:00am - 10:00pm",
    image: require("@/assets/images/courts/badminton-court.jpg"),
  },
  {
    id: "3",
    title: "Poona",
    sport: "Badminton",
    price: "₱300 / Hour",
    description:
      "We offer covered court so no need to worry about the heat or rain.",
    location: "Brgy. Pajo Lapu-Lapu City, Cebu",
    time: "8:00am - 10:00pm",
    image: require("@/assets/images/courts/badminton-court.jpg"),
  },
];

export default function ListsTabScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView
      className="flex-1 flex-col gap-5 px-6"
      style={{ backgroundColor: "#ffffff" }}
    >
      <View className="flex-row items-center gap-3">
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
        <Pressable className="bg-gray-100 shadow-lg px-4 py-1 rounded-full flex-1">
          <Text className="text-center">All</Text>
        </Pressable>
        <Pressable className="bg-gray-100 shadow-lg px-4 py-1 rounded-full flex-1">
          <Text className="text-center">Courts</Text>
        </Pressable>
        <Pressable className="bg-gray-100 shadow-lg px-4 py-1 rounded-full flex-1">
          <Text className="text-center">Events</Text>
        </Pressable>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingVertical: 5 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(protected)/(tabs)/(lists)/details",
                params: { id: item.id },
              })
            }
          >
            <View className="flex-col w-full gap-2 bg-gray-100 rounded-[1rem]">
              <View className="relative w-full">
                <Image
                  source={item?.image}
                  className="h-[180px] w-full rounded-3xl shadow-lg"
                />
                <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                  {item?.price}
                </Text>
              </View>
              <View className="w-full flex-col gap-2 px-4 py-2">
                <View className="flex-row items-center justify-between flex-wrap">
                  <Text className="font-semibold text-lg">Shoho-Q</Text>
                  <Text className="text-sm bg-gray-200 px-4 py-1 rounded-full">
                    {item?.sport}
                  </Text>
                </View>
                <Text numberOfLines={2}>{item?.description}</Text>
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
                        {item?.location}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={14} color={"#11d2ce"} />
                      <Text numberOfLines={1} className="text-sm">
                        {item?.time}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
