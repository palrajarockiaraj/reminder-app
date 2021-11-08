import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Reminder from "./components/Reminder";

export default function App() {
  return (
    <View style={styles.container}>
      <Reminder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
