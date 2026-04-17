import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#065f46",
        tabBarInactiveTintColor: "#6b7280",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          backgroundColor: "#ffffff",
          borderTopColor: "#e5e7eb",
          borderRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(lists)"
        options={{
          title: "Lists",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="layers" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(create)"
        options={{
          title: "Create",
          tabBarIcon: () => <Feather name="plus" size={25} color="#ffffff" />,
          tabBarButton: ({ onPress, accessibilityState, style }) => (
            <Pressable
              onPress={onPress}
              accessibilityState={accessibilityState}
              style={[
                style,
                {
                  top: -5,
                  width: 72,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <View className="h-14 w-14 rounded-full bg-green-700 items-center justify-center">
                <Feather name="plus" size={28} color="#ffffff" />
              </View>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="(bookings)"
        options={{
          title: "Bookings",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="calendar" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
