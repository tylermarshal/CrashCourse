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

      <View style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 80
      }}>
        <View style={styles.points}>
          <Text style={{
            fontWeight: 'bold',
            fontSize: 40
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
