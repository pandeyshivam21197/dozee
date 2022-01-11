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
  ActivityIndicator,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SemiBold1840} from './components/atoms/text';

import Header from './components/molecules/header';
import HealthCard from './components/molecules/healthCard';
import Tab from './components/molecules/tab';
import {ApiClient} from './network/client';
import {tabKeys} from './utils/constants';
import {getDWMprocessedData, getSectionProcessedData} from './utils/data';

function App() {
  const [userData, setUserData] = useState(null);
  const [tabName, setTabName] = useState(tabKeys[0]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const {data} = await ApiClient.get('/api/user/data/');
      const processedData = getDWMprocessedData(data);

      setUserData(processedData);
    };

    fetchUserData();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if (!userData) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const hasTabData = Object.keys(userData[tabName]).length > 0;
  const tabData = hasTabData ? userData[tabName] : userData[tabKeys[0]];

  const selectedKeyFromScroll = Object.keys(tabData)[scrollIndex];
  const sectionData = getSectionProcessedData(tabData[selectedKeyFromScroll]);

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
        onTabChange={index => {
          setTabName(tabKeys[index]);
        }}
      />
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => {
          return <HealthCard heading={item.heading} value={item.value} />;
        }}
        renderSectionHeader={({section: {title}}) => (
          <SemiBold1840>{title}</SemiBold1840>
        )}
        ItemSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionSeparator: {
    width: 24,
  },
});

export default App;
