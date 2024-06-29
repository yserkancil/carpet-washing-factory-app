import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LogOut: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState<number | null>(null);

  const fetchUserId = async () => {
    try {
      const response = await axios.post('http://192.168.1.126:4000/getuserid', {
        username,
        password,
      });
      setUserId(response.data.user_id);
      Alert.alert('Başarılı', `Kullanıcı ID: ${response.data.user_id}`);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Hata', 'Kullanıcı bulunamadı veya şifre yanlış');
      } else {
        console.error('Error fetching user ID:', error);
      }
    }
  };

  const deleteUser = async () => {
    if (userId !== null) {
      try {
        const response = await axios.post('http://192.168.1.126:4000/deleteuser', {
          user_id: userId,
          password,
        });
        Alert.alert('Başarılı', 'Kullanıcı başarıyla silindi');
        navigation.navigate('Login');
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Alert.alert('Hata', 'Kullanıcı bulunamadı veya şifre yanlış');
        } else {
          console.error('Error deleting user:', error);
        }
      }
    } else {
      Alert.alert('Hata', 'Öncelikle kullanıcı ID bilgisini alın');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hesabım</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.button} onPress={fetchUserId}>
          <Text style={styles.buttonText}>Kullanıcı ID Al</Text>
        </TouchableOpacity>
      
      </View>
      <TouchableOpacity style={styles.button} onPress={deleteUser}>
        <Text style={styles.buttonText}>Hesabınızı Kapatın</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2e2bd',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#cc0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#0066cc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogOut;
