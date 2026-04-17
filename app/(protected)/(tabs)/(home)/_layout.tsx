import { AppLoadingSplash } from "@/app/_layout";
import { useAuthContext } from "@/hooks/use-auth-context";
import { Redirect, Stack, useRouter } from "expo-router";

export default function HomeLayout() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const router = useRouter();

  if (isLoading) {
    return <AppLoadingSplash />;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
