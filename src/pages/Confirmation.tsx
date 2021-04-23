import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Confirmation() {
  const navigation = useNavigation();

  function handleMoveOn() {
    navigation.navigate("PlantSelect");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button title="Começar" onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    padding: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    fontSize: 22,
    marginTop: 15,
    lineHeight: 38,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 17,
    paddingVertical: 10,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  footer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 50,
  },
});
