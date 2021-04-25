import React from "react";
import { Text, View, Animated, StyleSheet } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";
import { Feather } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface SecondaryPlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export default function SecondaryPlantCard({
  data,
  handleRemove,
  ...props
}: SecondaryPlantProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View style={styles.removeButton}>
            <RectButton onPress={handleRemove}>
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.conatiner} {...props}>
        <SvgFromUri uri={data.photo} width={50} height={50} />

        <Text style={styles.title}>{data.name}</Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    width: "100%",
    borderRadius: 20,
    marginVertical: 5,
    paddingVertical: 25,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    backgroundColor: colors.shape,
  },
  title: {
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    fontSize: 16,
    marginTop: 5,
    color: colors.body_dark,
    fontFamily: fonts.heading,
  },
  removeButton: {
    right: 15,
    width: 80,
    height: 98,
    marginTop: 6,
    paddingLeft: 10,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: colors.red,
  },
});
