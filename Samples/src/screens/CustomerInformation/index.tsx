import React, { useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';

function CustomerInformation() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [address, setAddress] = useState('');

  const handleButtonPress = async () => {
    try {
      const response = await axios.post('http://192.168.1.127:3000/customers', {
        name_surname: name,
        phone_number: phone,
        order_date: purchaseDate,
        address: address,
      });
      // Handle success
      const {customer_id} = response.data;
      console.log('Response:', response.data);
      Alert.alert('Success', `Customer added successfully. Your customer number is ${customer_id}`);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to add customer.');
    }

    // Clear inputs after submission
    setName('');
    setPhone('');
    setPurchaseDate('');
    setAddress('');
  };

  return (
    <ImageBackground source={require('C:/Users/muham/OneDrive/Masaüstü/Sample/Samples/assets/logo6.png')} style={styles.image}>
      <ScrollView style={{ margin: 16 }}>
        <TextInput label="İsim Soyisim" style={{ backgroundColor: "white" }}
          value={name} onChangeText={(text) => setName(text)}
        />
        <TextInput label="Telefon" style={{ marginTop: 12, backgroundColor: "white" }}
          value={phone} onChangeText={(text) => setPhone(text)}
        />
        <TextInput label="Ürün Alış Tarihi" style={{ marginTop: 12, backgroundColor: "white" }}
          value={purchaseDate} onChangeText={(text) => setPurchaseDate(text)}
        />
        <TextInput label="Adres" style={{ marginTop: 12, backgroundColor: "white" }}
          value={address} onChangeText={(text) => setAddress(text)}
        />
        <Button mode='contained' onPress={handleButtonPress} style={{ marginTop: 16, backgroundColor: "#ed8709" }}>Listeye Ekle</Button>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

export default CustomerInformation;
