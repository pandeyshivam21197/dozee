import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BoldText, SemiBold1431} from '../../atoms/text';
import Icon from '../../atoms/icon';

export default function HealthCard(props) {
  const {heading, value, unit, icon} = props;

  if (!value) {
    return null;
  }

  const isValueObject = typeof value === 'object';
  let value1 = 0;
  let value2 = 0;

  if (isValueObject) {
    const [v1, v2] = Object.values(value);
    value1 = v1;
    value2 = v2;
  }

  return (
    <View style={styles.container}>
      <View styles={styles.heading}>
        <SemiBold1431>{heading}</SemiBold1431>
        <Icon size={16} name="play-circle-filled" />
      </View>
      {isValueObject ? (
        <>
          <View styles={styles.heading}>
            <Icon size={16} name="arrow-drop-up" />
            <SemiBold1431>{value1}</SemiBold1431>
          </View>
          <View styles={styles.heading}>
            <Icon size={16} name="arrow-drop-down" />
            <SemiBold1431>{value2}</SemiBold1431>
          </View>
        </>
      ) : (
        <BoldText style={styles.value} fontSize={52}>
          {value}
        </BoldText>
      )}
      <View styles={styles.heading}>
        <Icon size={26} name={icon} />
        <SemiBold1431>{unit}</SemiBold1431>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    paddingVertical: 11,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  value: {
    alignSelf: 'flex-end',
  },
});
