import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import "../global.css";

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const router = useRouter();

  console.log({ isLoggedIn, isLoading });

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn && isLoading) {
      router.replace("/(auth)/login");
    }

    if (isLoggedIn && !isLoading) {
      router.replace("/(protected)/(onboarding)/get-started");
    }
  }, [isLoggedIn, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn && !isLoading}>
        <Stack.Screen
          name="(protected)/(onboarding)/get-started"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn && !isLoading}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
