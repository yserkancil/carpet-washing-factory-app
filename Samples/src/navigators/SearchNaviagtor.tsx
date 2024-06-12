import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import axios from 'axios';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

interface Customer {
  customer_id: number;
  name_surname: string;
  order_date: string;
  address: string;
  phone_number: string;
  order_number: number;
  carpets?: Carpet[]; 
  rugs?: Rug[]; 
  pillows?: Pillow[]; 
  blankets?: Blanket[]; 
}

interface Carpet {
  carpet_id: number;
  length: number;
  width: number;
  price_per_square_meter: number;
}

interface Rug {
  rug_id: number;
  length: number;
  width: number;
  price_per_square_meter: number;
}

interface Pillow {
  unit_number: number;
  price_per_square_meter: number;
}

interface Blanket {
  unit_number: number;
  price_per_square_meter: number;
}

const SearchNavigator: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Customer[]>([]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const searchCustomer = async () => {
    try {
      if (!searchQuery) {
        const response = await axios.get(`http://192.168.1.127:3000/customers`);
        setSearchResults(response.data);
      } else {
        const response = await axios.get(`http://192.168.1.127:3000/customers?name_surname=${searchQuery}`);
        setSearchResults(response.data);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };
  
  const handleDelete = (customerId: number) => {
    axios.delete(`http://192.168.1.127:3000/customers/${customerId}`)
      .then(() => {
        setSearchResults(searchResults.filter(customer => customer.customer_id !== customerId));
        navigation.goBack(); 
      })
      .catch(error => {
        console.error('Error deleting customer:', error);
      });
  };

  const clearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const renderCarpetInfo = (carpets: Carpet[] | undefined) => {
    if (!carpets || carpets.length === 0) {
      return null;
    }

    return carpets.map((carpet, index) => (
      <View key={carpet.carpet_id}>
        <Text style={styles.carpetInfo}>{index + 1}. Halı Bilgisi:</Text>
        <Text>Boy: {carpet.length}</Text>
        <Text>En: {carpet.width}</Text>
        <Text>Metrekare Fiyatı: {carpet.price_per_square_meter}</Text>
      </View>
    ));
  };

  const renderRugInfo = (rugs: Rug[] | undefined) => {
    if (!rugs || rugs.length === 0) {
      return null;
    }

    return rugs.map((rug, index) => (
      <View key={rug.rug_id}>
        <Text style={styles.rugInfo}>{index + 1}. Kilim Bilgisi:</Text>
        <Text>Boy: {rug.length}</Text>
        <Text>En: {rug.width}</Text>
        <Text>Metrekare Fiyatı: {rug.price_per_square_meter}</Text>
      </View>
    ));
  };

  const renderPillowInfo = (pillows: Pillow[] | undefined) => {
    if (!pillows || pillows.length === 0) {
      return null;
    }

    return pillows.map((pillow, index) => (
      <View key={index}>
        <Text style={styles.pillowInfo}>{index + 1}. Yastık Bilgisi:</Text>
        <Text>Ünite Numarası: {pillow.unit_number}</Text>
        <Text>Metrekare Fiyatı: {pillow.price_per_square_meter}</Text>
      </View>
    ));
  };

  const renderBlanketInfo = (blankets: Blanket[] | undefined) => {
    if (!blankets || blankets.length === 0) {
      return null;
    }

    return blankets.map((blanket, index) => (
      <View key={index}>
        <Text style={styles.blanketInfo}>{index + 1}. Battaniye Bilgisi:</Text>
        <Text>Ünite Numarası: {blanket.unit_number}</Text>
        <Text>Metrekare Fiyatı: {blanket.price_per_square_meter}</Text>
      </View>
    ));
  };

  const renderItem = ({ item }: { item: Customer }) => (
    <View key={item.customer_id} style={styles.customerItem}>
      <View>
        <Text style={styles.customerName}>{item.name_surname}</Text>
        <Text>{item.address}</Text>
        <Text>{item.phone_number}</Text>
        {renderCarpetInfo(item.carpets)}
        {renderRugInfo(item.rugs)}
        {renderPillowInfo(item.pillows)}
        {renderBlanketInfo(item.blankets)}
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
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f2e2bd',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  customerItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customerName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  carpetInfo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rugInfo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pillowInfo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blanketInfo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default SearchNavigator;

