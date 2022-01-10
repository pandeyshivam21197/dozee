import React from 'react';
import {Text} from 'react-native';
import {FONTS} from '../../../theme/fonts';

export function SemiBold1022({children, ...rest}) {
  return (
    <Text fontFamily={FONTS.SemiBold} fontSize={10} lineHeight={22} {...rest}>
      {children}
    </Text>
  );
}

export function SemiBold1431({children, ...rest}) {
  return (
    <Text fontFamily={FONTS.SemiBold} fontSize={14} lineHeight={31} {...rest}>
      {children}
    </Text>
  );
}

export function SemiBold1840({children, ...rest}) {
  return (
    <Text fontFamily={FONTS.SemiBold} fontSize={18} lineHeight={40} {...rest}>
      {children}
    </Text>
  );
}
