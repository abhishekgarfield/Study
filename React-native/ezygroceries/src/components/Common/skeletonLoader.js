import React from 'react';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import { View, StyleSheet } from 'react-native';
import { fadedBlack, white } from './colors';

const ItemSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <ContentLoader
        speed={2}
        width={375}
        style={{display:'flex'}}
        height={90}
        viewBox="0 0 375 90"
        backgroundColor="white"
        foregroundColor={'#D3D3D3'}
      >
        <Circle cx="45" cy="55" r="30" />
        <Rect x="90" y="20" rx="5" ry="5" width="250" height="15" />
        <Rect x="90" y="45" rx="5" ry="5" width="200" height="10" />
        <Rect x="90" y="65" rx="5" ry="5" width="150" height="10" />
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
