import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import userImg from "../assets/matheus.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Image source={userImg} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: getStatusBarHeight(),
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  title: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
});
