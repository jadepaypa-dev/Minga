import Avatar from "@/components/ui/avatar";
import CustomInput from "@/components/ui/customInput";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function Lists() {
  const { profile } = useAuthContext();

  const [search, setSearch] = useState<any>("");

  return (
    <View
      className="flex-1 flex-col gap-5 px-6"
      style={{ backgroundColor: "#f5f9fa" }}
    >
      <View className="flex-col gap-5">
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
      <ScrollView showsVerticalScrollIndicator={true}>
        <View className="flex-col gap-10">
          <View className="flex-col w-full gap-2 bg-white rounded-lg">
            <View className="relative w-full">
              <Image
                source={require("@/assets/images/events/basketball-event.jpg")}
                className="h-[180px] w-full rounded-3xl shadow-lg"
              />
              <Text className="absolute right-0 bg-green-800 text-white px-3 py-2 rounded-tr-3xl rounded-bl-3xl">
                ₱150 / Game
              </Text>
            </View>
            <View className="w-full flex-col gap-2 px-2 py-2">
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
          <View className="flex-col w-full gap-2">
            <View className="relative w-full">
              <Image
                source={require("@/assets/images/events/basketball-event.jpg")}
                className="h-[180px] w-full rounded-3xl shadow-lg"
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
          <View className="flex-col w-full gap-2">
            <View className="relative w-full">
              <Image
                source={require("@/assets/images/courts/badminton-court.jpg")}
                className="h-[180px] w-full rounded-3xl shadow-lg"
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
        </View>
      </ScrollView>
    </View>
  );
}
