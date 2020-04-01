import {StyleSheet} from 'react-native';
import {padding, colours} from '../styles/base.js';

export default StyleSheet.create({
  body: {
    backgroundColor: colours.primary,
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: padding.sm,
    paddingRight: padding.sm,
  },
});
