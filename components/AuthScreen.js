import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "../styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
  withSpring,
  withDelay,
  withSequence,
} from "react-native-reanimated";

// Import Axios for making HTTP requests
import axios from 'axios';

const AuthScreen = () => {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [{ translateY: withTiming(interpolation, { duration: 1000 }) }],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [{ rotate: withTiming(interpolation + "deg", { duration: 1000 }) }],
    };
  });

  

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const registerUser = async () => {

  
    try {
      const data = {
        email: email,
        password: password,
        confirm_password: confirm_password
        
      };

      const response = await fetch('http://192.168.29.198:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
      console.log('okay');
       // navigate('/login');
      } else {
        throw new Error('data error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <Animated.View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
          <Svg height={height + 100} width={width}>
            <ClipPath id="clipPathId">
              <Ellipse cx={width / 2} rx={height} ry={height + 100} />
            </ClipPath>
            <Image
              href={require("../assets/ideogram.jpeg")}
              width={width + 100}
              height={height + 100}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clipPathId)"
            />
          </Svg>
          <Animated.View
            style={[styles.closeButtonContainer, closeButtonContainerStyle]}
          >
            <Text onPress={() => (imagePosition.value = 1)}>X</Text>
          </Animated.View>
        </Animated.View>
        <View style={styles.bottomContainer}>
          <Animated.View style={buttonsAnimatedStyle}>


          <Pressable style={styles.button} onPress={loginHandler}>
            <Text style={styles.buttonText}>LOG IN</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <Pressable style={styles.button} onPress={registerHandler}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="black"
        style={styles.textInput}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {isRegistering && (
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="black"
          style={styles.textInput}
        />
      )}
      <TextInput
        placeholder="Password"
        placeholderTextColor="black"
        style={styles.textInput}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="black"
        style={styles.textInput}
        value={confirm_password}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
      <Pressable onPress={() => {
  formButtonScale.value = withSequence(
    withSpring(1.5),
    withSpring(1, { stiffness: 50, damping: 2 }) // You can adjust stiffness and damping values
  );
  registerUser(); // Call your registerUser function here
}}>
          <Text style={styles.buttonText}>
            {isRegistering ? "REGISTER" : "LOG IN"}
          </Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;