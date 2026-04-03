import Avatar from "@/components/ui/avatar";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Feather } from "@expo/vector-icons";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export default function Home() {
  const { profile } = useAuthContext();

  return (
    <View
      className="flex-1 flex-col gap-5 px-5 py-12"
      style={{ backgroundColor: "#f5f9fa" }}
    >
      <View className="flex-row items-center justify-between">
        <Avatar name={profile?.full_name} />
        <View className="bg-white rounded-full p-4">
          <Feather name="bell" size={18} color="black" />
        </View>
      </View>
      <View className="relative">
        <Image
          source={require("@/assets/images/group-photo.jpg")}
          className="h-[340px] w-full rounded-3xl shadow-lg"
        />

        {/* Search bar */}
        <View className="absolute top-4 left-0 right-0 px-2">
          <TextInput
            placeholder="What game are you into?"
            className="w-full border border-gray-300 rounded-full px-4 py-3 text-base text-black bg-white pl-12 shadow-md"
            placeholderTextColor="#878d99"
          />
          <Feather
            name="search"
            size={20}
            color="black"
            style={{ position: "absolute", left: 20, top: 12 }}
          />
          <Feather
            name="sliders"
            size={20}
            color="black"
            className="rotate-90"
            style={{ position: "absolute", right: 25, top: 12 }}
          />
        </View>

        {/* Bottom content */}
        <View className="absolute bottom-6 left-0 right-0 items-center px-4">
          <View className="items-center mb-4">
            <Text className="text-[2.2rem] text-white font-bold text-center">
              Level Up Your Free Time
            </Text>
            <Text className="text-base text-white text-center">
              Find activities and people that match your vibe
            </Text>
          </View>

          <Pressable className="px-5 py-3 shadow-lg rounded-full bg-green-900">
            <Text className="text-white">Explore Now</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex-1 flex-col bg-white gap-3">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-2xl">Happening Now</Text>
          <Text className="text-green-700">View all</Text>
        </View>
        <View className="flex-row gap-2">
          <View className="flex-col w-[220px]">
            <Image
              source={require("@/assets/images/events/basketball-event.jpg")}
              className="h-[100px] w-[250px] rounded-3xl shadow-lg object-contain"
            />
            <Text>Shoho-Q</Text>
          </View>
          <View className="flex w-[220px]">
            <Image
              source={require("@/assets/images/events/basketball-event.jpg")}
              className="h-[100px] w-[250px] rounded-3xl shadow-lg object-contain"
            />
          </View>
        </View>
      </View>
      <View className="flex-1 flex-col bg-white">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-2xl">Places to Play</Text>
          <Text className="text-green-700">View all</Text>
        </View>
      </View>
      {/* <View className="flex-row gap-2 items-center w-full">
        <View className="bg-white px-4 py-2 rounded-md flex-1 items-center shadow-md">
          <Text>All</Text>
        </View>
        <View className="bg-white px-4 py-2 rounded-md flex-1 items-center shadow-md">
          <Text>Courts</Text>
        </View>
        <View className="bg-white px-4 py-2 rounded-md flex-1 items-center shadow-md">
          <Text>Events</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num, key) => (
          <View key={key} className="h-[5rem] bg-white rounded-md"></View>
        ))}
      </ScrollView> */}
    </View>
  );
}
