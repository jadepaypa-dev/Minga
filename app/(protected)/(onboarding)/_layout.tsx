import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack } from "expo-router";

export default function OnBoardingLayout() {
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
      <Stack.Screen name="get-started" options={{ headerShown: false }} />
      <Stack.Screen name="interest" options={{ headerShown: false }} />
    </Stack>
  );
}
