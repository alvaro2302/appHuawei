import React from 'react';
import { View, StyleSheet } from 'react-native';
import HMSMap, { MapTypes,HMSMarker } from "@hmscore/react-native-hms-map";

const MapScreen = () => {
  return (
    <View>
      <HMSMap
        mapType={MapTypes.NORMAL}
        style={{ height: '100%' }}
        camera={{ target: { latitude: 10, longitude: 55,}, zoom: 11 }}>
        <HMSMarker
          coordinate={{ latitude: 57, longitude: 22 }}
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
