import { supabase } from "@/lib/supabase";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const logout = async () => {
    const res = await supabase.auth.signOut();
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
        <Text className="text-2xl">Welcome Home</Text>
        <Pressable onPress={logout}>
          <Text className="text-blue-500 mt-10">Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
