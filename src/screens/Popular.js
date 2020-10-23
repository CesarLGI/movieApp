import React,{useEffect,useState} from 'react';
import {View,StyleSheet,Image,ScrollView,TouchableWithoutFeedback} from 'react-native';
import {Title,Text,Button} from 'react-native-paper';
import {map} from 'lodash';
import {obtenerPeliculasPopularesApi} from '../api/movies'
import {BASE_PATH_IMG} from '../utils/constants';
import noImage from '../assets/png/default-imgage.png'
import {Rating} from 'react-native-ratings';
import starDark  from '../assets/png/starDark.png';
import starLight  from '../assets/png/starLight.png';
import usePreferences from '../hooks/usePreferences';


const Popular=(props)=>{
    const {navigation}=props;
    const {theme}=usePreferences();
    //state para guardar peliculas populares
    const [peliculas,guardarPeliculas]=useState(null);

    //state para guardar estado del boton para mostrar mas peliculas
    const [mostrarBoton,guardarMostrarBoton]=useState(true);

    //state para paginas de peliculas
    const [page,guardarPage]=useState(1);

    //console.log(peliculas);
    //hook para obtener las peliculas
    useEffect(()=>{
        obtenerPeliculasPopularesApi(page).then((response)=>{
            //console.log(response.results);
            const totalPaginas= response.total_pages;
            if (page< totalPaginas){
                if(!peliculas){
                    guardarPeliculas(response.results);
                }else {
                    guardarPeliculas([...peliculas,...response.results])
                }
            }else {
                mostrarBoton(false);
            }

            
        })
    },[page]);

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            {map(peliculas,(pelicula,index)=>(
                <Pelicula key={index} pelicula={pelicula} navigation={navigation}/>
            ))}
            { guardarMostrarBoton && (
                <Button mode="contained" contentStyle={styles.boton}
                    style={styles.botonEstilo}
                    labelStyle={{color: theme === 'dark' ? '#fff': '#000'}}
                    onPress={()=>guardarPage(page + 1)}
                >
                    Cargar mas...
                </Button>
            )}
        </ScrollView>
    )
}

function Pelicula(props){
    const {pelicula,navigation}=props;
    const {poster_path,title,release_date,vote_count,vote_average,id}=pelicula;
    //console.log(pelicula);

    const navigationBoton=()=>{
        navigation.navigate('Movie',{id:id});
    };
    return(
        <TouchableWithoutFeedback onPress={()=>navigationBoton()}>
            <View style={styles.pelicula}>
                <View style={styles.left}>
                    <Image 
                        style={styles.imagen}
                        source={
                            poster_path ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`} 
                            : noImage
                        }
                    />
                </View>
                <View style={{width:'70%'}}>
                    <Title style={{fontSize:16,marginRight:10}} numberOfLines={2}>{title}</Title>
                    <Text>{release_date}</Text>
                    <PeliculaRating cantVoto={vote_count} promedioVoto={vote_average}/>    
                    <Text style={{fontSize:12,color:'#8697a5',marginTop:5}}>{vote_count} votos</Text>
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    )
}

function PeliculaRating(props){
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
            </View>
    )
}
const styles=StyleSheet.create({
    pelicula:{
        marginBottom:20,
        flexDirection:'row',
        alignItems:'center'
    },
    left:{
        marginRight:20,
    },
    imagen:{
        width:100,
        height:150
    },
    contenedorRating:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:10
    },
    boton:{
        paddingTop:10,
        paddingBottom:30
    },
    botonEstilo:{
        backgroundColor:'transparent',

    }
})
export default Popular;