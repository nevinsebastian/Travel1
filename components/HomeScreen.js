import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://192.168.29.198:8000/listactivity/activities/')
      .then((response) => {
        setActivityData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleTilePress = (activity) => {
    // Navigate to the BookingScreen and pass activity details as a parameter
    navigation.navigate('Booking', { program: activity });
  };

  const renderTile = ({ item }) => (
    <TouchableOpacity onPress={() => handleTilePress(item)}>
      <View style={styles.tileContainer}>
        <Image source={{ uri: item.image_url }} style={styles.tileImage} />
        <Text style={styles.tileDescription}>{item.name}</Text>
        <Text style={styles.tilePrice}>{`₹${item.price}`}</Text>
        <Text style={styles.tileLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburger}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Text>Search Bar</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        <Text style={styles.sectionHeading}>Activities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={activityData}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            renderItem={renderTile}
          />
        </ScrollView>

        <Text style={styles.introductoryOffersTitle}>Introductory Offers</Text>

        <View style={styles.posterContainer}>
          <Image source={require('../assets/offer2.jpeg')} style={styles.posterImage} />
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
    width: '100%', // Set the width to fill the container
    height: 'auto', // Let the height adjust automatically
    aspectRatio: 16 / 9, // Set the aspect ratio to maintain the image's proportions
    resizeMode: 'cover', // Maintain aspect ratio and cover the entire space
    borderRadius: 8,
  }
,  
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10, // Adjust the marginLeft to move the heading to the right
  },
  introductoryOffersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop:20
  },
});

export default HomeScreen;
