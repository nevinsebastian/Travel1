import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Linking } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const BookingScreen = ({ route }) => {
  const { program } = route.params;

  const handleViewMapPress = () => {
    const mapURL = 'https://maps.google.com'; // Replace with your map URL
    Linking.openURL(mapURL);
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleDatePicker = () => {
    setDatePickerVisible(!isDatePickerVisible);
  };

  const handleDatePickerDone = () => {
    toggleDatePicker();
  };

  const maxDate = moment().format('YYYY-MM-DD');

  const onDayPress = (day) => {
    const date = day.dateString;
    setMarkedDates({
      [date]: { selected: true, marked: true },
    });
    setSelectedDate(date);
  };

  const decrementGuests = () => {
    if (guests > 1) {
      setGuests(guests - 1);
    }
  };

  const incrementGuests = () => {
    setGuests(guests + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: program.image_url }} style={styles.programImage} />
      </View>

      <Text style={styles.programName}>{program.name}</Text>

      <Text style={styles.addressText}>{program.location}</Text>

      <Text style={styles.viewMapText} onPress={handleViewMapPress}>
        View on Map
      </Text>

      <View style={styles.bookingDetails}>
        <View style={styles.transparentTile}>
          <Text style={styles.bookingDetailsHeading}>Your Booking Details</Text>
          <View style={styles.bookingRow}>
            <FontAwesome5 name="calendar" size={20} color="#007AFF" style={styles.icon} />
            <Text style={styles.bookingLabel}>Date:</Text>
            <TouchableOpacity onPress={toggleDatePicker}>
              <Text style={styles.bookingValue}>
                {selectedDate ? moment(selectedDate).format('MMM DD, YYYY') : 'Select date'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bookingRow}>
            <FontAwesome5 name="user-friends" size={20} color="#007AFF" style={styles.icon} />
            <Text style={styles.bookingLabel}>Guests:</Text>
            <View style={styles.guestsControl}>
              <TouchableOpacity onPress={decrementGuests}>
                <FontAwesome5 name="minus" size={20} color="#007AFF" style={styles.guestControlIcon} />
              </TouchableOpacity>
              <Text style={styles.bookingValue}>{guests}</Text>
              <TouchableOpacity onPress={incrementGuests}>
                <FontAwesome5 name="plus" size={20} color="#007AFF" style={styles.guestControlIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.transparentTile}>
          <View style={styles.priceAndBookNow}>
            <Text style={styles.priceText}>{`$${program.price}`}</Text>
            <TouchableOpacity style={styles.bookNowButton}>
              <Text style={styles.bookNowButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="slide" transparent={false} visible={isDatePickerVisible}>
        <View style={styles.datePickerContainer}>
          <View style={styles.datePickerHeader}>
            <Text style={styles.datePickerHeaderText}>Select date</Text>
            <Pressable onPress={toggleDatePicker} style={styles.closeButton}>
              <FontAwesome5 name="times" size={20} color="#000" />
            </Pressable>
          </View>
          <Calendar
            current={selectedDate}
            minDate={maxDate}
            onDayPress={onDayPress}
            markedDates={markedDates}
            theme={{
              calendarBackground: '#000',
              selectedDayBackgroundColor: '#007AFF',
              selectedDayTextColor: '#fff',
              todayTextColor: '#007AFF',
              textDisabledColor: '#999',
              dayTextColor: '#fff',
              monthTextColor: '#fff',
            }}
          />
          <TouchableOpacity style={styles.doneButton} onPress={handleDatePickerDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  imageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  programImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  programName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 8,
  },
  viewMapText: {
    fontSize: 16,
    color: '#007AFF', // Set the hyperlink color to match your design
    textDecorationLine: 'none',
  },
  transparentTile: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bookNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bookingDetails: {
    marginVertical: 16,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  bookingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  bookingValue: {
    fontSize: 16,
    color: '#007AFF',
  },
  bookingDetailsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  priceAndBookNow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  datePickerContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  datePickerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 8,
  },
  doneButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 16,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  guestsControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestControlIcon: {
    paddingHorizontal: 8,
  },   
});

export default BookingScreen;
