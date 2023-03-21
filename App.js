import React from 'react';
import {
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import WaltesBoard from './components/WaltesBoard';
import ShakeEventExpo from './components/ShakeEventExpo';

const calculateScore = (dice) => {
  const markedDiceCount = dice.reduce(
    (count, die) => (die === 1 ? count + 1 : count),
    0
  );
  return markedDiceCount === 0 || markedDiceCount === 6 ? 6 : markedDiceCount;
};

export default function App() {
  const [playerTurn, setPlayerTurn] = React.useState(0);
  const [dice, setDice] = React.useState([0, 0, 0, 0, 0, 0]);

  React.useEffect(() => {
    ShakeEventExpo.addListener(() => {
      handlePlayerClick(playerTurn);
    });

    return () => {
      ShakeEventExpo.removeListener();
    };
  }, [playerTurn]);

  const [scores, setScores] = React.useState([0, 0]);

  const handlePlayerClick = (player) => {
    const newScore = calculateScore(dice);
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      updatedScores[player] += newScore;
      return updatedScores;
    });
    setPlayerTurn((player + 1) % 2);
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WaltesBoard playerTurn={playerTurn} setDice={setDice} />
      <TouchableOpacity
        style={styles.playerRollButton}
        activeOpacity={0.7}
        onPress={() => handlePlayerClick(playerTurn)}
      >
        <Text style={styles.playerRollButtonText}>
          Player {playerTurn + 1} - Roll & Score: {calculateScore(dice)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  playerRollButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  },


  playerRollButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
