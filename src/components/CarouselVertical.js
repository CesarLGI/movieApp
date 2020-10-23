import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Image,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {Title,Text} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {BASE_PATH_IMG} from '../utils/constants'
const {width}=Dimensions.get('window');
const ITEM_WIDTH=Math.round(width*0.7);
import {obtenerGeneroPeliculaApi} from '../api/movies';
import {map,size} from 'lodash'


const CarouselVertical=(props)=>{
    //console.log(props);
    const {data,navigation}=props;
    return(
        <Carousel
            layout={'default'}
            data={data}
            renderItem={(item)=> <RenderItem data={item} navigation={navigation}></RenderItem>}
            sliderWidth={width}
            itemWidth={ITEM_WIDTH}
        >

        </Carousel>
    )
}

function RenderItem(props){
    const {data,navigation}=props;
    //console.log(data);
    const {id,title,poster_path,genre_ids}=data.item;

    //CONSTRUIR EL PATH DE LA IMAGEN A MOSTRAR
    const imageUrl=`${BASE_PATH_IMG}/w500${poster_path}`;
    //state para generos
    const [genero,guardarGenero]=useState(null);
    //
    useEffect(()=>{
        obtenerGeneroPeliculaApi(genre_ids).then((response)=>{
           guardarGenero(response);
        })
    },[])
    return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Movie',{id:id})}>
            <View style={styles.card}>
                <Image style={styles.imagen} source={{uri:imageUrl}}></Image>
                <Title style={styles.titulo}>{title}</Title>
                <View style={styles.generos}>
                    {genero && 
                        map(genero,(genre,index)=>(
                        <Text key={index} style={styles.generoTexto} numberOfLines={2}>
                           {genre}
                           {index !== size(genero) -1 && ', '}
                        </Text>
                        ))
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles=StyleSheet.create({
    card:{
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:1,
        shadowRadius:10
    },
    imagen:{
        width:'100%',
        height:450,
        borderRadius:20
    },
    titulo:{
        marginHorizontal:10,
        marginTop:10,
        textAlign:'center'
    },
    generos:{
        flexDirection:'row',
        marginHorizontal:10,
        justifyContent:'center'
    },
    generoTexto:{
        fontSize:15,
        color:'#8997a5',
        
    }
})
export default CarouselVertical;