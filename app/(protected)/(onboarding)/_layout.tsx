import { AppLoadingSplash } from "@/app/_layout";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Stack, useRouter } from "expo-router";

export default function OnBoardingLayout() {
  const { isLoggedIn, isLoading, profile } = useAuthContext();
  const router = useRouter();

  if (isLoading) return <AppLoadingSplash />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="get-started" options={{ headerShown: false }} />
      <Stack.Screen name="interest" options={{ headerShown: false }} />
    </Stack>
  );
}
