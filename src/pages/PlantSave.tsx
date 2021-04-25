import React, { useState } from "react";
import {
  Text,
  View,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { format } from "date-fns";
import { SvgFromUri } from "react-native-svg";
import { useNavigation, useRoute } from "@react-navigation/core";
import { getBottomSpace } from "react-native-iphone-x-helper";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { PlantProps, savePlant } from "../libs/storage";
import Button from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import TipCard from "../components/TipCard";

interface Params {
  plant: PlantProps;
}

export default function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Params;

  function handleOpenDateTimePicker() {
    setShowDatePicker(!showDatePicker);
  }

  function handleChangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") {
      setShowDatePicker(!showDatePicker);
    }

    if (dateTime) setSelectedDateTime(dateTime);
  }

  async function handleSave() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.",
        buttonTitle: "Muito Obrigado :D",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possível salvar!");
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />

          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantDescription}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <TipCard text={plant.water_tips} plantSaveScreen />

          <Text style={styles.alertLabe}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
              is24Hour
              mode="time"
              display="spinner"
              value={selectedDateTime}
              onChange={handleChangeTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={handleOpenDateTimePicker}
            >
              <Text style={styles.dateTimePickerText}>
                {`Mudar ${format(selectedDateTime, "HH:mm")}`}
              </Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSave} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shape,
    justifyContent: "space-between",
  },
  plantInfo: {
    flex: 1,
    paddingVertical: 50,
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "center",
    backgroundColor: colors.shape,
  },
  plantName: {
    fontSize: 24,
    marginTop: 15,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  plantDescription: {
    fontSize: 17,
    marginTop: 10,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.text,
  },
  controller: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    paddingBottom: getBottomSpace() || 20,
  },
  alertLabe: {
    fontSize: 12,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.complement,
  },
  dateTimePickerButton: {
    width: "100%",
    paddingVertical: 40,
    alignItems: "center",
  },
  dateTimePickerText: {
    fontSize: 24,
    color: colors.heading,
    fontFamily: fonts.text,
  },
});
