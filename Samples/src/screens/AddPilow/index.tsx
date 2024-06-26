import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const AddPillow = () => {
  const [orderId, setOrderId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const handleSubmit = () => {
    const total = parseFloat(quantity) * parseFloat(price);
    setTotalPrice(total);

    Alert.alert(
      `Ürün ${orderId} numaralı müşteriye başarıyla eklendi`,
      `Ürün Adeti: ${quantity}\nBirim Fiyatı: ${price} ₺\nToplam Fiyat: ${total} ₺`
    );

    // Yeni yorganı sunucuya gönder
    axios.post('http://192.168.1.118:3000/pillows', {
      unit_number: parseFloat(quantity), // Unit number olarak adet kullanılacak
      price_per_square_meter: parseFloat(price),
      customer_id: parseFloat(orderId),
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error adding pillow:', error);
    });

    setOrderId('');
    setQuantity('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yorgan Ekle</Text>

      <TextInput
        style={styles.input}
        placeholder="Sipariş Numarası"
        onChangeText={setOrderId}
        value={orderId}
      />
      <TextInput
        style={styles.input}
        placeholder="Ürün Adet Sayısı"
        keyboardType='number-pad'
        onChangeText={setQuantity}
        value={quantity}
      />
      <TextInput
        style={styles.input}
        placeholder="Birim Fiyatı (₺)"
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

export default AddPillow;
