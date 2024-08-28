import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';
import { fadedBlack, white } from './colors';

const { width: deviceWidth } = Dimensions.get('window');

const ItemSkeletonLoader = () => {
  // Calculate the width of the Rect components, considering padding and margins
  const rectWidth = deviceWidth - 34; // 17 margin left + 17 margin right

  return (
    <View style={styles.container}>
      <ContentLoader
        speed={2}
        width={deviceWidth - 34} // Adjust width dynamically
        height={90}
        viewBox={`0 0 ${deviceWidth - 34} 90`}
        backgroundColor={white}
        foregroundColor={'#D3D3D3'}
      >
        <Circle cx="45" cy="55" r="30" />
        <Rect x="90" y="20" rx="5" ry="5" width={rectWidth - 100} height="15" />
        <Rect x="90" y="45" rx="5" ry="5" width={rectWidth - 150} height="10" />
        <Rect x="90" y="65" rx="5" ry="5" width={rectWidth - 200} height="10" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginHorizontal: 17,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ItemSkeletonLoader;
