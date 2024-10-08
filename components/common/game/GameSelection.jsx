import { View, Text, ImageBackground, Pressable } from 'react-native';
import React from 'react';
import styles from './gameSelection.style';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const GameSelection = ({ chosenGame, currentlyVoting, openGameSelection }) => {
  return (
    <View style={styles.gameSelectionContainer}>
      <View
        style={[
          {
            padding: chosenGame ? 0 : 5,
            borderStyle: chosenGame ? 'solid' : 'dotted',
          },
          styles.gameCaseContainer,
        ]}
      >
        {!chosenGame ? (
          <FontAwesome name='question' size={60} color={'white'} />
        ) : (
          <ImageBackground
            style={styles.gameCaseCover}
            source={{
              uri: !chosenGame.cover.id
                ? chosenGame.cover
                : `https://images.igdb.com/igdb/image/upload/t_1080p/${chosenGame.cover.image_id}.jpg`,
            }}
          />
        )}
      </View>
      <View style={styles.gameSelectionDetails}>
        <Text style={styles.gameMessage}>
          {!currentlyVoting
            ? "Your group hasn't chosen a game yet. As the leader of the group, suggest one to play!"
            : 'Cast your vote, delay the session, or choose a superior game.'}
        </Text>

        <View style={styles.gameSelectionActions}>
          <Pressable
            style={({ pressed }) => [
              styles.gameSelectionBtn,
              pressed ? styles.gameSelectionBtnPressed : '',
            ]}
            onPress={openGameSelection}
          >
            <Text style={styles.gameSelectionBtnText}>SELECT</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              styles.gameSelectionBtn,
              pressed ? styles.gameSelectionBtnPressed : '',
            ]}
          >
            <Text style={styles.gameSelectionBtnText}>RANDOMIZE</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GameSelection;
