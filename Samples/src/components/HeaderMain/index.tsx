import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

function Index() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Sayfa yüklendiğinde ve her saniyede bir tarihi güncelleyen bir etki alanı
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
      setCurrentDate(formattedDate);
    }, 1000);

    return () => clearInterval(interval); // Komponentin hafızadan temizlenmesi durumunda zamanlayıcıyı temizle
  }, []);

  return (
    <View testID='header-main' style={styles.headerMain}>
      {/* adres */}
      <View style={styles.headerOne}>
        <Image style={styles.image} source={{ uri: "https://images.freeimages.com/vme/images/1/6/160758/phone_icon_clip_art_preview.jpg" }} />
        <View style={styles.headerOneView}>
          <Text testID='place-text' style={{ fontWeight: '600', fontSize: 16 }}>Bilgiler</Text>
          <Text style={{ fontWeight: '500', fontSize: 11.5, color: '#6E7480', marginLeft: 6, marginRight: 3 }}>Aktepe Halı Yıkama...</Text>
          <AntDesign name="right" size={24} color="black" style={{ marginLeft: 24 }} />
        </View>
      </View>

      <View style={styles.headerTwo}>
        <Text style={{ fontSize: 16, color: '#994703', fontWeight: 'bold', textAlign: 'center', marginTop: 5 }}>Tarih:</Text>
        <Text style={{ fontSize: 11, color: '#994703', fontWeight: 'bold', textAlign: 'center', marginTop: 2 }}>{currentDate}</Text>
      </View>
    </View>
  );
}

export default Index;
