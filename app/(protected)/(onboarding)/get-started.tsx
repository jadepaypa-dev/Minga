import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function GetStarted() {
  const router = useRouter();
  return (
    <View className="flex-1">
      <Image
        source={require("@/assets/images/get-started.jpg")}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      <View className="absolute bottom-[15rem] left-0 right-0 items-center h-[250px] bg-gradient-to-t from-black via-gray-500 to-white rounded-t-[3rem] px-10">
        <Text className="text-white text-[4rem] font-bold">
          Welcome to Minga!
        </Text>
        <Text className="text-white text-[1rem] font-bold mb-4">
          Find people who share your hobbies and join activities around you.
        </Text>
        <Pressable
          onPress={() => {
            router.push("/interest");
          }}
          className="bg-green-700 px-5 py-3 rounded-full"
        >
          <Text className="text-white font-bold text-xl">Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}
