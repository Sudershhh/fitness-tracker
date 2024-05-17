import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import exercises from "../../assets/data/exercises.json";
import { Stack } from "expo-router";
import { useState } from "react";

const ExerciseDetailsScreen = () => {
  const params = useLocalSearchParams();

  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

  const exercise = exercises.find((item, index) => item.name === params.name);

  if (!exercise) {
    return <Text>Exercise Not Found!</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />

      <View style={styles.panel}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.exerciseSubtitle}>
          <Text style={styles.subValue}>{exercise.muscle}</Text> |{" "}
          <Text style={styles.subValue}>{exercise.equipment}</Text>
        </Text>
      </View>

      <View style={styles.panel}>
        <Text
          style={styles.instructions}
          numberOfLines={isInstructionExpanded ? 0 : 3}
        >
          {exercise.instructions}
        </Text>
        <Text
          style={styles.seeMore}
          onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
        >
          {isInstructionExpanded ? "See Less..." : "See More..."}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: "500",
  },
  exerciseSubtitle: {
    color: "dimgray",
  },
  subValue: {
    textTransform: "capitalize",
  },
  instructions: {
    fontSize: 16,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  seeMore: {
    alignSelf: "center",
    padding: 10,
    fontWeight: 600,
    color: "gray",
  },
});

export default ExerciseDetailsScreen;
