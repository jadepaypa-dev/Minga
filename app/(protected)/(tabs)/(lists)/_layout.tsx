import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack, useRouter } from "expo-router";

export default function ListsLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const router = useRouter();

  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{
          title: "",
          headerShown: false,
          // headerStyle: { backgroundColor: "#ffffff" },
          // headerShadowVisible: false,
          // headerLeft: () => (
          //   <Pressable onPress={() => router.back()}>
          //     <View className="bg-white p-2 rounded-full shadow-sm border border-gray-200">
          //       <Feather name="arrow-left" size={18} color="black" />
          //     </View>
          //   </Pressable>
          // ),
        }}
      />
    </Stack>
  );
}
