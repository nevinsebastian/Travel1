import React from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

export const HeaderTitle = () => {
  return (
    <View style={styles.headerTitle}>
      <SafeAreaView>
        <Text style={styles.headerText}>Home</Text>
      </SafeAreaView>
    </View>
  );
};

export const HeaderRight = () => {
  return (
    <View style={styles.headerRight}>
      <SafeAreaView>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#ccc"
        />
      </SafeAreaView>
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
