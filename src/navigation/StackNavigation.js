import React from 'react';
import {IconButton} from 'react-native-paper'
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import  News from '../screens/News';
import Search from '../screens/Search';
import Popular from '../screens/Popular';
import {useNavigation} from '@react-navigation/native'
const Stack=createStackNavigator();

const StackNavigation=()=>{

    const navigation=useNavigation();
    const buttonLeft=(screen)=>{
        switch(screen){
            case 'Search':
            case 'Movie':    
                return(
                    <IconButton icon="arrow-left" onPress={()=>navigation.goBack()}></IconButton>
                );
            default:
                return(
                    <IconButton icon="menu" onPress={()=>navigation.openDrawer()}></IconButton>
                );
        }
        
    };

    const buttonRight=()=>{
        return(
            <IconButton icon="magnify" onPress={()=>navigation.navigate('Search')}></IconButton>
        )
    }
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
             name="Home"
             component={Home} 
             options={{title:'TheMovieApp',
                headerLeft:()=>buttonLeft('Home'), 
                headerTitleAlign:'center',
                headerRight:()=>buttonRight()}}
            />
            <Stack.Screen 
             name="Movie" 
             component={Movie}
             options={{title:'',
                headerLeft:()=>buttonLeft('Movie'),
                headerTitleAlign:'center',
                headerTransparent:true}}  //encabezado transparente  
            />
            <Stack.Screen
             name="News" 
             component={News}
             options={{title:'Nuevas Peliculas',
                headerLeft:()=>buttonLeft('News'),
                headerTitleAlign:'center',
                headerRight:()=>buttonRight()}}
             />
            <Stack.Screen 
             name="Popular" 
             component={Popular}
             options={{title:'Peliculas Populares',
                headerLeft:()=>buttonLeft('Popular'),
                headerTitleAlign:'center',
                headerRight:()=>buttonRight()}} 
            />
            <Stack.Screen 
             name="Search" 
             component={Search}
             options={{title:'',
                headerTransparent:true,
                headerLeft:()=>buttonLeft('Search'),
                headerTitleAlign:'center'}}
             />
        </Stack.Navigator>
    )
}
export default StackNavigation;