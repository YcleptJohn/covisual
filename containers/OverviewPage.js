import React from 'react';
import Page from './Page.js';
import Header from '../components/Header.js';
import { ScrollView, View, Text, RefreshControl } from 'react-native';
import * as statusConstants from '../lib/statusConstants.js';
import styles from './OverviewPage.styles.js';
import LastUpdatedText from '../components/LastUpdatedText.js';
import SingleStat from '../components/SingleStat.js';
import CasesChart from '../components/CasesChart.js';

const byCountryEndpoint = 'https://corona.lmao.ninja/countries/';
const globalEndpoint = 'https://corona.lmao.ninja/all';
const historicalEndpoint = 'https://corona.lmao.ninja/v2/historical/';

class OverviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchStatus: statusConstants.PENDING,
      target: null,
      data: null,
      hData: null,
      hFetchStatus: statusConstants.PENDING,
    };

    this.setCountry = this.setCountry.bind(this);
    this.clearCountry = this.clearCountry.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  // async fetchData(countryCode) {
  //   const isRefresh = countryCode === 'REFRESH'
  //   this.setState({
  //     fetchStatus: statusConstants.IN_PROGRESS,
  //     isRefresh
  //   });
  //   if (isRefresh) countryCode = this.state.target && this.state.target.countryCode;
  //   let data;
  //   try {
  //     const result = await fetch(
  //       countryCode ? `${byCountryEndpoint}${countryCode}` : globalEndpoint,
  //     );
  //     data = await result.json();
  //   } catch (e) {
  //     return this.setState({
  //       fetchStatus: statusConstants.COMPLETED_ERRONEOUSLY,
  //     });
  //   }
  //   this.setState({
  //     data,
  //     fetchStatus: statusConstants.COMPLETED_SUCCESSFULLY,
  //     isRefresh: null
  //   });
  // }

  async fetch(countryCode) {
    const target = this.state.target
    const isRefresh = countryCode === 'REFRESH'
    this.setState({
      fetchStatus: statusConstants.IN_PROGRESS,
      hFetchStatus: statusConstants.IN_PROGRESS,
      isRefresh
    })
    if (isRefresh) countryCode = target && target.countryCode
    await this.fetchBasicData(countryCode)
    await this.fetchHistoricalData(countryCode)
    this.setState({ isRefresh: null })
  }

  async fetchBasicData(countryCode) {
    let data;
    try {
      const result = await fetch(
        countryCode ? `${byCountryEndpoint}${countryCode}` : globalEndpoint
      );
      data = await result.json()
    } catch (e) {
      return this.setState({
        fetchStatus: statusConstants.COMPLETED_ERRONEOUSLY
      });
    }
    this.setState({
      data,
      fetchStatus: statusConstants.COMPLETED_SUCCESSFULLY
    });
  }

  async fetchHistoricalData(countryCode) {
    if (!countryCode) return this.setState({
      hData: null,
      hFetchStatus: statusConstants.COMPLETED_ERRONEOUSLY
    })
    let hData;
    try {
      const result = await fetch(`${historicalEndpoint}${countryCode}`)
      hData = await result.json()
    } catch (e) {
      return this.setState({
        hFetchStatus: statusConstants.COMPLETED_ERRONEOUSLY
      });
    }
    this.setState({
      hFetchStatus: statusConstants.COMPLETED_SUCCESSFULLY
    });
    this.pruneHistoricalData(hData);
  }

  pruneHistoricalData(hData) {
    // Remove the initial days where the country had zero cases
    for (let kv of Object.entries(hData.timeline.cases)) {
      if (kv[1] === 0) {
        delete hData.timeline.cases[kv[0]]
        delete hData.timeline.deaths[kv[0]]
        delete hData.timeline.recovered[kv[0]]
      } else {
        break;
      }
    }
    this.setState({ hData })
  }

  setCountry(country) {
    this.setState({
      target: {
        countryCode: country.cca2,
        country,
      },
    });
    this.fetch(country.cca2);
  }

  clearCountry() {
    this.setState({target: null});
    this.fetch();
  }

  render() {
    const { target, fetchStatus, visible, data, hData, isRefresh } = this.state
    const isLoading = fetchStatus === statusConstants.IN_PROGRESS
    return (
      <Page>
        <Header
          currCountryCode={target && target.countryCode}
          currCountry={target && target.country}
          onCountrySelect={this.setCountry}
          clearCountry={this.clearCountry}
          modalProps={{
            visible,
          }}
          onClose={() => this.setState({ visible: false })}
          onOpen={() => this.setState({ visible: true })}
        />
        <ScrollView 
          style={styles.body}
          refreshControl={
            <RefreshControl 
              refreshing={isRefresh && fetchStatus === statusConstants.IN_PROGRESS}
              onRefresh={() => this.fetch('REFRESH')}
            />
          }
        >
          <View style={styles.countryLabelContainer}>
            <Text style={styles.countryLabelText}>
              {target && target.country && target.country.name
              ? target.country.name
              : 'Global' }
              &nbsp;statistics
            </Text>
            {data && data.updated && <LastUpdatedText time={data.updated}/>}
          </View>
          <View style={styles.multipanelRow}>
            <SingleStat 
              label={'Total Cases'}
              value={data && data.cases}
              suffix={data && data.casesPerOneMillion && `Per million people: ${data.casesPerOneMillion}`}
              isLoading={isLoading} />
            <SingleStat
              label={'Deaths'}
              value={data && data.deaths}
              suffix={data && data.deathsPerOneMillion && `Per million people: ${data.deathsPerOneMillion}`}
              isLoading={isLoading} />
          </View>
          <View style={styles.multipanelRow}>
            <SingleStat label={'Active Cases'} value={data && data.active} isLoading={isLoading} />
            <SingleStat label={'Recovered'} value={data && data.recovered} isLoading={isLoading} />
          </View>
          <CasesChart 
            cases={hData && hData.timeline && hData.timeline.cases}
            deaths={hData && hData.timeline && hData.timeline.deaths}
            recovered={hData && hData.timeline && hData.timeline.recovered}
          />
          <Text>{JSON.stringify(this.state.data, null, 2)}</Text>
          <Text>{JSON.stringify(this.state.hData, null, 2)}</Text>
        </ScrollView>
      </Page>
    );
  }
}

export default OverviewPage;
