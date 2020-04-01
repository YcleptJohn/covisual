import React from 'react';
import Page from './Page.js';
import Header from '../components/Header.js';
import {Text} from 'react-native';
import * as statusConstants from '../lib/statusConstants.js';

import emojiFlags from 'emoji-flags';

const byCountryEndpoint = 'https://corona.lmao.ninja/countries/';
const globalEndpoint = 'https://corona.lmao.ninja/all';

class OverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchStatus: statusConstants.PENDING,
      target: null,
      data: null,
    };

    this.setCountry = this.setCountry.bind(this);
    this.clearCountry = this.clearCountry.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData(countryCode) {
    this.setState({fetchStatus: statusConstants.IN_PROGRESS});
    let data;
    try {
      const result = await fetch(
        countryCode ? `${byCountryEndpoint}${countryCode}` : globalEndpoint,
      );
      data = await result.json();
    } catch (e) {
      console.log('fetch failed?', e);
      return this.setState({
        fetchStatus: statusConstants.COMPLETED_ERRONEOUSLY,
      });
    }
    this.setState({
      data,
      fetchStatus: statusConstants.COMPLETED_SUCCESSFULLY,
    });
  }

  setCountry(country) {
    this.setState({
      target: {
        countryCode: country.cca2,
        country,
      },
    });
    this.fetchData(country.cca2);
  }

  clearCountry() {
    this.setState({target: null});
    this.fetchData();
  }

  render() {
    return (
      <Page>
        <Header
          currCountryCode={this.state.target && this.state.target.countryCode}
          onCountrySelect={this.setCountry}
          clearCountry={this.clearCountry}
          modalProps={{
            visible: this.state.visible,
          }}
          onClose={() => this.setState({visible: false})}
          onOpen={() => this.setState({visible: true})}
        />
        <Text>{JSON.stringify(this.state.target, null, 2)}</Text>
        <Text
          onPress={() => this.setState({visible: true})}
          style={{fontSize: 50}}>
          {(this.state.target &&
            this.state.target.countryCode &&
            emojiFlags.countryCode(this.state.target.countryCode).emoji) ||
            'no-selected'}
        </Text>
      </Page>
    );
  }
}

export default OverviewPage;
