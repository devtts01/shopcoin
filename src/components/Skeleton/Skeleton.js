/* eslint-disable prettier/prettier */
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function Skeleton({
  width = 50,
  height = 17,
  marginTop = 6,
  borderRadius = 4,
  backgroundColor = '#ededed',
}) {
  return (
    <SkeletonPlaceholder.Item
      marginTop={marginTop}
      width={width}
      height={height}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
    />
  );
}
