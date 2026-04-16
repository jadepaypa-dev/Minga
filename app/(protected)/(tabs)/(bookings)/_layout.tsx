import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack } from "expo-router";

export default function BookingsLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="bookings" options={{ headerShown: false }} />
    </Stack>
  );
}
