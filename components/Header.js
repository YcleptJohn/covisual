import React from 'react';
import {View, Text} from 'react-native';
import styles from './Header.styles.js';
import CountrySelect from './CountrySelect.js';

const Header = props => {
  return (
    <View style={styles.body}>
      <CountrySelect
        currCountryCode={props.currCountryCode}
        onSelect={props.onCountrySelect}
        clearCountry={props.clearCountry}
      />
      <Text>Covisual</Text>
      <Text>OTHER</Text>
    </View>
  );
};

export default Header;
