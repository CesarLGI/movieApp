import React, { useEffect, useState } from 'react';
import {StyleSheet,Platform} from 'react-native';

import {Modal,IconButton,Title} from 'react-native-paper';
import YouTube from 'react-native-youtube';
import {obtenerVideoPeliculaApi} from '../api/movies';
import {WebView} from 'react-native-webview';

const ModalVideo=(props)=>{
    const {show,setShow,idPelicula}=props;


    //state para guardar video de pelicula
    const [video,guardarVideo]=useState(null);
    //console.log(video);
    //obtener videos de pelicula
    useEffect(()=>{
        obtenerVideoPeliculaApi(idPelicula).then((response)=>{
            let idVideo=null;
            response.results.forEach((video)=>{
                if (video.site === 'YouTube' && !idVideo){
                    idVideo=video.key;

                }
            });
            guardarVideo(idVideo);
            
        })
    },[])
    return(
        <Modal visible={show} contentContainerStyle={styles.modal}>
            {Platform.OS=== 'ios'?(
                <YouTube videoId={video} style={styles.video}></YouTube>
            ):(
                <WebView style={{width:400}} source={{uri:`https://www.youtube.com/embed/${video}?controls=0&showinfo=0`}}></WebView>
            )}
            
            <IconButton icon="close"
                onPress={()=>setShow(false)}
                style={styles.cerrar}
            ></IconButton>
        </Modal>
    );
}
const styles=StyleSheet.create({
    modal:{
        backgroundColor:'#000',
        height:'120%',
        alignItems:'center'
    },
    cerrar:{
        backgroundColor:'#1ea1f2',
        width:50,
        height:50,
        borderRadius:100,
        position:'absolute',
        bottom:100
    },
    video:{
        alignSelf:'stretch',
        height:300
    }
})
export default ModalVideo;