import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {Text, View, TouchableHighlight} from 'react-native';
import styles from './CountrySelect.styles.js';
import emojiFlags from 'emoji-flags';

class CountrySelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <View style={styles.body}>
        <TouchableHighlight>
          <Text
            style={styles.countryPickerText}
            onPress={() => this.setState({visible: true})}>
            {this.props.currCountryCode
              ? emojiFlags.countryCode(this.props.currCountryCode).emoji
              : '🌍'}
          </Text>
        </TouchableHighlight>
        {this.props.currCountryCode && (
          <TouchableHighlight onPress={this.props.clearCountry}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableHighlight>
        )}
        <View style={styles.hidePickerWrapper}>
          <CountryPicker
            withEmoji={true}
            withFlagButton={false}
            withFilter={true}
            withAlphaFilter={true}
            withFlag={true}
            placeholder={''}
            onSelect={this.props.onSelect}
            countryCode={this.props.currCountryCode}
            modalProps={{
              visible: this.state.visible || false,
            }}
            onOpen={() => this.setState({visible: true})}
            onClose={() => this.setState({visible: false})}
          />
        </View>
      </View>
    );
  }
}

export default CountrySelect;
