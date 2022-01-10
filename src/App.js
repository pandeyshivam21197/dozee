/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  SectionList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import Header from './components/molecules/header';
import Tab from './components/molecules/tab';
import {ApiClient} from './network/client';
import {getDWMprocessedData} from './utils/data';

// const DATA = [
//   {
//     title: 'Main dishes',
//     data: ['Pizza', 'Burger', 'Risotto'],
//   },
//   {
//     title: 'Sides',
//     data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
//   },
//   {
//     title: 'Drinks',
//     data: ['Water', 'Coke', 'Beer'],
//   },
//   {
//     title: 'Desserts',
//     data: ['Cheese Cake', 'Ice Cream'],
//   },
// ];

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      const {data} = await ApiClient.get('/api/user/data/');
      getDWMprocessedData(data);

      setUserData(data);
    };

    fetchUserData();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Header />
      <Tab
        tabRoutes={[
          {key: 'daily', title: 'Daily'},
          {key: 'weekly', title: 'Weekly'},
          {key: 'monthly', title: 'Monthly'},
        ]}
      />
      {/* <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <Item title={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      /> */}
      {/* <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}></ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
