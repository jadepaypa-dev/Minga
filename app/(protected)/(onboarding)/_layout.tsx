import { useAuthContext } from "@/hooks/use-auth-context";
import { Stack, useRouter } from "expo-router";

export default function OnBoardingLayout() {
  const { isLoggedIn, isLoading, profile } = useAuthContext();
  const router = useRouter();

  // useEffect(() => {
  //   if (isLoading) return;

  //   if (!isLoggedIn) {
  //     router.replace("/(auth)/login");
  //     return;
  //   }

  //   if (!profile?.completed_onboarding) {
  //     router.replace("/(protected)/(onboarding)/get-started");
  //   }
  // }, []);

  if (isLoading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="get-started" options={{ headerShown: false }} />
      <Stack.Screen name="interest" options={{ headerShown: false }} />
    </Stack>
  );
}
