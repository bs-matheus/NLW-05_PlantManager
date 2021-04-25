import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import waterdrop from "../assets/waterdrop.png";
import colors from "../styles/colors";

interface TipCardProps {
  text?: string;
  plantSaveScreen?: boolean;
}

export default function TipCard({
  text,
  plantSaveScreen = false,
}: TipCardProps) {
  return (
    <View style={[styles.tipContainer, plantSaveScreen && { bottom: 65 }]}>
      <Image style={styles.tipImage} source={waterdrop} />
      <Text style={styles.tipText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tipContainer: {
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blue_light,
  },
  tipImage: {
    width: 60,
    height: 60,
  },
  tipText: {
    flex: 1,
    fontSize: 17,
    marginLeft: 20,
    color: colors.blue,
  },
});
