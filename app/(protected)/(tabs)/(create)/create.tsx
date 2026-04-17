import { useAuthContext } from "@/hooks/use-auth-context";
import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
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
  category: string;
  description: string;
  location: string;
  date: string;
  timeRange: string;
  fee: string;
  capacity: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  itemType: "event",
  title: "",
  category: "",
  description: "",
  location: "",
  date: "",
  timeRange: "",
  fee: "",
  capacity: "",
};

export default function CreateScreen() {
  const { profile } = useAuthContext();
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const cleanCategory = form.category.trim();
    const cleanDescription = form.description.trim();
    const cleanLocation = form.location.trim();
    const cleanDate = form.date.trim();
    const cleanTimeRange = form.timeRange.trim();

    if (cleanTitle.length < 3) {
      nextErrors.title = "Title must be at least 3 characters.";
    }

    if (cleanCategory.length < 3) {
      nextErrors.category = "Category must be at least 3 characters.";
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

    if (cleanTimeRange.length < 7 || !cleanTimeRange.includes("-")) {
      nextErrors.timeRange = "Time range should look like 1:00pm-5:00pm.";
    }

    const feeNumber = Number(form.fee);
    if (!form.fee || Number.isNaN(feeNumber) || feeNumber < 0) {
      nextErrors.fee = "Fee must be a valid positive number.";
    }

    const capacityNumber = Number(form.capacity);
    if (!form.capacity || !Number.isInteger(capacityNumber) || capacityNumber < 1) {
      nextErrors.capacity = "Capacity must be a whole number above 0.";
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
      Alert.alert(
        "Draft ready",
        `Your ${form.itemType} has passed validation and is ready to submit.`,
      );
      setForm(initialForm);
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
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
        <Field
          label="Category / Sport"
          value={form.category}
          onChangeText={(value) => setValue("category", value)}
          placeholder="e.g. Basketball"
          error={errors.category}
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
        <Field
          label="Location"
          value={form.location}
          onChangeText={(value) => setValue("location", value)}
          placeholder="Complete venue address"
          error={errors.location}
        />

        <View className="flex-row gap-3">
          <Field
            label="Date"
            value={form.date}
            onChangeText={(value) => setValue("date", value)}
            placeholder="YYYY-MM-DD"
            error={errors.date}
            wrapperClassName="flex-1"
          />
          <Field
            label="Time Range"
            value={form.timeRange}
            onChangeText={(value) => setValue("timeRange", value)}
            placeholder="1:00pm-5:00pm"
            error={errors.timeRange}
            wrapperClassName="flex-1"
          />
        </View>

        <View className="flex-row gap-3">
          <Field
            label="Fee (PHP)"
            value={form.fee}
            onChangeText={(value) => setValue("fee", value.replace(/[^\d.]/g, ""))}
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
  keyboardType?: "default" | "numeric";
  wrapperClassName?: string;
  containerClassName?: string;
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline,
  textAlignVertical,
  keyboardType = "default",
  wrapperClassName = "",
  containerClassName = "",
}: FieldProps) {
  return (
    <View className={wrapperClassName}>
      <Text className="text-sm font-semibold text-gray-700 mb-2">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        keyboardType={keyboardType}
        className={`rounded-xl border px-4 py-3 text-gray-900 ${
          error ? "border-red-400" : "border-gray-300"
        } ${containerClassName}`}
      />
      {error ? <Text className="text-red-500 mt-1 text-xs">{error}</Text> : null}
    </View>
  );
}
