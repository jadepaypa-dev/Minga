import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack } from "expo-router";
import { AppLoadingSplash } from "../_layout";

export default function ProtectedLayout() {
  const { isLoggedIn, isLoading, profile } = useAuthContext();

  if (isLoading) {
    return <AppLoadingSplash />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  if (profile?.completed_onboarding === false) {
    return <Redirect href="/(protected)/(onboarding)/get-started" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
