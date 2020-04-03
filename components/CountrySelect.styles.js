import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  body: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    height: 56,
  },
  countryPickerText: {
    fontSize: 25
  },
  clearText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold'
  },
  hidePickerWrapper: {
    position: 'absolute',
    top: -20,
    left: 0
  }
});
