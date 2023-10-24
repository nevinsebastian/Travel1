import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="home" size={30} />
        <Text style={styles.footerOption}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="bookmark" size={30} />
        <Text style={styles.footerOption}>Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="pricetag" size={30} />
        <Text style={styles.footerOption}>Offers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionContainer}>
        <Ionicons name="person" size={30} />
        <Text style={styles.footerOption}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8, // Add elevation for a shadow effect (Android only)
  },
  optionContainer: {
    alignItems: 'center',
  },
  footerOption: {
    fontSize: 16,
  },
});

export default Footer;
