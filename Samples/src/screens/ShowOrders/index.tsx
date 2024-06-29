import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';

interface User {
  user_id: number;
  username: string;
  adres?: string; // Address is optional if you added it to the user table
  total_carpets: number;
  total_pilows: number;
  total_rugs: number;
  total_blankets: number;
  date_want: string | null;
  time: string | null;
  state: number | null;
}

const Orders: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.182:4000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateStatus = async (userId: number, state: number) => {
    try {
      const response = await fetch('http://192.168.1.182:4000/updatestatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, state }),
      });

      if (response.ok) {
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.user_id === userId ? { ...user, state } : user
          )
        );
      } else {
        throw new Error('Status update failed');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <View>
        <Text style={styles.userName}>İsim Soyisim: {item.username}</Text>
        <Text style={styles.userName}>NO: {item.user_id}</Text>
        {item.adres && <Text style={styles.userName}>Adres: {item.adres}</Text>}

        {item.date_want || item.time ? (
          <View>
            <Text style={styles.productTitle}>Sipariş Detayları:</Text>
            <View style={styles.productInfo}>
              <Text>Tarih: {item.date_want}</Text>
              <Text>Saat: {item.time}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noOrderDetails}>Sipariş Detayları Yok</Text>
        )}

        {item.total_carpets > 0 && (
          <View>
            <Text style={styles.productTitle}>Halılar:</Text>
            <View style={styles.productTitle}>
              <Text>{item.total_carpets} adet</Text>
            </View>
          </View>
        )}

        {item.total_pilows > 0 && (
          <View>
            <Text style={styles.productTitle}>Yastıklar:</Text>
            <View style={styles.productInfo}>
              <Text>{item.total_pilows} adet</Text>
            </View>
          </View>
        )}

        {item.total_rugs > 0 && (
          <View>
            <Text style={styles.productTitle}>Kilimler:</Text>
            <View style={styles.productInfo}>
              <Text>{item.total_rugs} adet</Text>
            </View>
          </View>
        )}

        {item.total_blankets > 0 && (
          <View>
            <Text style={styles.productTitle}>Battaniyeler:</Text>
            <View style={styles.productInfo}>
              <Text>{item.total_blankets} adet</Text>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button 
            title={item.state === 1 ? "Kabul Edildi" : "Kabul Et"} 
            onPress={() => updateStatus(item.user_id, 1)} 
          />
          <Button 
            title={item.state === 0 ? "Reddedildi" : "Reddet"} 
            onPress={() => updateStatus(item.user_id, 0)} 
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aktif Kullanıcılarınız</Text>
      <View style={styles.divider} />
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.user_id.toString()}
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
    textAlign: 'center',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginBottom: 20,
  },
  userItem: {
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
  userName: {
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
  noOrderDetails: {
    color: '#888',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default Orders;
