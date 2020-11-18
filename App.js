import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import { Button, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
/*
import * as firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyCSvw_UHC_S8lPG4TNC97oNRlUznaDZ4mA",
  authDomain: "entre-nous-5d8d8.firebaseapp.com",
  databaseURL: "https://entre-nous-5d8d8.firebaseio.com",
  projectId: "entre-nous-5d8d8",
  storageBucket: "entre-nous-5d8d8.appspot.com",
  messagingSenderId: "805275159192",
  appId: "1:805275159192:web:e27b209a4685296b32deed",
  measurementId: "G-832DG1NTZW"
};
firebase.initializeApp(firebaseConfig)
*/

// import font
const fetchFonts = () => {
  return Font.loadAsync({
    'Sansita-Bold': require('./assets/fonts/SansitaSwashed-Bold.ttf'),
    'Sansita-Medium': require('./assets/fonts/SansitaSwashed-Medium.ttf'),
    'Monserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Monserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
    'Monserrat-Italic': require('./assets/fonts/Montserrat-Italic.ttf'),
    'Monserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Baskerville-Black': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
    'Baskerville-Medium': require('./assets/fonts/LibreBaskerville-Regular.ttf')

    });
  };



import './global'
// Ajout des modules de navigation 

import { NavigationContainer } from '@react-navigation/native';


// import screen

import Navigation from './screens/Navigation'

// import redux 
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// import reducer 
import listActivity from './reducers/Activity'
import listType from './reducers/TypeActivity'
import infoPlace from './reducers/InfoPlace'
import listAdress from './reducers/ListAdressParticipant'
import actionOnSaved from './reducers/Bool_Modification'
import infoFormAdress from './reducers/formInformationsAdress'
import userInformation from './reducers/UserInformation'
import rdvPointAdress from './reducers/RdvPointAdress'

const store = createStore(combineReducers({listActivity,listType,infoPlace,listAdress,actionOnSaved,infoFormAdress,userInformation,rdvPointAdress}))
//const store = createStore(combineReducers({listActivity,listType,infoPlace,listAdress,actionOnSaved,infoFormAdress,userInformation,rdvPointAdress}))




export default function App(navigation){
  const [dataLoaded,SetDataLoaded] = React.useState(false)
  if(!dataLoaded){
    return (
      <AppLoading
       startAsync={fetchFonts}
       onFinish={()=>SetDataLoaded(true)}
       />
    )
  }
  return(
    <Provider store={store}>
    <NavigationContainer>
        <Navigation/>
      </NavigationContainer>  
    </Provider>

  )
} ;