import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    const res = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (res.error) {
      console.error("Signup error:", res.error);
    } else {
      console.log("Signup successful:", res.data);
    }
    setLoading(false);
  };

  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl">Signup Screen</Text>
      <View className="mt-4">
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
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
          onPress={handleSignup}
          disabled={loading}
        >
          <Text className="text-white">Signup</Text>
        </Pressable>
      </View>
      <View className="mt-4">
        <Text>Already have an account?</Text>
        <Link href="/login" className="ml-2">
          <Text className="text-blue-500">Login</Text>
        </Link>
      </View>
    </View>
  );
}
