import AppLogo from "@/components/auth/AppLogo";
import HeroSection from "@/components/auth/HeroSection";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { height } = useWindowDimensions();
  const imageHeight = height * 0.4;

  const handleLogin = async () => {
    setLoading(true);
    // Simulate API call
    const res = await supabase.auth.signInWithPassword({ email, password });

    if (res.error) {
      console.error("Login error:", res.error);
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center bg-white">
        <HeroSection source={require("@/assets/images/auth-image.jpg")} />
        <View className="flex flex-1 w-full px-5 bg-white py-10">
          <View
            className="flex w-full px-10 gap-5"
            style={{ marginTop: imageHeight }}
          >
            <AppLogo />
            <View className="flex flex-col">
              <Text className="text-2xl text-center">
                Sign in with your account
              </Text>
              <View className="mt-4">
                <TextInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white"
                  placeholderTextColor="#9ca3af"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white mt-3"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </View>
              <View className="flex-row items-center justify-between mt-4">
                <Pressable
                  className="bg-emerald-500 px-4 py-2 rounded w-full"
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text className="text-white text-center">Login</Text>
                </Pressable>
              </View>
              <View className="mt-4 text-justify-center flex-row items-center">
                <Text>Don't have an account?</Text>
                <Link href="/signup" className="ml-2">
                  <Text className="text-blue-500">Sign Up</Text>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
