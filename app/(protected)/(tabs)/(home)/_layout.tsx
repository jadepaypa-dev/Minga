import { useAuthContext } from "@/hooks/use-auth-context";
import { Feather } from "@expo/vector-icons";
import { Redirect, Stack, useRouter } from "expo-router";
import { Pressable, View } from "react-native";

export default function HomeLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const router = useRouter();

  // ⏳ Wait until auth state is ready
  if (isLoading) {
    return null; // or a splash screen
  }

  // ❌ Not logged in → go to login
  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="lists"
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <Pressable onPress={() => router.back()}>
                <View className="bg-white p-2 rounded-full shadow-sm border border-gray-200">
                  <Feather name="arrow-left" size={18} color="black" />
                </View>
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
