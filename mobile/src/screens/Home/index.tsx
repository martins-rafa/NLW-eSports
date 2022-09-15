import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { Heading } from "../../components/Heading";
import { GameCard, GameCardsProps } from "../../components/GameCard";

import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";

export function Home() {
  const [games, setGames] = useState<GameCardsProps[]>([]);

  useEffect(() => {
    fetch("http://192.168.10.13:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl }: GameCardsProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Find your duo!"
          subtitle="Choose the game you'd like to play..."
        />
        <FlatList
          contentContainerStyle={styles.contentList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
