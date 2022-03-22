import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
const { width } = Dimensions.get("window");
export function Maps() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    (async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      if (granted) {
        const { coords } = await getCurrentPositionAsync();
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      }
    })();
  }, []);
  const mapRef = useRef();
  return (
    <View style={styles.container}>
      <Text>Maps</Text>
      <MapView
        ref={mapRef}
        onMapReady={() => {
          mapRef.current.animateToRegion(
            {
              ...location,
              latitudeDelta: 5,
              longitudeDelta: 5,
            },
            2000
          );
        }}
        showsUserLocation={true}
        style={{ width, height: width }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
