import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // For navigation

  const handleLogin = async () => {
    console.log('logged in');
    console.log(10);
    if (!username || !password) {
      console.log(1)
      Alert.alert('Error', 'Please enter both username and password');
      setUsername('');
      setPassword('');
      return;
    }

    // Here you would typically make an API call to authenticate the user
    try {
      const response = await fetch('http://192.168.137.183:5001/users/login', {
        method: 'POST', // Use POST for real-world applications
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(1);

      if (!response.ok) {
        Alert.alert('Login Failed', 'Invalid username or password');
        setUsername('');
        setPassword('');
        throw new Error('Invalid credentials');
      }
      console.log(2);
      const data = await response.json();
      console.log(data);
      // Alert.alert('Success', `Welcome, ${data.username}!`);
      // localStorage.setItem('user', JSON.stringify(data.token));
      AsyncStorage.setItem('user', JSON.stringify(data.token))
      // Redirect or navigate to another screen on successful login
      console.log(3);
      router.push('/home'); // Change '/home' to your home screen route

    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        Alert.alert('Login Failed', error.message);
      } else {
        Alert.alert('Login Failed', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      
      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign up!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  signupButton: {
    marginTop: 20,
    alignItems: 'center', // Center the text
  },
  signupText: {
    color: 'blue', // Change to your preferred color
    fontSize: 16,
  },
});

export default LoginScreen;
