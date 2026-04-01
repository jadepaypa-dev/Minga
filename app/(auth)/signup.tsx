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
  View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
    setLoading(false);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center bg-white">
          <HeroSection source={require("@/assets/images/badminton.jpg")} />
          <View className="flex flex-1 w-full px-5 bg-white py-10">
            <View className="flex w-full px-10 gap-5">
              <AppLogo />
              <View className="flex flex-col">
                <Text className="text-2xl text-start">
                  Get in the game. Create your account.
                </Text>
                <View className="mt-4">
                  <TextInput
                    placeholder="Full Name"
                    value={name}
                    onChangeText={setName}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="none"
                  />
                  <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white mt-3"
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
                    onPress={handleSignup}
                    disabled={loading}
                  >
                    <Text className="text-white text-center">Register</Text>
                  </Pressable>
                </View>
                <View className="mt-4 text-justify-center flex-row items-center">
                  <Text>Already have an account?</Text>
                  <Link href="/login" className="ml-2">
                    <Text className="text-blue-500">Login</Text>
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
