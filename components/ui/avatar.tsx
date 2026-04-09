import React from "react";
import { Image, View } from "react-native";

const Avatar = ({ size }: any) => {
  return (
    <View className="rounded-md">
      <Image
        source={require("@/assets/images/default-profile.png")}
        style={{ width: "100%", height: "100%" }}
        width={size ?? 40}
        height={size ?? 40}
        resizeMode="cover"
      />
    </View>
  );
};

export default Avatar;
