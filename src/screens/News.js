import React,{useState,useEffect} from 'react';
import {View,ScrollView,Image,StyleSheet,Dimensions,TouchableWithoutFeedback} from 'react-native';
import {Text,Title,Button} from 'react-native-paper';
import {obtenerNuevasPeliculasApi} from '../api/movies'
import {map} from 'lodash';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

//sacar las dimensiones de la pantalla
const {width}=Dimensions.get('window');

const News=(props)=>{

    const {navigation}=props;

    //state para guardar las peliculas
    const [peliculas,guardarPeliculas]=useState(null);

    //state para numeros de pagina de peliculas
    const [page,guardarPage]=useState(1);
    //state para mostrar boton de cargar mas peiculas
    const [mostrarBoton,guardarMostrarBoton]=useState(true);
    //obtener el tema q estamos usando,claro u oscuro
    const {theme}=usePreferences();
    //obtener peliculas de la api
    useEffect(()=>{
        obtenerNuevasPeliculasApi(page).then((response)=>{
            const totalPaginas=response.total_pages;
            if (page< totalPaginas){
                if (!peliculas){
                    guardarPeliculas(response.results);
                } else {
                    guardarPeliculas([...peliculas,...response.results])
                }

            } else{
                guardarMostrarBoton(false);
            }
            
        })
    },[page])

    return(
        <ScrollView>
            <View style={styles.contenedorPelicula}>
                {map(peliculas,(pelicula,index)=>(
                    <Pelicula key={index} pelicula={pelicula} navigation={navigation}></Pelicula>
                ))}
            </View>
            {mostrarBoton && (
                <Button mode='contained' contentStyle={styles.cargarPeliculas} style={styles.cargar}
                    labelStyle={{color: theme  === 'dark' ? '#fff': '#000'}}
                    onPress={()=>guardarPage(page + 1)}
                >Cargar mas..</Button>
            )}
        </ScrollView>
    )
}

function Pelicula(props){
    const {pelicula,navigation}=props;
    const {title,id,poster_path}=pelicula;

    return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Movie',{id:id})}>
            <View style={styles.pelicula}>
            {poster_path ? (
                <Image style={styles.imagen}
                    source={{uri:`${BASE_PATH_IMG}/w500/${poster_path}`}}
                />
                ): (
                    <Text>{title}</Text>
                )}
            </View>
        </TouchableWithoutFeedback>
        
    )
}
const styles=StyleSheet.create({
    contenedorPelicula:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap' //luego de q termine la fila agregar otra abajo con los siguientes elemetnos
    },
    pelicula:{
        width:width/2,
        height:300,
        justifyContent:'center',
        alignItems:'center'
    },
    imagen:{
        width:'100%',
        height:'100%'
    },
    cargarPeliculas:{
        paddingTop:10,
        paddingBottom:30
    },
    cargar:{
        backgroundColor:'transparent'
    }
})
export default News;