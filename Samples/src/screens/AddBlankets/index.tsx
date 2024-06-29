import { View, Text, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';

const AddBlanket = () => {
  const [customerId, setCustomerId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const handleSubmit = async () => {
    const total = parseFloat(quantity) * parseFloat(price);
    setTotalPrice(total);

    try {
      await axios.post('http://192.168.1.127:3000/blankets', {
        customer_id: customerId,
        price_per_square_meter: parseFloat(quantity),
        unit_number: parseFloat(price),
      });

      Alert.alert(
        `Sipariş Numarası: ${customerId}`,
        `Ürün Adeti: ${quantity}\nBirim Fiyatı: ${price} ₺\nToplam Fiyat: ${total} ₺`
      );

      setCustomerId('');
      setQuantity('');
      setPrice('');
    } catch (error) {
      console.error('Error adding kilim:', error);
      Alert.alert('Error', 'An error occurred while adding the kilim.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battaniye Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Müşteri ID"
        onChangeText={setCustomerId}
        value={customerId}
      />
      <TextInput
        style={styles.input}
        placeholder="Birim Fiyatı (₺)"
        keyboardType='number-pad'
        onChangeText={setQuantity}
        value={quantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Ürün Adet Sayısı"
        keyboardType='number-pad'
        onChangeText={setPrice}
        value={price}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Ekle</Text>
      </Pressable>

      {totalPrice !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Toplam Fiyat: {totalPrice} ₺</Text>
        </View>
      )}
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
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ed8709',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AddBlanket;
