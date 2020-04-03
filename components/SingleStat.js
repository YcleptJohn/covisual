import React from 'react';
import StatPanel from './StatPanel.js';
import { Text, ActivityIndicator } from 'react-native';
import styles from './SingleStat.styles.js';

const SingleStat = (props) => {
  const noValue = (!props.value && props.value !== 0)
  return (
    <StatPanel>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      {!noValue && <Text style={styles.value}>{props.value.toLocaleString()}</Text>}
      {noValue && !props.isLoading && <Text style={styles.noReports}>No reports 🎉</Text>}
      {props.isLoading && <ActivityIndicator size='large' style={styles.values}/>}
      {props.suffix && <Text style={styles.suffix}>{props.suffix}</Text>}
    </StatPanel>
  )
};

export default SingleStat;