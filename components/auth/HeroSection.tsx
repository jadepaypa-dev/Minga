import React from "react";
import { Image, View } from "react-native";

const HeroSection = ({ source }: any) => {
  return (
    <View className="absolute w-[100%] h-[40%] rounded-b-[3rem] overflow-hidden z-10">
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default HeroSection;
