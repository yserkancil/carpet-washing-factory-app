import React from 'react'
import {ScrollView} from "react-native"
import styles from './styles'
import HeaderMain from "../../components/HeaderMain"
import BannerCarousel from "../../components/BannerCarousel"
import CategoryItem from "../../components/CategoryItem"
function Index() {
  return (
    <ScrollView stickyHeaderIndices={[0]} style={{height:'100%',backgroundColor:'#f5f5f5'}}>
        <HeaderMain />
        <BannerCarousel />
        <CategoryItem />
    </ScrollView>
  )
}

export default Index
 