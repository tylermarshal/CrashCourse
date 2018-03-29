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

type Props = {};
export default class Game extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
    }
  }

  render() {
    return (
      <ImageBackground source={require('./app/img/background.png')} style={styles.container}>

        <Animated.Image source={require('./app/img/spaceship.png')}
         style={styles.ship}
        />

        <View style={styles.controls}>
          <Text style={styles.left}> {'<'} </Text>
          <Text style={styles.right}> {'>'} </Text>
        </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    resizeMode: 'cover',
  },
  ship: {
    height: 100,
    width: 100,
    position: 'absolute',
    zIndex: 1,
    bottom: 50,
    resizeMode: 'stretch',
    transform: [
      { translateX: this.state.movePlayerVal }
    ]
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fonSize: 60,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right'
  },
});

AppRegistry.registerComponent("Game", () => Game)
