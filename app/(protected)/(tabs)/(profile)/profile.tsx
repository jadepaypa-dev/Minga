import Avatar from "@/components/ui/avatar";
import { supabase } from "@/lib/supabase";
import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Events() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  const headerName = useMemo(() => fullName || "My Profile", [fullName]);
  const profileHandle = useMemo(
    () => `@${username || "active.player"}`,
    [username],
  );
  const profileBio = useMemo(
    () => bio || "Focused on movement, community, and showing up every day.",
    [bio],
  );
  const profileStats = useMemo(
    () => [
      { label: "Sessions", value: "128" },
      { label: "Events", value: "24" },
      { label: "Streak", value: "14d" },
    ],
    [],
  );
  const quickHighlights = useMemo(
    () => [
      {
        icon: "activity",
        title: "Training Focus",
        value: "Strength and conditioning",
      },
      {
        icon: "map-pin",
        title: "Preferred Area",
        value: "Cebu active hubs",
      },
      {
        icon: "clock",
        title: "Most Active",
        value: "Early morning sessions",
      },
    ],
    [],
  );

  useEffect(() => {
    const bootstrapProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;

      if (!currentUser) return;
      setEmail(currentUser.email ?? "");

      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, username, bio")
        .eq("id", currentUser.id)
        .single();

      setFullName(profileData?.full_name ?? "");
      setUsername(profileData?.username ?? "");
      setBio(profileData?.bio ?? "");
    };

    bootstrapProfile();
  }, []);

  const handleSaveProfile = async () => {
    const trimmedName = fullName.trim();
    const trimmedUsername = username.trim();
    const trimmedBio = bio.trim();

    if (trimmedName.length < 2) {
      Alert.alert("Invalid name", "Full name should be at least 2 characters.");
      return;
    }

    if (trimmedUsername.length < 3) {
      Alert.alert("Invalid username", "Username should be at least 3 characters.");
      return;
    }

    if (!/^[a-zA-Z0-9._]+$/.test(trimmedUsername)) {
      Alert.alert(
        "Invalid username",
        "Use letters, numbers, dot, or underscore only.",
      );
      return;
    }

    try {
      setIsSaving(true);
      const { data: authData } = await supabase.auth.getUser();
      const currentUser = authData?.user;
      if (!currentUser) return;

      const { error } = await supabase.from("profiles").upsert({
        id: currentUser.id,
        full_name: trimmedName,
        username: trimmedUsername,
        bio: trimmedBio,
      });

      if (error) {
        Alert.alert("Update failed", error.message);
        return;
      }

      setFullName(trimmedName);
      setUsername(trimmedUsername);
      setBio(trimmedBio);
      setIsEditMode(false);
      Alert.alert("Saved", "Your profile was updated successfully.");
    } finally {
      setIsSaving(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Logout failed", error.message);
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ScrollView className="flex-1" style={{ backgroundColor: "#ffffff" }}>
      <View className="relative">
        <Image
          source={require("@/assets/images/cover-photo.jpg")}
          className="h-[280px] w-full rounded-b-[2.5rem]"
        />
        <View className="absolute inset-0 bg-black/40 rounded-b-[2.5rem]" />

        <View className="absolute -bottom-16 left-0 right-0 px-6">
          <View className="bg-white rounded-[2rem] border border-gray-100 px-5 pt-5 pb-4 shadow-xl">
            <View className="flex-row items-center">
              <View className="rounded-[2rem] border-4 border-white bg-emerald-950 p-1 -mt-16">
                <View className="h-[108px] w-[108px] rounded-[1.6rem] bg-gray-50 items-center justify-center">
                  <Avatar size={82} />
                </View>
              </View>

              <View className="flex-1 ml-4">
                <View className="flex-row items-center gap-2">
                  <Text className="text-xl font-bold text-gray-900">
                    {headerName}
                  </Text>
                </View>
                <Text className="text-sm text-gray-500 mt-1">{profileHandle}</Text>
                <Text className="text-sm text-gray-600 mt-2" numberOfLines={2}>
                  {profileBio}
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3 mt-5">
              {profileStats.map((item) => (
                <View
                  key={item.label}
                  className="flex-1 rounded-2xl bg-gray-50 border border-gray-100 py-3 items-center"
                >
                  <Text className="text-lg font-bold text-gray-900">
                    {item.value}
                  </Text>
                  <Text className="text-xs text-gray-500">{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="flex-1 pt-24 px-6 pb-10 gap-5">
        <View className="bg-emerald-950 rounded-[2rem] p-5 gap-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white text-lg font-semibold">
                Athlete Snapshot
              </Text>
              <Text className="text-white/70 text-sm mt-1">
                A cleaner view of your fitness identity.
              </Text>
            </View>
            <View className="h-12 w-12 rounded-2xl bg-white/10 items-center justify-center">
              <Feather name="zap" size={20} color="#ffffff" />
            </View>
          </View>

          <View className="flex-row flex-wrap gap-2">
            {["Basketball", "Cardio", "Community", "Recovery"].map((tag) => (
              <View
                key={tag}
                className="px-3 py-2 rounded-full bg-white/10 border border-white/10"
              >
                <Text className="text-white text-xs">{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="gap-3">
          {quickHighlights.map((item) => (
            <View
              key={item.title}
              className="bg-white border border-gray-100 rounded-[1.5rem] p-4 shadow-sm"
            >
              <View className="flex-row items-center gap-4">
                <View className="h-12 w-12 rounded-2xl bg-emerald-50 items-center justify-center">
                  <Feather
                    name={item.icon as React.ComponentProps<typeof Feather>["name"]}
                    size={20}
                    color="#065f46"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-xs uppercase tracking-wide text-gray-400">
                    {item.title}
                  </Text>
                  <Text className="text-base font-semibold text-gray-900 mt-1">
                    {item.value}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View className="bg-white border border-gray-100 rounded-[1.8rem] p-5 shadow-sm gap-4">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-gray-900">
                Account Details
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Keep your public profile updated.
              </Text>
            </View>
            <View className="h-11 w-11 rounded-2xl bg-gray-100 items-center justify-center">
              <Feather name="user" size={18} color="#111827" />
            </View>
          </View>

          <View>
            <Text className="text-xs text-gray-500 mb-1">Email</Text>
            <Text className="text-base text-gray-900">{email || "-"}</Text>
          </View>

          <View>
            <Text className="text-xs text-gray-500 mb-1">Full Name</Text>
            {isEditMode ? (
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Your full name"
                placeholderTextColor="#9ca3af"
                className="border border-gray-300 rounded-xl px-3 py-2 text-gray-900"
              />
            ) : (
              <Text className="text-base text-gray-900">{fullName || "-"}</Text>
            )}
          </View>

          <View>
            <Text className="text-xs text-gray-500 mb-1">Username</Text>
            {isEditMode ? (
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="username"
                autoCapitalize="none"
                placeholderTextColor="#9ca3af"
                className="border border-gray-300 rounded-xl px-3 py-2 text-gray-900"
              />
            ) : (
              <Text className="text-base text-gray-900">{username || "-"}</Text>
            )}
          </View>

          <View>
            <Text className="text-xs text-gray-500 mb-1">Bio</Text>
            {isEditMode ? (
              <TextInput
                value={bio}
                onChangeText={setBio}
                multiline
                textAlignVertical="top"
                placeholder="Tell people something about you"
                placeholderTextColor="#9ca3af"
                className="border border-gray-300 rounded-xl px-3 py-2 text-gray-900 min-h-20"
              />
            ) : (
              <Text className="text-base text-gray-900">{bio || "-"}</Text>
            )}
          </View>
        </View>

        {isEditMode ? (
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setIsEditMode(false)}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 items-center"
            >
              <Text className="text-gray-800 font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              disabled={isSaving}
              onPress={handleSaveProfile}
              className="flex-1 bg-black rounded-xl px-4 py-3 items-center"
            >
              <Text className="text-white font-semibold">
                {isSaving ? "Saving..." : "Save"}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => setIsEditMode(true)}
            className="rounded-xl bg-emerald-900 px-4 py-3 items-center"
          >
            <View className="flex-row items-center gap-2">
              <Feather name="edit-2" size={16} color="#ffffff" />
              <Text className="text-white font-semibold">Edit Profile</Text>
            </View>
          </Pressable>
        )}

        <Pressable
          disabled={isLoggingOut}
          onPress={logout}
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 items-center"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="log-out" size={16} color="#dc2626" />
            <Text className="text-red-600 font-semibold">
              {isLoggingOut ? "Logging out..." : "Log Out"}
            </Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
}
