import { useAuthContext } from "@/hooks/use-auth-context";
import { createCourt, createEvent } from "@/lib/create/backend";
import { Feather } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

type FormState = {
  itemType: "event" | "court";
  title: string;
  categories: string[];
  description: string;
  location: string;
  date: string;
  openTime: string;
  closeTime: string;
  fee: string;
  capacity: string;
  courtCount: string;
  imageUris: string[];
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  itemType: "event",
  title: "",
  categories: [],
  description: "",
  location: "",
  date: "",
  openTime: "",
  closeTime: "",
  fee: "",
  capacity: "",
  courtCount: "",
  imageUris: [],
};

export default function CreateScreen() {
  const { profile } = useAuthContext();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showOpenTimePicker, setShowOpenTimePicker] = useState(false);
  const [showCloseTimePicker, setShowCloseTimePicker] = useState(false);

  const creatorName = useMemo(
    () => profile?.full_name || "Organizer",
    [profile?.full_name],
  );

  const setValue = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const cleanTitle = form.title.trim();
    const cleanDescription = form.description.trim();
    const cleanLocation = form.location.trim();
    const cleanDate = form.date.trim();
    const cleanOpenTime = form.openTime.trim();
    const cleanCloseTime = form.closeTime.trim();

    if (cleanTitle.length < 3) {
      nextErrors.title = "Title must be at least 3 characters.";
    }

    if (form.categories.length === 0) {
      nextErrors.categories = "Please select at least one category.";
    }

    if (cleanDescription.length < 15) {
      nextErrors.description = "Description must be at least 15 characters.";
    }

    if (cleanLocation.length < 5) {
      nextErrors.location = "Location must be at least 5 characters.";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
      nextErrors.date = "Date must use YYYY-MM-DD format.";
    }

    if (!cleanOpenTime) {
      nextErrors.openTime = "Please select opening time.";
    }

    if (!cleanCloseTime) {
      nextErrors.closeTime = "Please select closing time.";
    }

    const feeNumber = Number(form.fee);
    if (!form.fee || Number.isNaN(feeNumber) || feeNumber < 0) {
      nextErrors.fee = "Fee must be a valid positive number.";
    }

    const capacityNumber = Number(form.capacity);
    if (
      !form.capacity ||
      !Number.isInteger(capacityNumber) ||
      capacityNumber < 1
    ) {
      nextErrors.capacity = "Capacity must be a whole number above 0.";
    }

    if (form.itemType === "court") {
      const courtCountNumber = Number(form.courtCount);
      if (
        !form.courtCount ||
        !Number.isInteger(courtCountNumber) ||
        courtCountNumber < 1
      ) {
        nextErrors.courtCount = "Court count must be a whole number above 0.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async () => {
    if (isSubmitting) return;

    const isValid = validate();
    if (!isValid) {
      Alert.alert("Incomplete form", "Please fix highlighted fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      if (!profile?.id) {
        Alert.alert("Sign in required", "Please sign in again.");
        return;
      }

      const payload = {
        userId: profile.id,
        title: form.title,
        category: form.categories.join(", "),
        description: form.description,
        location: form.location,
        date: form.date,
        timeRange: `${form.openTime}-${form.closeTime}`,
        fee: Number(form.fee),
        capacity: Number(form.capacity),
        imageUri: form.imageUris[0] || undefined,
      };

      if (form.itemType === "event") {
        await createEvent(payload);
      } else {
        await createCourt({
          ...payload,
          courtCount: Number(form.courtCount),
        });
      }

      Alert.alert("Created", `Your ${form.itemType} has been published.`);
      setForm(initialForm);
      setErrors({});
    } catch (error: any) {
      Alert.alert("Creation failed", error?.message ?? "Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = `${date.getMinutes()}`.padStart(2, "0");
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${suffix}`;
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "dismissed" || !selectedDate) return;
    setValue("date", formatDate(selectedDate));
  };

  const onOpenTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowOpenTimePicker(false);
    if (event.type === "dismissed" || !selectedDate) return;
    setValue("openTime", formatTime(selectedDate));
  };

  const onCloseTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowCloseTimePicker(false);
    if (event.type === "dismissed" || !selectedDate) return;
    setValue("closeTime", formatTime(selectedDate));
  };

  const pickImages = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow gallery access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.9,
    });

    if (result.canceled || !result.assets?.length) return;

    const newImageUris = result.assets.map((asset) => asset.uri);
    setValue("imageUris", [...form.imageUris, ...newImageUris]);
  };

  const removeImage = (index: number) => {
    const updatedImageUris = form.imageUris.filter((_, i) => i !== index);
    setValue("imageUris", updatedImageUris);
  };

  const getCurrentLocation = async () => {
    try {
      // For now, we'll use a simple geocoding API to get location from address
      // In a production app, you'd want to use Expo Location for GPS
      Alert.alert(
        "Location Services",
        "Enter your address manually or enable GPS in production for automatic location detection.",
        [{ text: "OK" }],
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to get location. Please enter address manually.",
      );
    }
  };

  const geocodeAddress = async (address: string) => {
    try {
      // Using Nominatim (OpenStreetMap) for free geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const formattedAddress = result.display_name || address;
        setValue("location", formattedAddress);
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      // Keep the manually entered address if geocoding fails
    }
  };

  const availableCategories = [
    "Basketball",
    "Badminton",
    "Tennis",
    "Volleyball",
    "Football",
    "Swimming",
    "Running",
    "Cycling",
    "Yoga",
    "Gym",
    "Table Tennis",
    "Golf",
    "Boxing",
    "Martial Arts",
    "Dance",
    "Others",
  ];

  const MultiSelectCategories = ({
    selected,
    onChange,
    error,
  }: {
    selected: string[];
    onChange: (categories: string[]) => void;
    error?: string;
  }) => {
    const toggleCategory = (category: string) => {
      if (selected.includes(category)) {
        onChange(selected.filter((c) => c !== category));
      } else {
        onChange([...selected, category]);
      }
    };

    return (
      <View className="gap-2">
        <Text className="text-sm font-semibold text-gray-700">
          Categories / Sports
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {availableCategories.map((category) => {
            const isSelected = selected.includes(category);
            return (
              <Pressable
                key={category}
                onPress={() => toggleCategory(category)}
                className={`px-3 py-2 rounded-full border ${
                  isSelected
                    ? "bg-green-800 border-green-800"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {error ? (
          <Text className="text-red-500 mt-1 text-xs">{error}</Text>
        ) : null}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white pt-12"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40, gap: 14 }}
      >
        <View className="flex-col gap-1">
          <Text className="text-2xl font-bold text-black">Create Listing</Text>
          <Text className="text-gray-600">
            Publish a new event or court as {creatorName}.
          </Text>
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setValue("itemType", "event")}
            className={`flex-1 rounded-xl border px-4 py-3 ${
              form.itemType === "event"
                ? "bg-emerald-900 border-emerald-900"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                form.itemType === "event" ? "text-white" : "text-gray-800"
              }`}
            >
              Event
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setValue("itemType", "court")}
            className={`flex-1 rounded-xl border px-4 py-3 ${
              form.itemType === "court"
                ? "bg-emerald-900 border-emerald-900"
                : "bg-white border-gray-300"
            }`}
          >
            <Text
              className={`text-center font-semibold ${
                form.itemType === "court" ? "text-white" : "text-gray-800"
              }`}
            >
              Court
            </Text>
          </Pressable>
        </View>

        <Field
          label={`${form.itemType === "event" ? "Event" : "Court"} title`}
          value={form.title}
          onChangeText={(value) => setValue("title", value)}
          placeholder="e.g. Saturday Hoop Session"
          error={errors.title}
        />
        <MultiSelectCategories
          selected={form.categories}
          onChange={(categories) => setValue("categories", categories)}
          error={errors.categories}
        />
        <Field
          label="Description"
          value={form.description}
          onChangeText={(value) => setValue("description", value)}
          placeholder="Write details for participants..."
          multiline
          textAlignVertical="top"
          containerClassName="min-h-24"
          error={errors.description}
        />
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-700">Location</Text>
          <View className="flex-row gap-2">
            <TextInput
              className={`flex-1 rounded-xl border px-4 py-3 text-gray-900 ${
                errors.location ? "border-red-400" : "border-gray-300"
              }`}
              value={form.location}
              onChangeText={(value) => {
                setValue("location", value);
                if (value.length > 5) {
                  geocodeAddress(value);
                }
              }}
              placeholder="Complete venue address"
              onBlur={() => {
                if (form.location.length > 5) {
                  geocodeAddress(form.location);
                }
              }}
            />
            <Pressable
              onPress={getCurrentLocation}
              className="rounded-xl border border-gray-300 px-4 py-3 bg-gray-50"
            >
              <Feather name="map-pin" size={20} color="#6b7280" />
            </Pressable>
          </View>
          {errors.location ? (
            <Text className="text-red-500 mt-1 text-xs">{errors.location}</Text>
          ) : null}
        </View>
        <View className="gap-2">
          <Text className="text-sm font-semibold text-gray-700">Image</Text>
          <Pressable
            onPress={pickImages}
            className="rounded-xl border border-gray-300 px-4 py-3"
          >
            <Text className="text-gray-900">
              {form.imageUris.length > 0 ? "Add more images" : "Upload images"}
            </Text>
          </Pressable>

          {/* Display selected images */}
          {form.imageUris.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm text-gray-600">
                Selected Images ({form.imageUris.length}/5)
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {form.imageUris.map((uri, index) => (
                  <View key={index} className="relative">
                    <Image
                      source={{ uri }}
                      className="h-24 w-24 rounded-xl"
                      resizeMode="cover"
                    />
                    <Pressable
                      onPress={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                    >
                      <Feather name="x" size={16} color="white" />
                    </Pressable>
                  </View>
                ))}
                {form.imageUris.length < 5 && (
                  <Pressable
                    onPress={pickImages}
                    className="h-24 w-24 rounded-xl border-2 border-dashed border-gray-300 items-center justify-center"
                  >
                    <Feather name="plus" size={24} color="#9ca3af" />
                  </Pressable>
                )}
              </View>
            </View>
          )}
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Date
            </Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className={`rounded-xl border px-4 py-3 ${
                errors.date ? "border-red-400" : "border-gray-300"
              }`}
            >
              <Text className="text-gray-900">{form.date || "Pick date"}</Text>
            </Pressable>
            {errors.date ? (
              <Text className="text-red-500 mt-1 text-xs">{errors.date}</Text>
            ) : null}
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Open Time
            </Text>
            <Pressable
              onPress={() => setShowOpenTimePicker(true)}
              className={`rounded-xl border px-4 py-3 ${
                errors.openTime ? "border-red-400" : "border-gray-300"
              }`}
            >
              <Text className="text-gray-900">
                {form.openTime || "Pick time"}
              </Text>
            </Pressable>
            {errors.openTime ? (
              <Text className="text-red-500 mt-1 text-xs">
                {errors.openTime}
              </Text>
            ) : null}
          </View>
          <View className="flex-1">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              Close Time
            </Text>
            <Pressable
              onPress={() => setShowCloseTimePicker(true)}
              className={`rounded-xl border px-4 py-3 ${
                errors.closeTime ? "border-red-400" : "border-gray-300"
              }`}
            >
              <Text className="text-gray-900">
                {form.closeTime || "Pick time"}
              </Text>
            </Pressable>
            {errors.closeTime ? (
              <Text className="text-red-500 mt-1 text-xs">
                {errors.closeTime}
              </Text>
            ) : null}
          </View>
        </View>

        {showDatePicker ? (
          <DateTimePicker
            value={form.date ? new Date(form.date) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
          />
        ) : null}
        {showOpenTimePicker ? (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onOpenTimeChange}
          />
        ) : null}
        {showCloseTimePicker ? (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onCloseTimeChange}
          />
        ) : null}

        <View className="flex-row gap-3">
          <Field
            label="Fee (PHP)"
            value={form.fee}
            onChangeText={(value) =>
              setValue("fee", value.replace(/[^\d.]/g, ""))
            }
            placeholder="150"
            keyboardType="numeric"
            error={errors.fee}
            wrapperClassName="flex-1"
          />
          <Field
            label="Capacity"
            value={form.capacity}
            onChangeText={(value) =>
              setValue("capacity", value.replace(/[^\d]/g, ""))
            }
            placeholder="20"
            keyboardType="numeric"
            error={errors.capacity}
            wrapperClassName="flex-1"
          />
        </View>
        {form.itemType === "court" ? (
          <Field
            label="Number of Courts"
            value={form.courtCount}
            onChangeText={(value) =>
              setValue("courtCount", value.replace(/[^\d]/g, ""))
            }
            placeholder="3"
            keyboardType="numeric"
            error={errors.courtCount}
          />
        ) : null}

        <Pressable
          onPress={onSubmit}
          disabled={isSubmitting}
          className="mt-2 rounded-xl bg-black px-5 py-4 items-center"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="check-circle" size={18} color="#ffffff" />
            <Text className="text-white font-semibold">
              {isSubmitting ? "Submitting..." : "Create"}
            </Text>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  error?: string;
  multiline?: boolean;
  textAlignVertical?: "top" | "center" | "bottom";
};

const Field = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline,
  textAlignVertical,
  containerClassName,
  keyboardType,
  wrapperClassName,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  textAlignVertical?: "top" | "center" | "bottom";
  containerClassName?: string;
  keyboardType?: any;
  wrapperClassName?: string;
}) => (
  <View
    className={`gap-2 ${containerClassName || ""} ${wrapperClassName || ""}`}
  >
    <Text className="text-sm font-semibold text-gray-700">{label}</Text>
    <TextInput
      className={`rounded-xl border px-4 py-3 text-gray-900 ${
        error ? "border-red-400" : "border-gray-300"
      }`}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline={multiline}
      textAlignVertical={textAlignVertical}
      keyboardType={keyboardType}
    />
    {error ? <Text className="text-red-500 mt-1 text-xs">{error}</Text> : null}
  </View>
);
