import React, { useEffect, useState } from "react";
import { Text, View, Alert, FlatList, StyleSheet } from "react-native";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import Load from "../components/Load";
import Header from "../components/Header";
import TipCard from "../components/TipCard";
import SecondaryPlantCard from "../components/SecondaryPlantCard";
import { PlantProps, loadPlant, removePlant } from "../libs/storage";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export default function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja mesmo deletar sua ${plant.name}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Deletar",
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch {
            Alert.alert("Não foi possível deletar!");
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStoragedPlants() {
      const storagedPlants = await loadPlant();

      if (storagedPlants.length > 0) {
        const nextTime = formatDistance(
          new Date(storagedPlants[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: pt }
        );

        setNextWatered(
          `Regue sua ${storagedPlants[0].name} daqui a ${nextTime}.`
        );

        setMyPlants(storagedPlants);
      } else {
        setNextWatered("Adicione plantas à sua lista para receber mais dicas.");
      }

      setLoading(false);
    }

    loadStoragedPlants();
  }, []);

  if (loading) return <Load />;
  return (
    <View style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas" />

      <TipCard text={nextWatered} />

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        {myPlants.length > 0 ? (
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <SecondaryPlantCard
                data={item}
                handleRemove={() => handleRemove(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyListView}>
            <Text style={styles.emptyListText}>Sua lista está vazia...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    backgroundColor: colors.background,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    marginVertical: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  emptyListView: {
    flex: 1,
    marginTop: -20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyListText: {
    fontSize: 17,
    color: colors.heading,
  },
});
