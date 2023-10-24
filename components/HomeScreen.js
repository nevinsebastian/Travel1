import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Footer from './Footer';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activityData, setActivityData] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    axios.get('http://192.168.29.198:8000/listactivity/activities/')
      .then((response) => {
        setActivityData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleTilePress = (activity) => {
    navigation.navigate('Booking', { program: activity });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.hamburger}>
          <Ionicons name="ios-menu" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <Text>Search Bar</Text>
        </View>
      </View>

      <Text style={styles.sectionHeading}>Activities</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {activityData.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleTilePress(item)}
          >
            <View style={styles.tileContainer}>
              <Image source={{ uri: item.image_url }} style={styles.tileImage} />
              <Text style={styles.tileDescription}>{item.name}</Text>
              <Text style={styles.tilePrice}>{`₹${item.price}`}</Text>
              <Text style={styles.tileLocation}>{item.location}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.introductoryOffersTitle}>Introductory Offers</Text>

      <View style={styles.posterContainer}>
        <Image source={require('../assets/poster3.jpeg')} style={styles.posterImage} />
      </View>

      <Footer navigation={navigation} />
    </View>
  );
}

const TILE_SIZE = 180;

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
    backgroundColor: 'white',
    zIndex: 1,
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
  tileContainer: {
    width: TILE_SIZE,
    marginRight: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom:'0%'
  },
  tileImage: {
    width: TILE_SIZE,
    height: TILE_SIZE * 0.75,
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
  posterContainer: {
    alignItems: 'center',
    marginTop: 0,
  },
  posterImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  introductoryOffersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    marginTop: 20,
  },
});

export default HomeScreen;
