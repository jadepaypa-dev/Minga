import Avatar from "@/components/ui/avatar";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

type ListEventsProps = {
  data?: any;
};

const ListEvents = ({ data }: ListEventsProps) => {
  //create a fetching of all events near me and happening today

  return (
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
          Pasingot sa hapon open to all Pasingot sa hapon open to all Pasingot
          sa hapon open to all
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
  );
};

export default ListEvents;
