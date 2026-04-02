import { supabase } from "@/lib/supabase";
import { Text, View } from "react-native";

export default function Events() {
  const logout = async () => {
    const res = await supabase.auth.signOut();
  };
  return (
    <View className="flex flex-1">
      <Text className="text-white text-2xl font-bold mb-4">
        Welcome to Profile!
      </Text>
    </View>
  );
}
