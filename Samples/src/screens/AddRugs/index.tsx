import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const AddRug = () => {
  const [customerID, setCustomerID] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [pricePerSquareMeter, setPricePerSquareMeter] = useState('');

  const addRug = async () => {
    try {
      const response = await axios.post('http://192.168.1.118:3000/rugs', {
        customer_id: customerID,
        length: parseFloat(length),
        width: parseFloat(width),
        price_per_square_meter: parseFloat(pricePerSquareMeter),
      });
      Alert.alert(
        'Success',
        'Kilim başarıyla eklendi.',
        [{ text: 'OK' }]
      );
      setCustomerID('');
      setLength('');
      setWidth('');
      setPricePerSquareMeter('');
    } catch (error) {
      console.error('Error adding rug:', error);
      Alert.alert(
        'Error',
        'Kilim eklenirken bir hata oluştu.',
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kilim Ekle</Text>
      
      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setCustomerID}
        value={customerID}
        placeholder="Müşteri Numarası"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setLength}
        value={length}
        placeholder="Uzunluk (metre)"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setWidth}
        value={width}
        placeholder="Genişlik (metre)"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setPricePerSquareMeter}
        value={pricePerSquareMeter}
        placeholder="Metrekare Fiyatı (TL)"
      />

      <Pressable
        style={styles.button}
        onPress={addRug}
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
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddRug;
