import React, {useState} from 'react'
import { ScrollView,ImageBackground,StyleSheet,Alert} from 'react-native'
import { TextInput,Button } from 'react-native-paper'
function Index() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const handleButtonPress = () => {
   Alert.alert("Müşteri listeye eklenmiştir.Artık müşteri ürünlerini ekleyebilirsiniz");
  };
  return (
    <ImageBackground source={require('C:/Users/muham/OneDrive/Masaüstü/Sample/Samples/assets/logo6.png')} style={styles.image}>
    <ScrollView style={{margin:16}}>
      <TextInput label="İsim soyisim" style={{backgroundColor:"white"}}
      value= {name} onChangeText={(text) => setName(text)}
      >
      </TextInput>
      <TextInput label="Telefon" style={{marginTop:12,backgroundColor:"white"}}
        value= {email} onChangeText={(text) => setEmail(text)}
      >        
      </TextInput>
      <TextInput label="Ürün Alış Tarihi" style={{marginTop:12,backgroundColor:"white"}}
       value= {password} onChangeText={(text) => setPassword(text)}
      > 
      </TextInput>
      <TextInput label="Adres" style={{marginTop:12,backgroundColor:"white"}}
       value= {password} onChangeText={(text) => setPassword(text)}
      >           
      </TextInput>
      <Button mode='contained' onPress={handleButtonPress} style={{marginTop:16,backgroundColor:"#ed8709"}}>Listeye Ekle</Button>
    </ScrollView>
    </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    
  },
})

export default Index








//C:/Users/muham/OneDrive/Masaüstü/Sample/Samples/assets/logo6.png'