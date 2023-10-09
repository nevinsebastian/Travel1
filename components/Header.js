import React from 'react';
import { View,Text, TextInput, StyleSheet } from 'react-native';

export const HeaderTitle = () => {
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerText}>Home</Text>
    </View>
  );
};

export const HeaderRight = () => {
  return (
    <View style={styles.headerRight}>
      <TextInput
        placeholder="Search"
        style={styles.searchInput}
        placeholderTextColor="#ccc"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 16,
  },
  searchInput: {
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
});
