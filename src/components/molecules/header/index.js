import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from '../../atoms/icon';
import {SemiBold1431} from '../../atoms/text';

export default function Header(props) {
  return (
    <View style={styles.container}>
      <>
        <Icon name="account-circle" size={14} />
        <SemiBold1431 style={styles.headingText}>{'name'}</SemiBold1431>
        <Icon name="expand-more" size={14} onPress={() => {}} />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headingText: {
    marginHorizontal: 10,
  },
});
