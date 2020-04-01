import React from 'react';
import {ScrollView, View} from 'react-native';
import StatusBar from '../components/StatusBar.js';
import styles from './Page.styles.js';
import {colours} from '../styles/base.js';

const Page = props => {
  const ThisView = props.scrollable ? ScrollView : View;
  return (
    <>
      <StatusBar
        backgroundColor={colours.statusBarBg}
        barStyle="light-content"
      />
      <ThisView style={styles.body} contentInsetAdjustmentBehavior="automatic">
        {props.children}
      </ThisView>
    </>
  );
};

export default Page;
