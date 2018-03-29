import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Animated,
  Image,
} from 'react-native';

type Props = {};
export default class Enemy extends Component<Props> {

  render() {
    return (

      <Animated.Image source={this.props.enemyImg}
       style={{
         height: 100,
         width: 100,
         position: 'absolute',
         left: this.props.enemyStartPosX,
         transform: [
           { translateY: this.props.moveEnemyVal }
         ]
       }}
      />

  )}
}
