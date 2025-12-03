import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Check, Calendar, TrendingUp, ArrowRight } from "lucide-react-native";

export default function Index() {
  const router = useRouter();
  const [classesPresent, setClassesPresent] = useState("");
  const [totalClasses, setTotalClasses] = useState("");
  const [targetPercentage, setTargetPercentage] = useState("75");

  const handleCalculate = () => {
    const present = parseInt(classesPresent);
    const total = parseInt(totalClasses);
    const target = parseInt(targetPercentage);

    if (!present || !total || !target || total === 0) {
      return;
    }

    router.push({
      pathname: "/results",
      params: {
        present,
        total,
        target,
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1A1D21]">
      <View className="flex-1 px-6 pt-12">
        <Text className="text-3xl font-bold text-white mb-2">ClassTrack</Text>
        <Text className="text-gray-500 mb-12">
          Know when to chill, know when to attend.
        </Text>

        {/* Classes Present */}
        <View className="mb-8">
          <Text className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wide">
            Classes Attended
          </Text>
          <View className="flex-row items-center bg-[#23282D] rounded-xl px-4 py-4 shadow-sm">
            <Check size={20} color="#9CA3AF" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="e.g. 45"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={classesPresent}
              onChangeText={setClassesPresent}
            />
          </View>
        </View>

        {/* Total Classes */}
        <View className="mb-8">
          <Text className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wide">
            Total Classes So Far
          </Text>
          <View className="flex-row items-center bg-[#23282D] rounded-xl px-4 py-4 shadow-sm">
            <Calendar size={20} color="#9CA3AF" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="e.g. 60"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={totalClasses}
              onChangeText={setTotalClasses}
            />
          </View>
        </View>

        {/* Target Percentage */}
        <View className="mb-8">
          <Text className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wide">
            TARGET PERCENTAGE
          </Text>
          <View className="flex-row items-center bg-[#23282D] rounded-xl px-4 py-4 shadow-sm">
            <TrendingUp size={20} color="#9CA3AF" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-white"
              placeholder="75"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={targetPercentage}
              onChangeText={setTargetPercentage}
            />
          </View>
        </View>

        <View className="flex-1" />

        {/* Calculate Button */}
        <TouchableOpacity
          className="bg-[#2377dd] rounded-2xl py-4 mb-8 shadow-lg flex-row items-center justify-center"
          onPress={handleCalculate}
          activeOpacity={0.8}
        >
          <Text className="text-white text-center text-base font-semibold mr-2">
            Calculate
          </Text>
          <ArrowRight size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
