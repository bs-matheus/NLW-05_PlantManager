import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export default function EnviromentButton({
  title,
  active = false,
  ...props
}: EnviromentButtonProps) {
  return (
    <RectButton
      style={[styles.container, active && styles.activeContainer]}
      {...props}
    >
      <Text style={active ? styles.activeText : styles.text}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  activeContainer: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  activeText: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
