import { useAuthContext } from "@/hooks/use-auth-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Interest() {
  const auth = useAuthContext();
  const router = useRouter();
  const [sports, setSports] = useState<any>(null);
  const [selectedSports, setSelectedSports] = useState<number[]>([]);

  const getSports = async () => {
    const { data, error } = await supabase.from("sports").select("name, id");

    if (error) {
      console.log({ error });
    }
    setSports(data);
  };

  const toggleSport = (id: number) => {
    setSelectedSports((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const addUserSport = async () => {
    if (selectedSports?.length > 0) {
      const payload = selectedSports?.map((id: number) => ({
        user_id: auth?.profile.id,
        sport_id: id,
      }));
      console.log({ payload });
      const { data, error } = await supabase
        .from("user_sports")
        .insert(payload);

      if (error) {
        console.log({ error });
        return;
      }
    }

    router.push("/(protected)/(tabs)/(home)/home");
  };

  useEffect(() => {
    getSports();
  }, []);

  return (
    <View className="flex-1 bg-green-700">
      <View className="flex items-center px-10 py-24 gap-10">
        <Text className="text-white text-[3rem] font-bold">
          Let's find your vibe 🎯
        </Text>
        <View className="flex flex-row flex-wrap w-full gap-2">
          {Array.isArray(sports) &&
            sports.map((item: any) => {
              const isSelected = selectedSports.includes(item.id);
              return (
                <Pressable
                  key={item.id}
                  onPress={() => toggleSport(item?.id)}
                  className={`px-5 py-2 rounded-full border ${
                    isSelected
                      ? "bg-white border-white"
                      : "bg-transparent border-gray-200"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      isSelected ? "text-green-800" : "text-white"
                    }`}
                  >
                    {item?.name}
                  </Text>
                </Pressable>
              );
            })}
        </View>
      </View>
      <View className="absolute bottom-20 px-10 w-full">
        <Pressable
          onPress={addUserSport}
          className="bg-green-800 px-5 py-3 rounded-full"
        >
          <Text className="text-white font-bold text-xl text-center">
            Let's Go !
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
