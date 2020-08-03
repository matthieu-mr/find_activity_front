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



const HomeStackScreen =({navigation})=> (
  <HomeStack.Navigator screenOptions ={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor:'#fff',
  }}>
      <HomeStack.Screen name="Home" component={Home} 
              options={{
                title:"Accueil",
                headerLeft:()=>(
                  <Icon reverse name='ios-menu' type='ionicon'  color="#009387" size={25} onPress={()=>{navigation.openDrawer();}}   />
                )
              }} />

</HomeStack.Navigator>
  



  )


  const ActivityStackScreen =({navigation})=> (
    <ActivityStack.Navigator screenOptions ={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor:'#fff',
    }}>

      <ActivityStack.Screen name="Autour de moi" component={ListForActivty} 
      options={{
        headerLeft:()=>(
          <Icon reverse name='ios-menu' type='ionicon'  color="#009387" size={25} onPress={()=>{navigation.openDrawer();}}   />
        )
      }}
      />
    </ActivityStack.Navigator>
    )
  
  
    const ParamStackScreen =({navigation})=> (
      <ParamStack.Navigator screenOptions ={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor:'#fff',
      }}>
    
        <ParamStack.Screen name="Parametre" component={AdvancedParam} options={{
          headerLeft:()=>(
            <Icon reverse name='ios-setting' type='ionicon'  color="#009387" size={25} onPress={()=>{navigation.openDrawer();}}   />
          )
        }}
        />
    
      </ParamStack.Navigator>
      )
    





export default function App(navigation){
  
  return(

    
    <NavigationContainer>



      <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" children ={HomeStackScreen} />
            <Drawer.Screen name="Autour de moi" component={ActivityStackScreen} />
            <Drawer.Screen name="Paramètres avancés" component={ParamStackScreen} />
          </Drawer.Navigator>


    
    
    </NavigationContainer>  



    /*
    <Provider store={store}>

      <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerStyle:{
              backgroundColor:"#102027"
            },
            headerTintColor:'#fff'
          }}>
              <Stack.Screen name="Home" component={Home} 
                      options={{
                        title:"Accueil"
                      }} />
              <Stack.Screen name="activity" component={ListForActivty}
                      options={{
                        title:"Liste des activités"
                      }} />
              <Stack.Screen name="Parametre" component={AdvancedParam} 
                      options={{
                        title:"Paramètres"
                      }}/>
      </Stack.Navigator>

          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" children ={HomeNavigator} />
            <Drawer.Screen name="Autour de moi" component={ActivityStackScreen} />
            <Drawer.Screen name="Paramètres avancés" component={ParamStackScreen} />
          </Drawer.Navigator>
     
     
    </Provider>
*/

  )
} ;