import React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PrimaryPlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  };
}

export default function PrimaryPlantCard({
  data,
  ...props
}: PrimaryPlantProps) {
  return (
    <RectButton style={styles.conatiner} {...props}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    margin: 10,
    maxWidth: "45%",
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: colors.shape,
  },
  text: {
    marginVertical: 16,
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
