import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Customer {
  customer_id: number;
  name_surname: string;
  order_date: string;
  address: string;
  phone_number: string;
  carpets: Array<{
    carpet_id: number;
    length: number;
    width: number;
    price_per_square_meter: number;
  }>;
  rugs: Array<{
    rug_id: number;
    length: number;
    width: number;
    price_per_square_meter: number;
  }>;
  pillows: Array<{
    unit_number: number;
    price_per_square_meter: number;
  }>;
  blankets: Array<{
    unit_number: number;
    price_per_square_meter: number;
  }>;
}

const ActiveNavigator: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://192.168.1.127:3000/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCustomers();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDelete = (customerId: number) => {
    axios.delete(`http://192.168.1.127:3000/customers/${customerId}`)
      .then(() => {
        fetchCustomers();
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
      });
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View style={styles.customerItem}>
      <View>
        <Text style={styles.customerName}>{item.name_surname}</Text>
        <Text>{item.address}</Text>
        <Text>{item.phone_number}</Text>
        <Text>{item.customer_id}</Text>

        {item.carpets.length > 0 && (
          <View>
            <Text style={styles.productTitle}>Halılar:</Text>
            {item.carpets.map((carpet, index) => (
              <View key={`carpet-${carpet.carpet_id}-${index}`} style={styles.productInfo}>
                <Text>Halı ID: {carpet.carpet_id}</Text>
                <Text>Boyut: {carpet.length} x {carpet.width} m</Text>
                <Text>Fiyat/m²: {carpet.price_per_square_meter} ₺</Text>
              </View>
            ))}
          </View>
        )}

        {item.rugs.length > 0 && (
          <View>
            <Text style={styles.productTitle}>Kilimler:</Text>
            {item.rugs.map((rug, index) => (
              <View key={`rug-${rug.rug_id}-${index}`} style={styles.productInfo}>
                <Text>Kilim ID: {rug.rug_id}</Text>
                <Text>Boyut: {rug.length} x {rug.width} m</Text>
                <Text>Fiyat/m²: {rug.price_per_square_meter} ₺</Text>
              </View>
            ))}
          </View>
        )}

        {item.pillows.length > 0 && (
          <View>
            <Text style={styles.productTitle}>Yorganlar:</Text>
            {item.pillows.map((pillow, index) => (
              <View key={`pillow-${pillow.unit_number}-${index}`} style={styles.productInfo}>
                <Text>Yastık Adet: {pillow.unit_number}</Text>
                <Text>Birim Fiyat: {pillow.price_per_square_meter} ₺</Text>
              </View>
            ))}
          </View>
        )}

        {item.blankets.length > 0 && (
          <View>
            <Text style={styles.productTitle}>Battaniyeler:</Text>
            {item.blankets.map((blanket, index) => (
              <View key={`blanket-${blanket.unit_number}-${index}`} style={styles.productInfo}>
                <Text>Battaniye Adet: {blanket.unit_number}</Text>
                <Text>Fiyat/adet: {blanket.price_per_square_meter} ₺</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.customer_id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktif Müşterileriniz</Text>
      <View style={styles.divider} />
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.customer_id.toString()}
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            'Onay',
            'Tüm müşterileri silmek istediğinizden emin misiniz?',
            [
              {
                text: 'Hayır',
                style: 'cancel',
              },
              {
                text: 'Evet',
                onPress: () => {
                  axios.delete('http://192.168.1.127:3000/customers')
                    .then(() => {
                      setCustomers([]);
                    })
                    .catch(error => {
                      console.error('Error deleting all customers:', error);
                    });
                },
              },
            ]
          );
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Tüm Depoyu Sil</Text>
      </TouchableOpacity>
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
    textAlign: 'center',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  customerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
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
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  productInfo: {
    marginLeft: 10,
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
  button: {
    backgroundColor: '#ed8709',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ActiveNavigator;
