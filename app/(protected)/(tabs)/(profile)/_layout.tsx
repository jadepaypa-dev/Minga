import { AppLoadingSplash } from "@/app/_layout";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack } from "expo-router";

export default function ProfileLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) {
    return <AppLoadingSplash />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" options={{ headerShown: false }} />
    </Stack>
  );
}
