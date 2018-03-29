import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  ImageBackground
} from 'react-native';

import Enemy from './app/components/Enemy';

type Props = {};
export default class Game extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
      points: 0,

      moveEnemyVal: new Animated.Value(0),
      enemyStartPosX: 0,
      enemySide: 'left',
      enemySpeed: 4200,

      gameOver: false,
    }
  }

  render() {
    return (
      <ImageBackground source={require('./app/img/background.png')} style={styles.container}>

      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 80
      }}>
        <View style={styles.points}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 40,
            color: '#fff'
          }}>
            {this.state.points}
          </Text>
        </View>
      </View>

      <Animated.Image source={require('./app/img/spaceship.png')}
       style={{
         height: 100,
         width: 100,
         position: 'absolute',
         zIndex: 1,
         bottom: 50,
         transform: [
           { translateX: this.state.movePlayerVal }
         ]
       }}
      />

      <Enemy enemyImg={require('./app/img/asteroid.png')}
        enemyStartPosX={this.state.enemyStartPosX}
        moveEnemyVal={this.state.moveEnemyVal} />

      <View style={styles.controls}>
        <Text style={styles.left} onPress={ () => this.movePlayer('left') }> {'<'} </Text>
        <Text style={styles.right}  onPress={ () => this.movePlayer('right') }> {'>'} </Text>
      </View>

      </ImageBackground>
    );
  }

  movePlayer(direction) {
    //move player right
    if (direction == 'right') {
      this.setState({ playerSide: 'right' });

      Animated.spring(
        this.state.movePlayerVal,
        {
          toValue: Dimensions.get('window').width - 140,
          tension: 120,
        }
      ).start();

    } else if (direction == 'left') {
      this.setState({ playerSide: 'left' });

      Animated.spring(
        this.state.movePlayerVal,
        {
          toValue: 40,
          tension: 120,
        }
      ).start();

    }
  }

  componentDidMount() {
    this.animateEnemy();
  }

  animateEnemy() {
    this.state.moveEnemyVal.setValue(-100);
    var windowHeight = Dimensions.get('window').height;

    //generate left distance for enemyImg
    var xDistance = Math.floor(Math.random() * 2) + 1;

    if (xDistance === 2) {
      xDistance = 40;
      this.setState({ enemySide: 'left' });
    } else {
      xDistance = Dimensions.get('window').width -140;
      // enemy is on the right side
      this.setState({ enemySide: 'right' });
    }
    this.setState({ enemyStartPosX: xDistance });

    //interval to check for collision each 50 ms
    var refreshInterval;
    refreshIntervalId = setInterval(() => {
      //collision logic
      //if enemy collides with player and they are on the same side
      // and the enemy has not passed the player safely
      if (this.state.moveEnemyVal._value > windowHeight - 280
            && this.state.moveEnemyVal._value < windowHeight - 180
            && this.state.playerSide == this.state.enemySide) {
              clearInterval(refreshIntervalId)
              this.setState({ gameOver: true });
              this.gameOver();
            }
    }, 50);

    //increase enemy speed every 10 seconds
    setInterval(() => {
      this.setState({ enemySpeed: this.state.enemySpeed - 50 })
    }, 10000)

    //Animate the enemy
    Animated.timing(
      this.state.moveEnemyVal,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed,
      }
    ).start(event => {
      // if no collision is detected, restart the enemy animation
      if (event.finished && this.state.gameOver == false) {
        clearInterval(refreshIntervalId)
        this.setState({ points: ++this.state.points });
        this.animateEnemy();
      }
    })
  }

  gameOver() {
    alert("Kapow! You Lose.")
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  points: {
    width: 80,
    height: 80,
    backgroundColor: '#6b46ce',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
    left: 10
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right',
    right: 20
  },
});

AppRegistry.registerComponent("Game", () => Game)
