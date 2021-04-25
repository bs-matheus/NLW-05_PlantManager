import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"}
          suas plantas de {"\n"}
          forma fácil
        </Text>

        <Image source={wateringImg} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que preisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 28,
    marginTop: 38,
    lineHeight: 34,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});
