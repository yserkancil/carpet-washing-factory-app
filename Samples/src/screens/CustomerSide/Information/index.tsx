import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const StatusChecker: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const checkStatus = async () => {
    try {
      const response = await axios.get(`http://192.168.1.182:4000/status/${userId}`);
      const state = response.data.state;
      if (state === 1) {
        setStatus('Kabul Edildi');
      } else if (state === 0) {
        setStatus('Reddedildi');
      } else {
        setStatus(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Hata', 'Verilen user_id için durum bulunamadı');
      } else {
        console.error('Error fetching status:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Durum Sorgulama</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID"
        keyboardType="numeric"
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="Sorgula" onPress={checkStatus} />
      {status && <Text style={styles.status}>{status}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2e2bd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '80%',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
});

export default StatusChecker;
