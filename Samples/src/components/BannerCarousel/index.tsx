import React, { useState } from "react";
import { View, Image, FlatList, StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

function index() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners,setBanners] = useState([
      "https://temizelhaliyikama.com/wp-content/uploads/2022/01/hali-yikama-slider-1-min.jpg",
      "https://lh3.googleusercontent.com/p/AF1QipOEx3TdDF5RwjOYOgoUY0_HuXkAdWIn2qu9fHWN=s680-w680-h510",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpi8qOIqw-AYRHoJYJ5oEnZtf0Xo2sICN-K6d22GfO9idXMQSqAsCjTEdGXot8Dx2qQkA&usqp=CAU",
    ])



  return (
  <FlatList
    data={banners}
    renderItem={(item) => (
        <Image
          source={{ uri: item.item }}
          style={{ width: width, height: height * 0.24,resizeMode:"stretch", }}
        />
      )}
      horizontal
      //showsHorizontalScrollIndicator={false}
      snapToInterval={width}
      snapToAlignment={"center"}
      decelerationRate={"fast"}
      testID="banner-carousel"
  /> 


  )
}

export default index;