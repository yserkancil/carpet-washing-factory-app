import { View,Text,Pressable,TextInput,Alert } from 'react-native'
import React,{useState} from 'react'

const AddCarpet=() => {
    const[firstNumber, setFirstNumber] = useState();
    const[secondNumber, setSecondNumber] = useState();
    const[result, setResult] = useState();
    
    const Sum = () => {
        setResult(parseFloat(firstNumber) * parseFloat(secondNumber));
        Alert.alert(`${firstNumber} x ${secondNumber} boyutundaki halınız listeye eklenmiştir`,'Diğer işleme geçebilirsiniz');
        setFirstNumber('');
        setSecondNumber('');
        
    };
  return (
    <View
    style={{
        width:'100%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }}
    >
        <TextInput
         style = {{
            width: 200,
            height: 70,
            borderRadius: 15,
            borderWidth: 1,
            backgroundColor: 'lightgray',
            marginBottom: 30,
            textAlign: 'center'
        }}
         keyboardType='number-pad'
         onChangeText={setFirstNumber}
         value={firstNumber}
         />

        <TextInput
         style = {{
            width: 200,
            height: 70,
            borderRadius: 15,
            borderWidth: 1,
            backgroundColor: 'lightgray',
            marginBottom: 40,
            textAlign: 'center'
        }}
         keyboardType='number-pad'
         onChangeText={setSecondNumber}
         value={secondNumber}
         />

        

        <Pressable
          style={({pressed}) => [
            {
                width: 200,
                height: 70,
                backgroundColor:'tomato',
                alignItems:'center',
                justifyContent:'center',
                borderRadius: 15,
                marginBottom: 30,
                transform: [pressed ? {translateY: 10} : {translateY: 0}],
                shadowRadius:3.5,
                shadowColor:'black',
                shadowOpacity: pressed ? 0.1 : 0.25,
                shadowOffset:pressed ? {width:0, height:1} : {width:0, height:3},
            },
          ]
        }
          onPress={Sum} 
        >
             <Text>Ölçümü Ekle</Text>
        </Pressable>

        <Text>İlk Numara : {firstNumber}</Text>
        <Text>İkinci Numara: {secondNumber}</Text>
        <Text>Sonuç : {result} metrekare</Text>




       
    </View>
  )
}

export default AddCarpet;