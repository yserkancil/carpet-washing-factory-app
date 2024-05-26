import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Customer {
  customer_id: number;
  name_surname: string;
  order_date: string;
  address: string;
  phone_number: string;
  order_number: number;
}

const SearchNavigator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const searchCustomer = async () => {
    try {
      const response = await axios.get(`http://192.168.1.149:3000/customers?name_surname=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDelete = (customerId: number) => {
    axios.delete(`http://192.168.1.149:3000/customers/${customerId}`)
      .then(() => {
        setSearchResults(searchResults.filter(customer => customer.customer_id !== customerId));
        navigation.goBack(); // Müşteriyi sildikten sonra ActiveNavigator'a dön ve listeyi güncelle
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
      });
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View style={styles.customerItem}>
      <View>
        <Text style={styles.customerName}>{item.name_surname}</Text>
        <Text>{item.address}</Text>
        <Text>{item.phone_number}</Text>
        <Text>{item.order_number}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.customer_id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Müşteri adını girin..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.buttonContainer}>
        <Button title="Ara" onPress={searchCustomer} />
        <Button title="Temizle" onPress={clearResults} />
      </View>
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
    flex: 1,
    marginTop:20,
    padding: 20,
    backgroundColor: '#f2e2bd',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
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
});

export default SearchNavigator;
