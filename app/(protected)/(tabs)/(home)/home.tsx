import Avatar from "@/components/ui/avatar";
import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { ScrollView, TextInput, View } from "react-native";

export default function Home() {
  const { profile } = useAuthContext();

  const logout = async () => {
    const res = await supabase.auth.signOut();
  };
  return (
    <View
      className="flex-1 flex-col gap-5 px-5 py-12 bg-gray-100"
      // style={{ backgroundColor: "#e1e7e3" }}
    >
      <View className="flex-row items-center justify-between">
        <Avatar name={profile?.full_name} />
        <View className="bg-white rounded-full p-4">
          <Feather name="bell" size={18} color="black" />
        </View>
      </View>
      <View className="relative">
        <TextInput
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white pl-10"
          placeholderTextColor="#9ca3af"
        />
        <Feather
          name="search"
          size={18}
          color="#9ca3af"
          style={{ position: "absolute", left: 12, top: 14 }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 12 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num, key) => (
          <View key={key} className="h-[5rem] bg-white rounded-md" />
        ))}
      </ScrollView>
    </View>
  );
}
