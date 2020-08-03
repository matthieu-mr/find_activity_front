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
import Home from './screens/Home';
import ListForActivty from './screens/ListForActivity';
import AdvancedParam from './screens/ListForActivity'
import DrawerScreen from './screens/DrawerContent'

// import redux 
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import activitySelected from './reducers/Activity'

const store = createStore(combineReducers({activitySelected}))
const Drawer = createDrawerNavigator();



const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const ParamStack = createStackNavigator();





export default function App(navigation){
  
  return(

    
    <NavigationContainer>
      <DrawerScreen/>
    
    </NavigationContainer>  



  )
} ;