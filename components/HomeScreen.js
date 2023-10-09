import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons library for the hamburger icon
import { useNavigation } from '@react-navigation/native'; // Import the hook to access navigation

// Define your tile data
const tileData = [
  {
    id: '1',
    imageSource: require('../assets/image1.jpg'),
    description: 'Beautiful Scenery',
    price: '$100',
    location: 'City, Country',
    isOffer: false,
  },
  {
    id: '2',
    imageSource: require('../assets/image2.jpg'),
    description: 'Cozy Cabin',
    price: '$200',
    location: 'Mountain, Country',
    isOffer: false,
  },
  {
    id: '3',
    imageSource: require('../assets/image3.jpg'),
    description: 'kayak',
    price: '$200',
    location: 'Mountain, Country',
    isOffer: false,
  },
  {
    id: '4',
    imageSource: require('../assets/image4.jpg'),
    description: 'sky dive',
    price: '$200',
    location: 'Mountain, Country',
    isOffer: true,  
  },
  {
    id: '5',
    imageSource: require('../assets/image5.jpg'),
    description: 'ski',
    price: '$200',
    location: 'Mountain, Country',
    isOffer: true,
  },
  // Add your offer tiles below
  // Add more offer objects as needed
];

const Tile = ({ item }) => {
  return (
    <View style={styles.tileContainer}>
      <Image source={item.imageSource} style={styles.tileImage} />
      <Text style={styles.tileDescription}>{item.description}</Text>
      <Text style={styles.tilePrice}>{item.price}</Text>
      <Text style={styles.tileLocation}>{item.location}</Text>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation(); // Get navigation object using the hook

  const handleTilePress = (program) => {
    // Navigate to the BookingScreen and pass program details as a parameter
    navigation.navigate('Booking', { program });
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        {/* Hamburger Menu Icon */}
        <TouchableOpacity style={styles.hamburger}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </TouchableOpacity>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          {/* Add your search bar component here */}
          <Text>Search Bar</Text>
        </View>
      </View>
      
      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent}>
        {/* Offer Section */}
        <View style={styles.spacer}>
          <Text style={styles.sectionHeading}>Offer</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              data={tileData.filter(item => item.isOffer)}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleTilePress(item)}>
                  <Tile item={item} />
                </TouchableOpacity>
              )}
            />
          </ScrollView>
        </View>
        
        {/* Activities Section */}
        <Text style={styles.sectionHeading}>Activities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={tileData.filter(item => !item.isOffer)}
            keyExtractor={(item) => item.id}
            horizontal
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleTilePress(item)}>
                <Tile item={item} />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        
        {/* Posteddddddr of Offers */}
        <View style={styles.posterContainer}>
          <Image source={require('../assets/travel1.jpg')} style={styles.posterImage} />
        </View>
      </ScrollView>
    </View>
  );
};

const TILE_SIZE = 180; // Adjust tile size as needed

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white', // Background color for the fixed header
    zIndex: 1, // Ensure the header stays above the scrollable content
  },
  hamburger: {
    marginRight: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFEFEF',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  scrollContent: {
    flex: 1,
    marginTop: -20, // Offset to account for the fixed header
    paddingTop: 20, // Add padding to avoid content being hidden under the fixed header
  },
  tileContainer: {
    width: TILE_SIZE, // Set the width of the tile
    marginRight: 10,
    paddingLeft: 5, // Add left padding to move text to the left
    paddingRight: 5, // Add right padding for balance
  },
  tileImage: {
    width: TILE_SIZE, // Set the width of the image
    height: TILE_SIZE * 0.75, // Adjust height to maintain aspect ratio
    borderRadius: 8,
    marginBottom: 5,
  },
  tileDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tilePrice: {
    fontSize: 14,
  },
  tileLocation: {
    fontSize: 12,
  },
  spacer: {
    marginBottom: 20,
  },
  posterContainer: {
    alignItems: 'center',
    marginTop: 20, // Adjust the margin to your preference
  },
  posterImage: {
    width: '90%', // Adjust the width to your preference
    height: 200, // Adjust the height to your preference
    resizeMode: 'cover',
    borderRadius: 8,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10, // Adjust the marginLeft to move the heading to the right
  },
});

export default HomeScreen;
