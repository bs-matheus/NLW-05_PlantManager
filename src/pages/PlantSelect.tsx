import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnviromentButton from "../components/EnviromentButton";
import { PlantProps } from "../libs/storage";
import api from "../services/api";
import Header from "../components/Header";
import Load from "../components/Load";
import PrimaryPlantCard from "../components/PrimaryPlantCard";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentProps {
  key: string;
  title: string;
}

export default function PlantSelect() {
  const [userName, setUserName] = useState<string>();
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [selectedEnviroment, setSelectedEnviroment] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  function handleEnviromentSelection(enviroment: string) {
    setSelectedEnviroment(enviroment);

    if (enviroment === "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(enviroment)
    );

    setFilteredPlants(filtered);
  }

  function handlePlantSelection(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_page=${page}&_limit=${8}`
    );

    if (!data) return;

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handleFetchMorePlants(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((previousPage) => previousPage + 1);
    fetchPlants();
  }

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(user || "");
    }

    loadStorageUserName();
  }, []);

  useEffect(() => {
    async function fetchEnviroment() {
      const { data } = await api.get("plants_environments");
      setEnviroments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }
    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) return <Load />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header title="Olá," subtitle={userName} />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === selectedEnviroment}
              onPress={() => handleEnviromentSelection(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PrimaryPlantCard
              data={item}
              onPress={() => handlePlantSelection(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMorePlants(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    marginTop: 15,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  enviromentList: {
    height: 40,
    paddingBottom: 5,
    marginVertical: 32,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});
