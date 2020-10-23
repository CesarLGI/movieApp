import React,{useState,useEffect} from 'react';
import {View,Image,StyleSheet,ScrollView} from 'react-native';

import {obtenerPeliculaXIdApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import { IconButton, Title,Text } from 'react-native-paper';
import {map} from 'lodash';
import {Rating} from 'react-native-ratings'
import starDark  from '../assets/png/starDark.png';
import starLight  from '../assets/png/starLight.png'
import usePreferences from '../hooks/usePreferences'

const Movie=(props)=>{
    //console.log(props);
    //obtengo los datos (id de pelicula seleccionada) q vienen de carousel
    const {route}=props;
    const {id}=route.params;
    //state de pelicula
    const [pelicula,guardarPelicula]=useState(null);
    //state para modal
    const [showVideo,guardarShowVideo]=useState(false);
    //obtener pelicula pasando id
    useEffect(()=>{
        obtenerPeliculaXIdApi(id).then((response)=>{
            //console.log(response);
            guardarPelicula(response);
        })
    },[])

    if (!pelicula) return null;
    return(
        <>
            <ScrollView>
                <MovieImage posterPath={pelicula.poster_path}/>
                <MovieTrailer guardarShowVideo={guardarShowVideo}/>
                <MovieTitle pelicula={pelicula}/>
                <MovieRating cantVoto={pelicula.vote_count} promedioVoto={pelicula.vote_average}/>
                <Text style={styles.overview}>{pelicula.overview}</Text>
                <Text style={[styles.overview,{marginTop:10,marginBottom:30}]}>Fecha de Lanzamiento: {pelicula.release_date}</Text>
            </ScrollView>
            <ModalVideo show={showVideo} setShow={guardarShowVideo} idPelicula={id}/>
            
        </>
    );
}
//componente para la imagen
function MovieImage(props){
    const {posterPath}=props;
    return(
        <View >
            <Image style={styles.poster} source={{uri:`${BASE_PATH_IMG}/w500${posterPath}`}}></Image>
        </View>
    );
}
//componente
function MovieTrailer(props){
    const {guardarShowVideo}=props;

    return(
        <View style={styles.contenedorPlay}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Reproducir</Text>
            <IconButton icon="play"
                color="#000"
                size={30}
                style={styles.play}
                onPress={()=>guardarShowVideo(true)}
            />
        </View>
    );
}
function MovieTitle(props){
    const {pelicula}=props;
    console.log(pelicula.genres);
    return(
        <View style={styles.contenedorInfo}>
            <Title>{pelicula.title}</Title>
            <View style={styles.contenedorGenero}>
            {map(pelicula.genres,(genero)=>(
                <Text style={styles.textGenero} key={genero.id}>{genero.name}</Text>
            ))}
            </View>
        </View>
    )
}

function MovieRating(props){
    const {cantVoto,promedioVoto}=props;
    const {theme}=usePreferences();

    const media=promedioVoto / 2;

    return(
        <View style={styles.contenedorRating}>
            <Rating type="custom"
                ratingImage={theme === 'dark'? starDark : starLight}
                ratingColor="#ffc205"
                ratingBackgroundColor={theme === 'dark' ? '#192734': '#f0f0f0'}
                startingValue={media}
                imageSize={20}
                style={{marginRight:15}}
            ></Rating>
            <Text style={{fontSize:16,marginRight:5,color:'#fff'}}>{media}</Text>
            <Text style={{fontSize:12,color:'#8697a5'}}>{cantVoto} votos</Text>
        </View>
    )
}
const styles=StyleSheet.create({
    poster:{
        width:'100%',
        height:500,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        //zIndex:1
    },
    play:{
        backgroundColor:'#fff',
        //marginTop:-40,
        marginRight:30,
        width:60,
        height:60,
        borderRadius:100,
        
    },
    contenedorPlay:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        //zIndex:1
    },
    contenedorInfo:{
        marginHorizontal:30
    },
    contenedorGenero:{
        flexDirection:'row'
    },
    textGenero:{
        marginRight:10,
        color:'#8697a5'
    },
    contenedorRating:{
        marginHorizontal:30,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center'
    },
    overview:{
        marginHorizontal:30,
        marginTop:20,
        textAlign:'justify',
        color:'#8697a5'
    }
})
export default Movie;