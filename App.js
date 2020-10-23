import React,{useMemo,useState} from 'react';
import {Provider as PaperProvider,DarkTheme as DarkThemePaper,DefaultTheme as DefaultThemePaper} from 'react-native-paper';

import {NavigationContainer,DarkTheme as DarkThemeNav,DefaultTheme as DefaultThemeNav, DarkTheme, DefaultTheme} from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import PreferencesContext from './src/context/PreferencesContext';

const App=()=>{
  //console.log(DefaultThemePaper);
  DefaultThemePaper.colors.primary='#1ae1f2';
  DarkThemePaper.colors.primary='#1ae1f2';
  DarkThemePaper.colors.accent='#1ae1f2';

  DarkThemeNav.colors.background='#192734';
  DarkThemeNav.colors.card='#15212b';

  //state del tema
  const [theme,guardarTheme]=useState('dark')

  //cambiar de tema oscuro a claro,vicerversa
  const toggleTheme=()=>{
    guardarTheme(theme === 'dark' ? 'light' : 'dark ');
    guardarTheme(theme === 'light' ? 'dark' : 'light');
  }
  const preference=useMemo(
    ()=>({
      toggleTheme,
      theme,
    }),
    [theme],
  );

  return(
    <PreferencesContext.Provider value={preference}>
      <PaperProvider theme={theme === 'dark' ? DarkThemePaper: DefaultThemePaper }>
        <NavigationContainer theme={theme === 'dark' ? DarkThemeNav : DefaultThemeNav}>
          <Navigation>
          
          </Navigation>
        </NavigationContainer>
      
      </PaperProvider>
    </PreferencesContext.Provider>
    
    
  )
}
export default App;
