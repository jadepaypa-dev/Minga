import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

const Avatar = ({ name, isProfile = false, size }: any) => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning!";
    }
    if (hour < 18) {
      return "Good Afternoon!";
    }
    return "Good Evening!";
  };
  const [greeting, setGreeting] = useState<any>(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <View className="flex flex-row items-center gap-3">
      <View className="p-2 rounded-md">
        <Image
          source={require("@/assets/images/default-profile.png")}
          style={{ width: "100%", height: "100%" }}
          width={size ?? 40}
          height={size ?? 40}
          resizeMode="cover"
        />
      </View>
      <View className="flex-col">
        {!isProfile && (
          <Text className="text-md text-gray-600">{greeting} 👋</Text>
        )}
        {name && <Text className="text-xl font-medium">{name}</Text>}
      </View>
    </View>
  );
};

export default Avatar;
