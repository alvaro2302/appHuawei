import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HMSMap, { MapTypes,HMSMarker } from "@hmscore/react-native-hms-map";
import LocationService from '../../services/LocationService';

const hideLoadingScreen = () => {
  console.log('MAP LOADING ENDED');
}

const MapScreen = () => {
  const [locations, setLocations] = useState(null);

  const updateLocations = async () => {
    const markers = await LocationService.getLocations();
    setLocations(markers);
  }

  useEffect(async () => {
    console.log('Locations Updated');
    await updateLocations();
  }, []);
  
  if(!locations) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      <HMSMap
        onMapReady={hideLoadingScreen}
        mapType={MapTypes.NORMAL}
        style={{ height: '100%' }}
        camera={{ target: { latitude: -17.413977, longitude: -66.165321 }, zoom: 12 }}>
        {
          locations.map((prop, key) => {
            const lat = parseFloat(prop.get('lat'));
            const lng = parseFloat(prop.get('lng'));
            return <HMSMarker
              coordinate={{ latitude: lat, longitude: lng }}
              title="Hello Huawei Map"
              snippet="This is a snippet!"
              key={key}
            />;
          })
        }
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
