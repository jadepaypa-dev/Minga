import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import "../global.css";

void SplashScreen.preventAutoHideAsync().catch(() => {
  // Ignore if splash is already prevented in dev fast refresh.
});

function AppLoadingSplash() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo/minga splashscreen.png")}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

function RootNavigator() {
  const { isLoggedIn, isLoading, profile } = useAuthContext();

  useEffect(() => {
    if (!isLoading) {
      void SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) return <AppLoadingSplash />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn && !isLoading}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
