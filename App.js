import React from 'react';
import {connect} from 'react-redux';
import { Button, View } from 'react-native';
import {createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';

// Ajout des modules de navigation 

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

const HomeStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const ParamStack = createStackNavigator();


const Drawer = createDrawerNavigator();

/*
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );

}
*/


const HomeStackScreen =({navigation})=> (
  <HomeStack.Navigator screenOptions ={{
    headerStyle: {
      backgroundColor: '#009387',
    },
    headerTintColor:'#fff',
  }}>

    <HomeStack.Screen name="Home" component={Home} options={{
      headerLeft:()=>(
        <Icon reverse name='ios-menu' type='ionicon'  color="#009387" size={25} onPress={()=>{navigation.openDrawer();}}   />
      )
    }}
    />

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
    
        <ParamStack.Screen name="Paramètres avancés de recherche" component={AdvancedParam} options={{
          headerLeft:()=>(
            <Icon reverse name='ios-menu' type='ionicon'  color="#009387" size={25} onPress={()=>{navigation.openDrawer();}}   />
          )
        }}
        />
    
      </ParamStack.Navigator>
      )
    


export default function App(){
  return(
    <Provider store={store}>
       <NavigationContainer>
          
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Autour de moi" component={ActivityStackScreen} />
            <Drawer.Screen name="Paramètres avancés" component={ParamStackScreen} />
          </Drawer.Navigator>
     
      </NavigationContainer>  
    </Provider>


  )
} ;