import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowDownToDot,
  BookOpen,
  PartyPopper,
  ArrowLeft,
} from "lucide-react-native";

export default function Results() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const present = parseInt(params.present as string);
  const total = parseInt(params.total as string);
  const target = parseInt(params.target as string);

  const currentPercentage = (present / total) * 100;

  const getResult = () => {
    if (Math.abs(currentPercentage - target) < 0.01) {
      return {
        message: "You are on the spot right now",
        icon: ArrowDownToDot,
        color: "#000000",
      };
    } else if (currentPercentage < target) {
      const classesNeeded = Math.ceil(
        (target * total - 100 * present) / (100 - target)
      );

      return {
        message: `You must attend ${classesNeeded} more ${
          classesNeeded === 1 ? "class" : "classes"
        }`,
        icon: BookOpen,
        color: "#000000",
      };
    } else {
      const classesCanbunk = Math.floor(
        (100 * present - target * total) / target
      );
      return {
        message: `You can bunk ${classesCanbunk} ${
          classesCanbunk === 1 ? "class" : "classes"
        }`,
        icon: PartyPopper,
        color: "#000000",
      };
    }
  };

  const result = getResult();
  const ResultIcon = result.icon;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6 pt-12">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Attendance
        </Text>
        <Text className="text-gray-500 mb-8">
          Track your classes & stay safe
        </Text>

        {/* Summary Cards */}
        <View className="mb-8">
          <View className="bg-white rounded-xl px-4 py-3 shadow-sm mb-3">
            <Text className="text-xs text-gray-500 uppercase mb-1">
              Classes Present
            </Text>
            <Text className="text-lg font-semibold text-gray-900">
              {present}
            </Text>
          </View>

          <View className="bg-white rounded-xl px-4 py-3 shadow-sm mb-3">
            <Text className="text-xs text-gray-500 uppercase mb-1">
              Total Classes
            </Text>
            <Text className="text-lg font-semibold text-gray-900">{total}</Text>
          </View>

          <View className="bg-white rounded-xl px-4 py-3 shadow-sm mb-3">
            <Text className="text-xs text-gray-500 uppercase mb-1">
              Target Percentage
            </Text>
            <Text className="text-lg font-semibold text-gray-900">
              {target}%
            </Text>
          </View>

          <View className="bg-white rounded-xl px-4 py-3 shadow-sm">
            <Text className="text-xs text-gray-500 uppercase mb-1">
              Current Percentage
            </Text>
            <Text className="text-lg font-semibold text-gray-900">
              {currentPercentage.toFixed(2)}%
            </Text>
          </View>
        </View>

        <View className="flex-1" />

        {/* Results Card */}
        <View className="bg-white rounded-3xl p-6 mb-6 shadow-xl">
          <Text className="text-sm font-bold text-gray-900 text-center mb-4 uppercase tracking-wide">
            YOUR RESULTS:
          </Text>
          <View className="items-center mb-4">
            <ResultIcon size={48} color={result.color} />
          </View>
          <Text className="text-xl font-bold text-gray-900 text-center">
            {result.message}
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          className="bg-gray-900 rounded-2xl py-4 mb-8 shadow-lg flex-row items-center justify-center"
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <ArrowLeft size={20} color="#FFFFFF" />
          <Text className="text-white text-center text-base font-semibold ml-2">
            Calculate Again
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
