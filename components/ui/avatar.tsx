import React from "react";
import { Image, Text, View } from "react-native";

const Avatar = ({ name }: any) => {
  return (
    <View className="flex flex-row items-center gap-3">
      <Image
        source={require("@/assets/images/default-profile.png")}
        style={{ width: "100%", height: "100%" }}
        width={40}
        height={40}
      />
      <Text className="text-xl">{name}</Text>
    </View>
  );
};

export default Avatar;
