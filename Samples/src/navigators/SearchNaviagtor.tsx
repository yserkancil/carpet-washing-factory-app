import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

interface Customer {
  customer_id: number;
  name_surname: string;
  order_date: string;
  address: string;
  phone_number: string;
}

const SearchCustomerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);

  const searchCustomer = async () => {
    try {
      const response = await axios.get(`http://192.168.1.182:3000/customers?name_surname=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity style={styles.customerItem}>
      <Text style={styles.customerName}>{item.name_surname}</Text>
      <Text>{item.address}</Text>
      <Text>{item.phone_number}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Müşteri adını girin..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Ara" onPress={searchCustomer} />
      <Button title="Temizle" onPress={clearResults} />
      <FlatList
        data={searchResults}
        renderItem={renderItem}
        keyExtractor={item => item.customer_id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  customerItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  customerName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default SearchCustomerScreen;

