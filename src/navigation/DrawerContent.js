import React,{useState} from 'react';
import {View,StyleSheet} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer'
import {Drawer,Switch,TouchableRipple,Text} from 'react-native-paper'
import usePreferences from '../hooks/usePreferences';

const DrawerContent=(props)=>{

    //const navigation=useNavigation();
    const {navigation}=props;

    //obtenemos hook usepreferences oara tema oscuro y claro
    const {theme,toggleTheme}=usePreferences();
    //console.log(data)

    //indicar en q pagina se encuentra
    const [active,guardarActive]=useState('Home')

    //
    const onChangeScreen=(screen)=>{
        //console.log(screen);
        guardarActive(screen);
        navigation.navigate(screen);
    }
    return(
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item 
                 label="Inicio"
                 active={active === 'Home' && true}
                 onPress={()=>onChangeScreen('Home')}
                />
                <Drawer.Item 
                 label="Peliculas Populares"
                 active={active === 'Popular' && true}
                 onPress={()=>onChangeScreen('Popular')}
                />
                <Drawer.Item 
                 label="Nuevas Peliculas"
                 active={active === 'News' && true}
                 onPress={()=>onChangeScreen('News')}
                />
                
            </Drawer.Section>
            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.preferences}>
                        <Text>Tema Oscuro</Text>
                        <Switch value={theme === 'dark'} onValueChange={toggleTheme}></Switch>
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}
const styles=StyleSheet.create({
    preferences:{
        flexDirection:'row',
        justifyContent:'space-between', //para q se vaya uno a la derecha y otro a la izquierda
        alignItems:'center',
        paddingVertical:12,
        paddingHorizontal:16
    }
})
export default DrawerContent;