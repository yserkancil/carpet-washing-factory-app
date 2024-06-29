import { View, Text, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

const AddCarpetC = () => {
  const [userId, setCustomerId] = useState('');
  const [carpetCount, setCarpetCount] = useState('');

  const handleAddCustomerCarpet = async () => {
    try {
      const response = await axios.post('http://192.168.1.182:4000/customercarpets', {
        user_id: userId,
        carpet_count: parseInt(carpetCount, 10),
      });

      // Handle success
      console.log('Response:', response.data);
      Alert.alert('Success', 'Carpet added successfully.');
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to add carpet.');
    }

    // Clear inputs after submission
    setCustomerId('');
    setCarpetCount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halınızı Buradan Adediyle Ekleyin</Text>
      
      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setCustomerId}
        value={userId}
        placeholder="Müşteri Numarası"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setCarpetCount}
        value={carpetCount}
        placeholder="Halı Adedi"
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          {
            transform: [pressed ? { translateY: 10 } : { translateY: 0 }],
            shadowOpacity: pressed ? 0.1 : 0.25,
            shadowOffset: pressed ? { width: 0, height: 1 } : { width: 0, height: 3 },
          },
        ]}
        onPress={handleAddCustomerCarpet}
      >
        <Text style={styles.buttonText}>Ekle</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2e2bd',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowRadius: 3.5,
    shadowColor: 'black',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddCarpetC;
