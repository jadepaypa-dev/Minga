import { Pressable, TextInput, TextInputProps, View } from "react-native";

type CustomInputProps = {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;

  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;

  onPressPrefix?: () => void;
  onPressSuffix?: () => void;
} & TextInputProps;

export default function CustomInput({
  value,
  onChange,
  placeholder = "Search...",
  prefixIcon,
  suffixIcon,
  onPressPrefix,
  onPressSuffix,
  ...props
}: CustomInputProps) {
  return (
    <View className="w-full">
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          placeholderTextColor="#878d99"
          className={`w-full border border-gray-300 rounded-full py-3 text-base text-black bg-white shadow-md
            ${prefixIcon ? "pl-12" : "pl-4"} 
            ${suffixIcon ? "pr-12" : "pr-4"}
          `}
          {...props}
        />

        {/* Prefix Icon */}
        {prefixIcon && (
          <Pressable
            onPress={onPressPrefix}
            style={{ position: "absolute", left: 16, top: 12 }}
          >
            {prefixIcon}
          </Pressable>
        )}

        {/* Suffix Icon */}
        {suffixIcon && (
          <Pressable
            onPress={onPressSuffix}
            style={{ position: "absolute", right: 16, top: 12 }}
          >
            {suffixIcon}
          </Pressable>
        )}
      </View>
    </View>
  );
}
