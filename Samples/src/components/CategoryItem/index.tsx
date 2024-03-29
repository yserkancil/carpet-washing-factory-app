import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions,ScrollView,View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
const { width } = Dimensions.get('window');

const MyComponent = () => {
    const handlePress = () => {
        fetch('http://192.168.1.182:3000/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ itemName: 'Yorgan' }), // Yeni eklenen öğenin adını burada belirtin
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
                // Alınan yanıtı kullanabilirsiniz
            })
            .catch(error => console.error(error));
    };
     const navigation = useNavigation()
    return (
     <ScrollView style={{backgroundColor:'#f2e2bd',marginTop:25}}>
             <Button  onPress={() =>navigation.navigate("CategoryDetails")}mode='contained' 
                style={{marginTop:0,backgroundColor:"#ed8709"}}
             >
            <Text >Müşteri Bilgilerini Girin</Text>
            </Button>
           
           <View style={{flexDirection:"row"}}>
            <TouchableOpacity
            style={[styles.container,{marginLeft:50}]}
            onPress={() =>navigation.navigate("AddProduct")}
             >
            <Image
                style={styles.image}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuE01O1sK7nmDVfj-uPVHBf3m2A9gYGH5OCQ&usqp=CAU" }}
            />
            <Text style={styles.text}>Halı ekle</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={[styles.container,{marginLeft:40}]}
            onPress={() =>navigation.navigate("AddProduct")}
             >
            <Image
                style={styles.image}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFeLYuAkEVMmCAJ6gYsyhTfzH6EUqcSGwuxm2dEb4uJoCyTp7AFpj3B3PUYDUIgEh7BNU&usqp=CAU" }}
            />
            <Text style={styles.text}>Yorgan Ekle</Text>
            </TouchableOpacity>            
           </View>

           <View style={{flexDirection:"row"}}>
           <TouchableOpacity
            style={[styles.container,{marginLeft:50}]}
            onPress={() =>navigation.navigate("AddProduct")}
             >
            <Image
                style={styles.image}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ofAsDDI9uzg9JiRVR6Lfe2kodTEeX3CoBy1dXMYr3g&s" }}
            />
            <Text style={styles.text}>Kilim Ekle</Text>
            </TouchableOpacity>  

            <TouchableOpacity
            style={[styles.container,{marginLeft:40}]}
            onPress={() =>navigation.navigate("AddProduct")}
             >
            <Image
                style={styles.image}
                source={{ uri: "https://png.pngtree.com/thumb_back/fw800/background/20230906/pngtree-pink-blanket-lying-against-a-white-background-image_13274089.jpg" }}
            />
            <Text style={styles.text}>Battaniye Ekle</Text>
            </TouchableOpacity>  
           </View>
           <Button  onPress={() =>navigation.navigate("CategoryDetails")}mode='contained' 
                style={{marginTop:2,backgroundColor:"#ed8709"}}
             >
            <Text >İşlemi BİTİRİN</Text>
            </Button>
       
     </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        width: width*0.30 ,
        height: width * 0.30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: 10,  
        borderWidth:1,
        borderColor:'black'
    },
    text: {
        fontSize: 12,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default MyComponent;


