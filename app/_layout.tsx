import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";
import { Stack } from "expo-router";
import "../global.css";

function RootNavigator() {
  const { isLoggedIn, isLoading } = useAuthContext();
  const auth = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn && !isLoading}>
        <Stack.Screen
          name="(protected)/home"
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
