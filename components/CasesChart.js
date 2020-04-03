import React from 'react';
import StatPanel from './StatPanel.js';
import { Text, ActivityIndicator } from 'react-native';

const transform = (label, obj) => {
  return {
    id: label,
    data: Object.entries(obj).map(kv => { return { x: kv[0], y: kv[1] } })
  }
}

const CasesChart = (props) => {
  const { cases, deaths, recovered } = props;
  if (!cases || !deaths || !recovered) return (
    <StatPanel>
      <ActivityIndicator size='large' />
    </StatPanel>
  )
  const data = [].concat(transform('Cases', cases), transform('Deaths', deaths), transform('Recovered', recovered))
  return (
    <StatPanel>
      <Text>
      </Text>
    </StatPanel>
  );
}

export default CasesChart;
