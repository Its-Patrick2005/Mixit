import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useTheme } from '../theme.jsx';

const GroceryMap = ({ visible, onClose, recipeName }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nearbyStores, setNearbyStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const mapRef = useRef(null);
  const { theme } = useTheme();

  // Sample grocery store data (in a real app, you'd use Google Places API)
  const sampleStores = [
    {
      id: 1,
      name: "Fresh Market",
      type: "Supermarket",
      distance: "0.3 km",
      rating: 4.5,
      address: "123 Main Street",
      coordinates: { latitude: 37.78825, longitude: -122.4324 },
      open: true,
      hours: "7:00 AM - 10:00 PM"
    },
    {
      id: 2,
      name: "Organic Grocery",
      type: "Organic Store",
      distance: "0.7 km",
      rating: 4.8,
      address: "456 Oak Avenue",
      coordinates: { latitude: 37.78925, longitude: -122.4334 },
      open: true,
      hours: "8:00 AM - 9:00 PM"
    },
    {
      id: 3,
      name: "Local Mart",
      type: "Convenience Store",
      distance: "1.2 km",
      rating: 4.2,
      address: "789 Pine Road",
      coordinates: { latitude: 37.78725, longitude: -122.4314 },
      open: false,
      hours: "6:00 AM - 11:00 PM"
    },
    {
      id: 4,
      name: "Farm Fresh",
      type: "Farmers Market",
      distance: "1.8 km",
      rating: 4.7,
      address: "321 Market Street",
      coordinates: { latitude: 37.79025, longitude: -122.4344 },
      open: true,
      hours: "6:00 AM - 8:00 PM"
    }
  ];

  useEffect(() => {
    if (visible) {
      // Set stores immediately with default coordinates
      setNearbyStores(sampleStores);
      // Get location in background (non-blocking)
      getCurrentLocation();
    }
  }, [visible]);

  const getCurrentLocation = async () => {
    try {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get current location
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Update current region to focus on user location
      const newRegion = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setCurrentRegion(newRegion);

      // Animate map to user location
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }

      // Update store coordinates based on user location
      const storesWithCoordinates = sampleStores.map((store, index) => ({
        ...store,
        coordinates: {
          latitude: currentLocation.coords.latitude + (Math.random() - 0.5) * 0.01,
          longitude: currentLocation.coords.longitude + (Math.random() - 0.5) * 0.01,
        }
      }));

      setNearbyStores(storesWithCoordinates);
    } catch (error) {
      console.log('Error getting location:', error);
      setErrorMsg('Could not get your location');
    }
  };

  const handleStorePress = (store) => {
    setSelectedStore(store);
  };

  const getDirections = (store) => {
    if (!location) {
      Alert.alert("Location Required", "Please allow location access to get directions.");
      return;
    }

    // Generate route coordinates (in a real app, you'd use Google Directions API)
    const startPoint = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    
    const endPoint = store.coordinates;
    
    // Create a simple route with waypoints (in real app, this would come from Directions API)
    const routePoints = [
      startPoint,
      {
        latitude: (startPoint.latitude + endPoint.latitude) / 2 + 0.001,
        longitude: (startPoint.longitude + endPoint.longitude) / 2 + 0.001,
      },
      {
        latitude: (startPoint.latitude + endPoint.latitude) / 2 - 0.001,
        longitude: (startPoint.longitude + endPoint.longitude) / 2 - 0.001,
      },
      endPoint
    ];
    
    setRouteCoordinates(routePoints);
    setSelectedStore(store);
    setShowDirections(true);
    
    // Fit map to show entire route
    if (mapRef.current) {
      mapRef.current.fitToCoordinates(routePoints, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
    
    Alert.alert(
      "Directions Active",
      `Showing route to ${store.name}. Tap 'Clear Route' to remove directions.`,
      [{ text: "OK" }]
    );
  };

  const clearDirections = () => {
    setRouteCoordinates([]);
    setSelectedStore(null);
    setShowDirections(false);
  };

  const getStoreIcon = (storeType) => {
    switch (storeType) {
      case 'Supermarket':
        return 'storefront';
      case 'Organic Store':
        return 'leaf';
      case 'Convenience Store':
        return 'basket';
      case 'Farmers Market':
        return 'flower';
      default:
        return 'storefront';
    }
  };

  const focusOnUserLocation = () => {
    if (location) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setCurrentRegion(newRegion);
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    } else {
      // If no location yet, try to get it
      getCurrentLocation();
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.primaryBackground }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.secondaryBackground, borderBottomColor: theme.borderLight }]}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryGreen} />
            <Text style={[styles.backText, { color: theme.primaryGreen }]}>Back</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.primaryText }]}>Nearby Stores</Text>
          <TouchableOpacity onPress={getCurrentLocation} style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color={theme.primaryGreen} />
          </TouchableOpacity>
        </View>

        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Ionicons name="location-off" size={48} color={theme.error} />
            <Text style={[styles.errorText, { color: theme.secondaryText }]}>{errorMsg}</Text>
            <TouchableOpacity onPress={getCurrentLocation} style={[styles.retryButton, { backgroundColor: theme.primaryGreen }]}>
              <Text style={[styles.retryText, { color: theme.inverseText }]}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Map */}
            <MapView
              ref={mapRef}
              style={styles.map}
              initialRegion={currentRegion}
              region={currentRegion}
              showsUserLocation={true}
              showsMyLocationButton={false}
              onRegionChangeComplete={setCurrentRegion}
            >
              {/* User location marker */}
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Your Location"
                  description="You are here"
                  pinColor={theme.primaryGreen}
                />
              )}

              {/* Store markers */}
              {nearbyStores.map((store) => (
                <Marker
                  key={store.id}
                  coordinate={store.coordinates}
                  title={store.name}
                  description={`${store.type} • ${store.distance}`}
                  onPress={() => handleStorePress(store)}
                >
                  <View style={styles.markerContainer}>
                    <View style={[styles.marker, { backgroundColor: store.open ? theme.primaryGreen : theme.error }]}>
                      <Ionicons 
                        name={getStoreIcon(store.type)} 
                        size={16} 
                        color="white" 
                      />
                    </View>
                  </View>
                </Marker>
              ))}

              {/* Route polyline */}
              {routeCoordinates.length > 0 && (
                <Polyline
                  coordinates={routeCoordinates}
                  strokeColor={theme.routeColor}
                  strokeWidth={4}
                  lineDashPattern={[1]}
                />
              )}
            </MapView>

            {/* Location Focus Button */}
            <TouchableOpacity
              style={[styles.locationButton, { backgroundColor: theme.secondaryBackground, shadowColor: theme.shadow }]}
              onPress={focusOnUserLocation}
            >
              <Ionicons name="locate" size={24} color={theme.primaryGreen} />
            </TouchableOpacity>

            {/* Store List */}
            <View style={[styles.storeList, { backgroundColor: theme.secondaryBackground }]}>
              <Text style={[styles.listTitle, { color: theme.primaryText }]}>Stores near you</Text>
              {nearbyStores.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  style={[
                    styles.storeItem, 
                    { 
                      backgroundColor: selectedStore?.id === store.id ? theme.lightGreen : theme.tertiaryBackground,
                      borderColor: selectedStore?.id === store.id ? theme.primaryGreen : theme.borderLight,
                    }
                  ]}
                  onPress={() => handleStorePress(store)}
                >
                  <View style={styles.storeInfo}>
                    <View style={styles.storeHeader}>
                      <Text style={[styles.storeName, { color: theme.primaryText }]}>{store.name}</Text>
                      <View style={[styles.statusBadge, { backgroundColor: store.open ? theme.lightGreen : '#ffe6e6' }]}>
                        <Text style={[styles.statusText, { color: store.open ? theme.primaryGreen : theme.error }]}>
                          {store.open ? 'Open' : 'Closed'}
                        </Text>
                      </View>
                    </View>
                    <Text style={[styles.storeType, { color: theme.secondaryText }]}>{store.type}</Text>
                    <View style={styles.storeDetails}>
                      <Text style={[styles.storeDistance, { color: theme.primaryGreen }]}>{store.distance}</Text>
                      <Text style={[styles.storeRating, { color: theme.secondaryText }]}>⭐ {store.rating}</Text>
                    </View>
                    <Text style={[styles.storeAddress, { color: theme.tertiaryText }]}>{store.address}</Text>
                    <Text style={[styles.storeHours, { color: theme.tertiaryText }]}>{store.hours}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.directionsButton, 
                      { 
                        backgroundColor: showDirections && selectedStore?.id === store.id ? '#ffe6e6' : theme.lightGreen,
                        borderColor: showDirections && selectedStore?.id === store.id ? theme.error : theme.primaryGreen,
                      }
                    ]}
                    onPress={() => showDirections && selectedStore?.id === store.id ? clearDirections() : getDirections(store)}
                  >
                    <Ionicons 
                      name={showDirections && selectedStore?.id === store.id ? "close-circle" : "navigate"} 
                      size={20} 
                      color={showDirections && selectedStore?.id === store.id ? theme.error : theme.primaryGreen} 
                    />
                    <Text style={[
                      styles.directionsText, 
                      { color: showDirections && selectedStore?.id === store.id ? theme.error : theme.primaryGreen }
                    ]}>
                      {showDirections && selectedStore?.id === store.id ? "Clear Route" : "Directions"}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9ECD9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#008000',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003A00',
  },
  refreshButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: '#008000',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  map: {
    flex: 1,
    height: Dimensions.get('window').height * 0.4,
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storeList: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100,
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003A00',
    marginBottom: 16,
  },
  storeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  selectedStore: {
    backgroundColor: '#e8f5e8',
    borderColor: '#008000',
  },
  storeInfo: {
    flex: 1,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003A00',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  storeType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  storeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeDistance: {
    fontSize: 14,
    color: '#008000',
    fontWeight: 'bold',
    marginRight: 12,
  },
  storeRating: {
    fontSize: 14,
    color: '#666',
  },
  storeAddress: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  storeHours: {
    fontSize: 12,
    color: '#888',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#008000',
  },
  directionsText: {
    color: '#008000',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  clearRouteButton: {
    backgroundColor: '#ffe6e6',
    borderColor: '#ff6b6b',
  },
  clearRouteText: {
    color: '#ff6b6b',
  },
  locationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default GroceryMap; 
