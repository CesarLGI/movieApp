import React,{useState,useEffect} from 'react';
import {StyleSheet,View,SafeAreaView,Image,TouchableWithoutFeedback,Dimensions,Platform,ScrollView} from 'react-native';
import {Searchbar,Text} from 'react-native-paper';
import {size,map} from 'lodash';
import {buscarPeliculaApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants'

const {width}=Dimensions.get('window')
const Search=(props)=>{
    const {navigation}=props;
    const [peliculas,guardarPeliculas]=useState(null);

    //state para busquedas
    const [busqueda,guardarBusqueda]=useState('');

    console.log(peliculas);
    useEffect(()=>{
        if (size(busqueda) > 2){
            buscarPeliculaApi(busqueda).then((response)=>{
                guardarPeliculas(response.results);
            });
        }
        
    },[busqueda])
    return(
        <View>
            <Searchbar placeholder="Busca tu pelicula" iconColor={Platform.OS === 'ios' && 'transparent'} style={styles.buscador}
                icon="arrow-left"
                onChangeText={(texto)=>guardarBusqueda(texto)}
            />
            <ScrollView>
                <View style={styles.contenedorBusqueda}>
                {map(peliculas,(pelicula,index)=>(
                    <Pelicula key={index} pelicula={pelicula} navigation={navigation}/>
                ))}
                </View>
            </ScrollView>
        </View>
    )
}
function Pelicula(props){
    const {pelicula,navigation}=props;
    const {poster_path,title,id}=pelicula;
    return(
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Movie',{id:id})}>
            <View style={styles.pelicula}>
                {poster_path ?(
                    <Image source={{uri:`${BASE_PATH_IMG}/w500/${poster_path}`}} style={styles.imagen}/>
                ):(
                    <Text>{title}</Text>
                )}
                
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles=StyleSheet.create({
    buscador:{
        marginTop:-3,
        backgroundColor:'#15212b'
    },
    contenedorBusqueda:{
        flex:1,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    pelicula:{
        width:width / 2,
        height:300,
        justifyContent:'center',
        alignItems:'center'
    },
    imagen:{
        width:'100%',
        height:'100%'
    }
})
export default Search;