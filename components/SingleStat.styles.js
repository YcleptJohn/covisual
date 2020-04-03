import { StyleSheet } from 'react-native';
import { colours } from '../styles/base.js';

export default StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  value: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10
  },
  noReports: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    color: 'green'
  },
  suffix: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 3,
    color: colours.primary
  }
});