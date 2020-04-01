import React from 'react';
import styles from './StatusBar.styles.js';
import {View, StatusBar as RNStatusBar} from 'react-native';

const StatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <RNStatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default StatusBar;
