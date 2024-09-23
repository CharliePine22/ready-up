import { View, Text, ImageBackground, Pressable } from "react-native";
import { useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import styles from "./gameVoting.style";
import useVote from "../../../hooks/useVote";
const GameVoting = ({ openGameSelection, votedGames }) => {
  const [currentGameInfo, setCurrentGameInfo] = useState("");
  const { castVote } = useVote();
  const carouselRef = useRef();
  return (
    <View style={styles.gameSelectionContainer}>
      <View
        style={[
          {
            padding: 0,
            borderStyle: "solid",
          },
          styles.gameCaseContainer,
        ]}
      >
        <Carousel
          ref={carouselRef}
          scrollEnabled={votedGames.length > 1 ? true : false}
          style={styles.carousel}
          data={votedGames}
          renderItem={({ item }) => (
            <ImageBackground
              style={styles.gameCaseCover}
              source={{
                uri: item.cover,
              }}
            />
          )}
          sliderWidth={100}
          itemWidth={100}
          width={170}
        />
        {/* {!chosenGame ? (
          <FontAwesome name="question" size={60} color={"white"} />
        ) : (
          <ImageBackground
            style={styles.gameCaseCover}
            source={{
              uri: !chosenGame.cover.id
                ? chosenGame.cover
                : `https://images.igdb.com/igdb/image/upload/t_1080p/${chosenGame.cover.image_id}.jpg`,
            }}
          />
        )} */}
      </View>
      <View style={styles.gameSelectionDetails}>
        <Text style={styles.gameMessage}>
          Cast your vote, delay the session, or choose a superior game.
        </Text>

        <View style={styles.gameSelectionActions}>
          <Pressable
            style={({ pressed }) => [
              styles.gameSelectionBtn,
              pressed ? styles.gameSelectionBtnPressed : "",
            ]}
            onPress={() => castVote(currentGameInfo)}
          >
            <Text style={styles.gameSelectionBtnText}>VOTE</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.gameSelectionBtn,
              pressed ? styles.gameSelectionBtnPressed : "",
            ]}
            onPress={openGameSelection}
          >
            <Text style={styles.gameSelectionBtnText}>NEW GAME</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.gameSelectionBtn,
              pressed ? styles.gameSelectionBtnPressed : "",
            ]}
          >
            <Text style={styles.gameSelectionBtnText}>ADJUST TIME</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GameVoting;