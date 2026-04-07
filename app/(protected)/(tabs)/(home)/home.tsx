import Avatar from "@/components/ui/avatar";
import CustomInput from "@/components/ui/customInput";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Home() {
  const { profile } = useAuthContext();
  const router = useRouter();

  const [search, setSearch] = useState<any>("");

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
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
          <View className="absolute top-4 left-0 right-0 px-4">
            <CustomInput
              value={search}
              onChange={(val: any) => setSearch(val)}
              prefixIcon={<Feather name="search" size={20} color="black" />}
              suffixIcon={
                <Feather
                  name="sliders"
                  size={20}
                  color="black"
                  className="rotate-90"
                />
              }
              placeholder="What game are you into?"
            />
          </View>

          <View className="absolute bottom-6 left-0 right-0 items-center px-4">
            <View className="items-center mb-4">
              <Text className="text-[2.2rem] text-white font-bold text-center">
                Level Up Your Free Time
              </Text>
              <Text className="text-base text-white text-center">
                Find activities and people that match your vibe
              </Text>
            </View>

            <Pressable
              onPress={() => router.push("/lists")}
              className="px-5 py-3 shadow-lg rounded-full bg-green-900"
            >
              <Text className="text-white">Explore Now</Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-col gap-3 w-full py-2">
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-2xl font-semibold">Happening Now</Text>
            <Text className="text-green-700">View all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 25 }}
          >
            <View className="flex-col w-[280px] gap-2">
              <View className="relative w-full">
                <Image
                  source={require("@/assets/images/events/basketball-event.jpg")}
                  className="h-[150px] w-full rounded-3xl shadow-lg"
                />
                <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                  ₱150 / Game
                </Text>
              </View>
              <View className="w-full flex-col gap-2">
                <View className="flex-row items-center justify-between flex-wrap">
                  <Text className="font-semibold text-lg">Shoho-Q</Text>
                  <Text className="text-sm bg-gray-200 px-4 py-1 rounded-full">
                    Basketball
                  </Text>
                </View>
                <Text numberOfLines={2}>
                  Pasingot sa hapon open to all Pasingot sa hapon open to all
                  Pasingot sa hapon open to all
                </Text>
                <View className="flex-row items-center w-full gap-1">
                  <Avatar isProfile={true} size={30} />
                  <View className="flex-1 flex-col">
                    <View className="flex-row items-center gap-1">
                      <Feather name="map-pin" size={14} color={"#eeba00"} />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-sm flex-1"
                      >
                        House of Curry, Cebu City
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={14} color={"#11d2ce"} />
                      <Text numberOfLines={1} className="text-sm">
                        1:00pm - 5:00pm
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-col w-[280px] gap-2">
              <View className="relative w-full">
                <Image
                  source={require("@/assets/images/events/trail-event.jpg")}
                  className="h-[150px] w-full rounded-3xl shadow-lg"
                />
                <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                  ₱150 / Person
                </Text>
              </View>
              <View className="w-full flex-col gap-2">
                <View className="flex-row items-center justify-between flex-wrap">
                  <Text className="font-semibold text-lg">Bonita Trail</Text>
                  <Text className="text-sm bg-gray-200 px-4 py-1 rounded-full">
                    Trail
                  </Text>
                </View>
                <Text numberOfLines={2}>
                  Open for beginners, let's see together what nature can offer.
                </Text>
                <View className="flex-row items-center w-full gap-1">
                  <Avatar isProfile={true} size={30} />
                  <View className="flex-1 flex-col">
                    <View className="flex-row items-center gap-1">
                      <Feather name="map-pin" size={14} color={"#eeba00"} />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-sm flex-1"
                      >
                        Gaisano Grand Mall Talamban, Cebu City
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={14} color={"#11d2ce"} />
                      <Text numberOfLines={1} className="text-sm">
                        5:00am - 3:00pm
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View className="flex-col gap-3 w-full py-2">
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-2xl font-semibold">Places to Play</Text>
            <Text className="text-green-700">View all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 20 }}
          >
            <View className="flex-col w-[280px] gap-2">
              <View className="relative w-full">
                <Image
                  source={require("@/assets/images/courts/badminton-court.jpg")}
                  className="h-[150px] w-full rounded-3xl shadow-lg"
                />
                <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                  ₱300 / Hour
                </Text>
              </View>
              <View className="w-full flex-col gap-2">
                <View className="flex-row items-center justify-between flex-wrap">
                  <Text className="font-semibold text-lg">Poona</Text>
                  <Text className="text-sm bg-gray-200 px-4 py-1 rounded-full">
                    Badminton
                  </Text>
                </View>
                <Text numberOfLines={2}>
                  We offer covered court so no need to worry about the heat or
                  rain.
                </Text>
                <View className="flex-row items-center w-full gap-1">
                  <Avatar isProfile={true} size={30} />
                  <View className="flex-1 flex-col">
                    <View className="flex-row items-center gap-1">
                      <Feather name="map-pin" size={14} color={"#eeba00"} />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-sm flex-1"
                      >
                        Brgy. Pajo Lapu - Lapu City, Cebu
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={14} color={"#11d2ce"} />
                      <Text numberOfLines={1} className="text-sm">
                        8:00am - 10:00pm
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-col w-[280px] gap-2">
              <View className="relative w-full">
                <Image
                  source={require("@/assets/images/courts/pickleball-court.jpg")}
                  className="h-[150px] w-full rounded-3xl shadow-lg"
                />
                <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                  ₱550 / 3Hours
                </Text>
              </View>
              <View className="w-full flex-col gap-2">
                <View className="flex-row items-center justify-between flex-wrap">
                  <Text className="font-semibold text-lg">Tino Restaurant</Text>
                  <Text className="text-sm bg-gray-200 px-4 py-1 rounded-full">
                    Pickleball
                  </Text>
                </View>
                <Text numberOfLines={2}>
                  Play in a court like a professional player.
                </Text>
                <View className="flex-row items-center w-full gap-1">
                  <Avatar isProfile={true} size={30} />
                  <View className="flex-1 flex-col">
                    <View className="flex-row items-center gap-1">
                      <Feather name="map-pin" size={14} color={"#eeba00"} />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-sm flex-1"
                      >
                        Tino Restaurant Talamban, Cebu City
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Feather name="clock" size={14} color={"#11d2ce"} />
                      <Text numberOfLines={1} className="text-sm">
                        8:00am - 10:00pm
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
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
    </ScrollView>
  );
}
