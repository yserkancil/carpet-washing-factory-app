import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
}

const FutureNavigator: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const addCustomer = () => {
    if (name === '' || address === '' || phone === '') {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }

    const newCustomer: Customer = {
      id: Math.random().toString(),
      name,
      address,
      phone,
    };

    setCustomers([...customers, newCustomer]);
    setName('');
    setAddress('');
    setPhone('');
  };

  const deleteCustomer = (id: string) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View style={styles.customerItem}>
      <View>
        <Text style={styles.customerName}>{item.name}</Text>
        <Text>{item.address}</Text>
        <Text>{item.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteCustomer(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alınacaklar Listesi</Text>
      <TextInput
        style={styles.input}
        placeholder="Müşteri Adı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adres"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefon Numarası"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={addCustomer} style={styles.addButton}>
        <Text style={styles.addButtonText}>Ekle</Text>
      </TouchableOpacity>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2e2bd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  list: {
    marginTop: 20,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#ed8709',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FutureNavigator;
