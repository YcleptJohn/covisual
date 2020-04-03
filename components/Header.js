import React from 'react';
import { Alert, View, Text, TouchableHighlight } from 'react-native';
import styles from './Header.styles.js';
import CountrySelect from './CountrySelect.js';

const showAlert = (props) => {
  const specificCountry = !!props.currCountry
  const name = props.currCountry && props.currCountry.name
  Alert.alert(
    `Subscribe to ${specificCountry ? name : 'global'} stats`,
    `Would you like to receive an update each day on the stats for ${specificCountry ? name : 'the entire world'}?`,
    [
      {text: 'Yes', onPress: () => console.log('todo: add notification subscription')},
      {text: 'No', onPress: () => console.log('todo: absolutely nothing'), style: 'cancel'},
    ],
    { cancelable: true }
  )
}

const Header = props => {
  return (
    <View style={styles.body}>
      <CountrySelect
        currCountryCode={props.currCountryCode}
        onSelect={props.onCountrySelect}
        clearCountry={props.clearCountry}
      />
      <Text style={styles.title}>Covisual</Text>
      <TouchableHighlight onPress={() => showAlert(props)}>
        <Text style={styles.notificationLink}>🔔</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Header;
