import React from "react";
import { Image, View } from "react-native";

const HeroSection = ({ source }: any) => {
  return (
    <View className="w-full h-[250px] rounded-b-[3rem] overflow-hidden">
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default HeroSection;
