import React from 'react';
import { View, StyleSheet } from 'react-native';
import HMSMap, { MapTypes,HMSMarker } from "@hmscore/react-native-hms-map";

const hideLoadingScreen = () => {
  console.log('MAP LOADING ENDED');
}

const MapScreen = () => {
  return (
    <View>
      <HMSMap
        onMapReady={hideLoadingScreen}
        mapType={MapTypes.NORMAL}
        style={{ height: '100%' }}
        camera={{ target: { latitude: -17.413977, longitude: -66.165321 }, zoom: 12 }}>
        <HMSMarker
          coordinate={{ latitude: -17.413977, longitude: -66.165321 }}
          title="Hello Huawei Map"
          snippet="This is a snippet!"
        />
      </HMSMap>
    </View>
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

export default MapScreen;
