import React, {useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';

const defaultRoutes = [
  {key: 'first', title: 'First'},
  {key: 'second', title: 'Second'},
];

export default function Tab(props) {
  const {tabRoutes = defaultRoutes} = props;

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = React.useState(tabRoutes);

  const scenes = {};

  tabRoutes.forEach(route => {
    const {title, key} = route;

    scenes[key] = () => <View style={{flex: 1, backgroundColor: 'red'}} />;
  });

  const renderScene = SceneMap(scenes);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
