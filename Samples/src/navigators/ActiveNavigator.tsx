import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

interface Customer {
  customer_id: number;
  name_surname: string;
  order_date: string;
  address: string;
  phone_number: string;
}

const ActiveNavigator = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://192.168.1.190:3000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      await axios.delete(`http://192.168.1.190:3000/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const deleteAllCustomers = async () => {
    Alert.alert(
      'Tüm müşterileri sil',
      'Bu işlem geri alınamaz. Emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Evet', onPress: async () => {
            try {
              await axios.delete('http://192.168.1.190:3000/customers');
              fetchCustomers();
            } catch (error) {
              console.error('Error deleting all customers:', error);
            }
          }
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View style={styles.customerItem}>
      <View style={styles.customerInfo}>
        <Text style={styles.customerName}>{item.name_surname}</Text>
        <Text>{item.address}</Text>
        <Text>{item.phone_number}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteCustomer(item.customer_id)}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Aktif Müşterileriniz</Text>
      <View style={styles.separator} />
      <TouchableOpacity style={styles.deleteAllButton} onPress={deleteAllCustomers}>
        <Text style={styles.deleteAllButtonText}>Tüm Müşterileri Sil</Text>
      </TouchableOpacity>
      <FlatList
        data={customers}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: '#ff3333',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteAllButton: {
    backgroundColor: '#ff3333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  deleteAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ActiveNavigator;
