import React from 'react';
import { View } from 'react-native';
import styles from './StatPanel.styles.js';

const StatPanel = (props) => {
  return (
    <View style={styles.body}>
      { props.children }
    </View>
  );
}

export default StatPanel;