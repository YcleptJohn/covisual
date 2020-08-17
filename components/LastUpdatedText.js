import React from 'react';
import * as RNLocalize from 'react-native-localize';
import styles from './LastUpdatedText.styles.js';
import Moment from 'react-moment';
import 'moment-timezone';
import { Text } from 'react-native';

const LastUpdatedText = (props) => {
  const tz = RNLocalize.getTimeZone()
  return (
    <Text style={styles.body}>
      Last Updated:&nbsp;
      <Moment
        format='Do MMM HH:mm'
        element={Text}
        tz={tz}
        >
          {props.time}
        </Moment>
    </Text>
  );
}

export default LastUpdatedText;