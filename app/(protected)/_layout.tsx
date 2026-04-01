import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack } from "expo-router";

export default function ProtectedLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();

  // ⏳ Wait until auth state is ready
  if (isLoading) {
    return null; // or a splash screen
  }

  // ❌ Not logged in → go to login
  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
    </Stack>
  );
}
