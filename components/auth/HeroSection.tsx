import React from "react";
import { Image, View } from "react-native";

const HeroSection = ({ source, size }: any) => {
  return (
    <View
      className={`w-full rounded-b-[3rem] overflow-hidden`}
      style={{ height: size ?? 250 }}
    >
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};

export default HeroSection;
