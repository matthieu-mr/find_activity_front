import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import { Button, View } from 'react-native';

import './global'
// Ajout des modules de navigation 

import { NavigationContainer } from '@react-navigation/native';


//import icon and Style
import { Icon } from 'react-native-elements'



// import screen

import DrawerScreen from './screens/DrawerContent'

// import redux 
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// import reducer 
import listActivity from './reducers/Activity'
import positionInfo from './reducers/Position'
import listType from './reducers/TypeActivity'
import infoPlace from './reducers/InfoPlace'
import sportName from './reducers/SportName'

const store = createStore(combineReducers({listActivity, positionInfo,listType,infoPlace,sportName}))

export default function App(navigation){
  
  return(

    <Provider store={store}>
    <NavigationContainer>
        <DrawerScreen/>
      </NavigationContainer>  
    </Provider>



  )
} ;