import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const TimeSlotSelection = ({ route }) => {
  const { activityId, selectedDate, guests } = route.params;
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    // Fetch available time slots based on the selected date and activity ID
    axios.get(`http://13.55.58.126:8000/book/available_time_slots/${activityId}`, {
      params: {
        selected_date: selectedDate,
      },
    })
      .then((response) => {
        setTimeSlots(response.data.available_time_slots);
      })
      .catch((error) => {
        console.error('Error fetching time slots:', error);
      });
  }, [activityId, selectedDate]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Available Time Slots</Text>
      {timeSlots.length === 0 ? (
        <Text>No available time slots for the selected date.</Text>
      ) : (
        <FlatList
          data={timeSlots}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.timeSlotItem}>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeSlotItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
});

export default TimeSlotSelection;
