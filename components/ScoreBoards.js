import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const ScoreBoards = ({ score, player }) => {
  const rotation = player === 1 ? '180deg' : '0deg';

  return (
    <View style={styles.container}>
      <Text style={[styles.scoreText, { transform: [{ rotate: rotation }] }]}>
        Player {player + 1}: {score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ScoreBoards;
