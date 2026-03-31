import React from "react";
import { Image, Text, View } from "react-native";

const AppLogo = () => {
  return (
    <View className="flex items-center rounded-[25px] p-3 bg-gray-100 self-center justify-center flex-row">
      <Image
        source={require("@/assets/logo/minga-icon.png")}
        style={{ width: 70, height: 70 }}
        resizeMode="cover"
      />
      <View className="flex flex-col gap-1">
        <Text className="text-[2rem] font-bold text-gray-800 ml-4">Minga</Text>
        <Text className="text-sm font-bold text-gray-500 ml-4">
          Mingle • Activity
        </Text>
      </View>
    </View>
  );
};

export default AppLogo;
