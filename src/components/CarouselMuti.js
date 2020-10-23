import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Image,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {Title} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants'
const {width}=Dimensions.get('window');
const ITEM_WIDTH=Math.round(width*0.3);

const CarouselMulti=(props)=>{
    const {data,navigation}=props;

    return(
        <Carousel
            layout={"default"}
            data={data}
            renderItem={(item)=><RenderItem data={item} navigation={navigation}/>}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
            //configuracion de la vista del carousel,opacidad,tamano
            firstItem={1} //item q muestra primero
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
        />
    )
}
function RenderItem(props){
    const {data,navigation}=props;
    const {id,title,poster_path}=data.item;
    //CONSTRUIR EL PATH DE LA IMAGEN A MOSTRAR
    const imageUrl=`${BASE_PATH_IMG}/w500${poster_path}`;
    //console.log(data);


    return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Movie',{id:id})}>
            <View style={styles.card}>
                <Image style={styles.imagen} source={{uri:imageUrl}}></Image>
                <Title style={styles.titulo} numberOfLines={1}>{title}</Title>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles= StyleSheet.create({
    card:{
        alignItems:'center'
    },
    imagen:{
        width:'85%',
        height:170,
        borderRadius:20
    },
    titulo:{
        marginHorizontal:10,
        marginTop:10,
        fontSize:16,
        textAlign:'center'
    }
})
export default CarouselMulti;