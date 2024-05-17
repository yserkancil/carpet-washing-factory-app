import React, { useState } from 'react';
import { ScrollView, ImageBackground, StyleSheet, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios, { AxiosResponse } from 'axios';

function Index() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [address, setAddress] = useState('');

  const handleButtonPress = async () => {

    const data = {
      name_surname: name,
      phone_number: phone,
      order_date: purchaseDate,
      address: address
    };

    axios.post('http://192.168.1.182:3000/customers',data )
  .then((response: AxiosResponse) => {
    console.log('Response:', response.data);
  })
  .catch((error: any) => {
    console.error('Error:', error); 
  });

 

/*
      if (response.status === 200) {
        Alert.alert("Müşteri listeye eklenmiştir. Artık müşteri ürünlerini ekleyebilirsiniz");
      } else {
        Alert.alert("anan");

       // throw new Error('Müşteri eklenirken bir hata oluştu.');
      }
    } catch (error) {
      Alert.alert("Bir hata oluştu. Müşteri eklenemedi."+error);
      console.error(error); 
    }*/
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

export default Index;
