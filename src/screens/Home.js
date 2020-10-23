import React,{useState,useEffect} from 'react';
import {View,StyleSheet,ScrollView} from 'react-native';
import {Title,Text} from 'react-native-paper'
import {obtenerNuevasPeliculasApi,obtenerGenerosApi, obtenerPeliculaGeneroApi} from '../api/movies';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMuti';
import {map} from 'lodash';

const Home=(props)=>{

    const {navigation}=props;
    //console.log(props);
    //state para guardar peliculas
    const [nuevasPeliculas,guardarNuevasPeliculas]=useState(null);
    const [generosLista,guardarGenerosLista]=useState([]);

    //state para genero seleccionado-guarda ID
    const [generoSelect,guardarGeneroSelect]=useState(28);
    //state de peliculas de acuerdo al genero seleccionado
    const [peliculasXGenero,guardarPeliculasXGenero]=useState('');
    //console.log(peliculasXGenero);
    //console.log(generosPeliculas);
    useEffect(()=>{
        obtenerNuevasPeliculasApi().then((response)=>{
            guardarNuevasPeliculas(response.results);
        });
        
    },[])

    useEffect(()=>{
        obtenerGenerosApi().then((response)=>{
            guardarGenerosLista(response.genres);
        })
    },[])
    useEffect(()=>{
        obtenerPeliculaGeneroApi(generoSelect).then((response)=>{
            guardarPeliculasXGenero(response.results);
        })
    },[generoSelect])
    //guardar el genero seleccionado para cambiarle el color en el style de text
    const guardarGenero=(generoId)=>{
        //console.log(generoId);
        guardarGeneroSelect(generoId);
    }
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {nuevasPeliculas && (
                <View style={styles.nuevas}>
                    <Title style={styles.nuevoTitulo}>Nuevas Peliculas</Title>
                    <CarouselVertical data={nuevasPeliculas} navigation={navigation}/>
                </View>
            )}
            <View style={styles.generos}>
                <Title style={styles.titulo}>Peliculas por genero</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.listaGenero}>
                    {
                        map(generosLista,(genero)=>(
                        <Text style={[styles.textoGenero,{color: genero.id !== generoSelect ? '#8697a5': '#fff'}]} 
                        key={genero.id}
                        onPress={()=>guardarGenero(genero.id)}>
                        {genero.name}
                        </Text>
                    ))}
                </ScrollView>
                {peliculasXGenero && (
                    <CarouselMulti data={peliculasXGenero} navigation={navigation}/>
                )} 
            </View>
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    nuevas:{
        marginVertical:10,

    },
    nuevoTitulo:{
        marginBottom:15,
        marginHorizontal:20,
        fontWeight:'bold',
        fontSize:22
    },
    generos:{
        marginTop:20,
        marginBottom:50
    },
    titulo:{
        fontSize:22,
        marginHorizontal:20,
        fontWeight:'bold',
    },
    listaGenero:{
        marginTop:5,
        marginBottom:15,
        paddingHorizontal:20,
        padding:10,
        marginRight:10
    },
    textoGenero:{
        marginRight:20,
        fontSize:16,
        
    }
})
export default Home;