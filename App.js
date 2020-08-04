import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import { Button, View } from 'react-native';


// Ajout des modules de navigation 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import icon and Style
import { Icon } from 'react-native-elements'



// import screen

import DrawerScreen from './screens/DrawerContent'

// import redux 
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// import reducer 
import listActivity from './reducers/Activity'
import position from './reducers/Position'



const store = createStore(combineReducers({listActivity, position}))

export default function App(navigation){
  
  return(

    <Provider store={store}>
    <NavigationContainer>
        <DrawerScreen/>
      </NavigationContainer>  
    </Provider>



  )
} ;