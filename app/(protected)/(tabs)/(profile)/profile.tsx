import Avatar from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { Image, Text, View } from "react-native";

export default function Events() {
  const logout = async () => {
    const res = await supabase.auth.signOut();
  };
  return (
    <View className="flex flex-1" style={{ backgroundColor: "#ffffff" }}>
      <Image
        source={require("@/assets/images/cover-photo.jpg")}
        className="h-[180px] w-full shadow-lg rounded-b-[3rem]"
      />

      <View className="absolute top-28 flex p-2 items-center w-full z-10">
        <View className="bg-gray-100 px-5 py-2 shadow-xl rounded-xl flex items-center justify-center gap-3">
          <Avatar size={100} />
          <Text className="text-xl font-bold">Administrator</Text>
        </View>
      </View>

      <View className="flex-1 pt-28 px-6">
        <Text>hi</Text>
      </View>
    </View>
  );
}
