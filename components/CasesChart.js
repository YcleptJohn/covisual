import React from 'react';
import StatPanel from './StatPanel.js';
import { Text, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import moment from 'moment';
import 'moment-timezone';

import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
import {padding} from '../styles/base.js';

const transform1 = (obj, colour) => {
  const colours = {
    c: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    d: (opacity = 1) => `rgba(255,0,0, ${opacity})`,
    r: (opacity = 1) => `rgba(0,255,0, ${opacity})`
  }
  return {
    data: Object.values(obj),
    color: colours[colour]
  }
}

const makeBase = (obj) => {
  const keys = Object.keys(obj)
  return {
    // labels: [Object.keys(obj)[0], Object.keys(obj)[Object.keys(obj).length-1]],
    labels: [...new Set([].concat(keys.filter((_x, i) => i % 4 === 0), keys[keys.length - 1]))],
    datasets: [],
    legend: ['Cases', 'Deaths', 'Recovered']
  }
}

const formatYLabel = (y) => {
  y = parseInt(y)
  return y.toLocaleString().split(',')[0] + 'B'
}

const formatXLabel = (x) => {
  const date = moment(x, 'MM-DD-YY');
  return date.format('Do MMM');
}

const CasesChart = (props) => {
  const { cases, deaths, recovered } = props;
  if (!cases || !deaths || !recovered) return (
    <StatPanel>
      <ActivityIndicator size='large' />
    </StatPanel>
  )
  let base = makeBase(cases)
  const datasets = [].concat(transform1(cases, 'c'), transform1(deaths, 'd'), transform1(recovered, 'r'))
  base.datasets = datasets
  const chartConfig = {
    backgroundGradientFrom: "#e5e6eb",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#e5e6eb",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(20, 20, 20, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5
  };
  return (
    <StatPanel>
      <LineChart
        data={base}
        width={screenWidth - (padding.sm * 2)}
        height={screenHeight / 3}
        chartConfig={chartConfig}
        verticalLabelRotation={-70}
        xLabelsOffset={30}
        formatYLabel={formatYLabel}
        formatXLabel={formatXLabel}
        segments={6}
      />
    </StatPanel>
  );
}

export default CasesChart;
