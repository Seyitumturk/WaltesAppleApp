import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import bowlImage from '../assets/bowl-image.png';

const markedDice = require('../assets/marked-dice.png');
const unmarkedDice = require('../assets/unmarked-dice.png');

export default function WaltesBoard({ playerTurn, setDice }) {
  const [dice, setLocalDice] = React.useState([0, 0, 0, 0, 0, 0]);

  const rollDice = () => {
    const newDice = dice.map(() => (Math.random() > 0.5 ? 1 : 0));
    setLocalDice(newDice);
  };

  const randomPosition = (radius, size) => {
    const innerRadius = radius - size;

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * innerRadius;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };


  React.useEffect(() => {
    rollDice();
    setDice(dice);
  }, [playerTurn]);


  return (
    <View style={styles.container}>
      <ImageBackground
        source={bowlImage}
        resizeMode="contain"
        style={styles.bowlImage}
      >
        <View style={styles.diceContainer}>
          {dice.map((die, index) => {
            const position = randomPosition(80, 5); // Adjust the radius and size as needed
            return (
              <Image
                key={index}
                source={die === 1 ? markedDice : unmarkedDice}
                style={[styles.dice, { left: position.x, top: position.y }]}
              />
            );
          })}
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
  },
  activePlayerBackground: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
  },
  scoreButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: 30,
  },
  scoreButton: {
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bowlImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },


  dice: {
    position: 'absolute',
    width: 50,
    height: 50,
    margin: 5,
  },
});
