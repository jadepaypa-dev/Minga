import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-2xl">Login Screen</Text>
        <View className="mt-4">
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View className="flex-row items-center justify-between mt-4">
          <Pressable
            className="bg-blue-500 px-4 py-2 rounded"
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white">Login</Text>
          </Pressable>
        </View>
        <View className="mt-4">
          <Text>Don't have an account?</Text>
          <Link href="/signup" className="ml-2">
            <Text className="text-blue-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
