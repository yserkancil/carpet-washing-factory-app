import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const MyComponent = () => {
    const handlePress = () => {
        fetch('http://192.168.1.182:3000/api/hello')
            .then(response => response.text())
            .then(data => {
                console.log(data);
                // Burada alınan geri dönüşü isteğin sonucu olarak kullanabilirsiniz
            })
            .catch(error => console.error(error));
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handlePress}
        >
            <Image
                style={styles.image}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFeLYuAkEVMmCAJ6gYsyhTfzH6EUqcSGwuxm2dEb4uJoCyTp7AFpj3B3PUYDUIgEh7BNU&usqp=CAU" }}
            />
            <Text style={styles.text}>Yorgan ekle</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.25,
        height: width * 0.24,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    image: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: 10,
    },
    text: {
        fontSize: 12,
        color: '#616161',
        fontWeight: '500',
    },
});

export default MyComponent;

