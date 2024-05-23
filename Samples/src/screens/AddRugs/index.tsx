import { View, Text, Pressable, TextInput, Alert, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const AddCarpet = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [pricePerSquareMeter, setPricePerSquareMeter] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const Sum = () => {
    const area = parseFloat(firstNumber) * parseFloat(secondNumber);
    const total = area * parseFloat(pricePerSquareMeter);
    
    setResult(area);
    setTotalPrice(total);
    
    Alert.alert(
      `Sipariş No: ${orderNumber}`,
      `${firstNumber} x ${secondNumber} boyutundaki halınız listeye eklenmiştir. Metrekare fiyatı: ${pricePerSquareMeter} TL. Toplam fiyat: ${total} TL.`,
      [{ text: 'Tamam' }]
    );

    // Clear the inputs
    setOrderNumber('');
    setFirstNumber('');
    setSecondNumber('');
    setPricePerSquareMeter('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kilim Ekle</Text>
      
      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setOrderNumber}
        value={orderNumber}
        placeholder="Sipariş Numarası"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setFirstNumber}
        value={firstNumber}
        placeholder="En"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setSecondNumber}
        value={secondNumber}
        placeholder="Boy"
      />

      <TextInput
        style={styles.input}
        keyboardType='number-pad'
        onChangeText={setPricePerSquareMeter}
        value={pricePerSquareMeter}
        placeholder="Metrekare Fiyatı (TL)"
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
        onPress={Sum}
      >
        <Text style={styles.buttonText}>Ekle</Text>
      </Pressable>

      {result !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Sipariş No: {orderNumber}</Text>
          <Text style={styles.resultText}>İlk Numara: {firstNumber}</Text>
          <Text style={styles.resultText}>İkinci Numara: {secondNumber}</Text>
          <Text style={styles.resultText}>Sonuç: {result} metrekare</Text>
          <Text style={styles.resultText}>Toplam Fiyat: {totalPrice} TL</Text>
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
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
});

export default AddCarpet;

