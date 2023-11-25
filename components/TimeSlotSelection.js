import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TimeSlotSelection = ({ route }) => {
  const { program, selectedDate, guests } = route.params;
  const navigation = useNavigation();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const handleTimeSlotPress = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmPress = () => {
    // You can add logic to handle the selected time slot, and proceed with the booking
    // For now, it will navigate back to the BookingScreen
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select a Time Slot</Text>

      {/* Assume these are your available time slots */}
      <TouchableOpacity
        style={[styles.timeSlotButton, selectedTimeSlot === '10:00 AM' && styles.selectedTimeSlot]}
        onPress={() => handleTimeSlotPress('10:00 AM')}
      >
        <Text>10:00 AM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.timeSlotButton, selectedTimeSlot === '02:00 PM' && styles.selectedTimeSlot]}
        onPress={() => handleTimeSlotPress('02:00 PM')}
      >
        <Text>02:00 PM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.timeSlotButton, selectedTimeSlot === '05:00 PM' && styles.selectedTimeSlot]}
        onPress={() => handleTimeSlotPress('05:00 PM')}
      >
        <Text>05:00 PM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPress}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeSlotButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimeSlotSelection;
