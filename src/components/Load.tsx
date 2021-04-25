import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

import loadingAnimation from "../assets/load.json";

export default function Load() {
  return (
    <View style={styles.container}>
      <LottieView
        loop
        autoPlay
        source={loadingAnimation}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    width: 200,
    height: 200,
    backgroundColor: "transparent",
  },
});
