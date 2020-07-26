import React from 'react';
import { Button, View } from 'react-native';
import {createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';

// Ajout des modules de navigation 

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Home from './screens/Home';
import ListForActivty from './screens/ListForActivity';




const HomeStack = createStackNavigator();
const ActivityStack = createStackNavigator();
const Drawer = createDrawerNavigator();


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


  

const HomeStackScreen =({navigation})=> (
  <HomeStack.Navigator screenOptions ={{
    headerStyle: {
      backgroundColor: '#009387',
    },
  }}>

    <HomeStack.Screen name="Home" component={Home} />

  </HomeStack.Navigator>
  )


  const ActivityStackScreen =({navigation})=> (
    <ActivityStack.Navigator screenOptions ={{
      headerStyle: {
        backgroundColor: '#009387',
      },
    }}>

      <ActivityStack.Screen name="Home" component={ListForActivty} />
    </ActivityStack.Navigator>
    )
  
  



export default function App(){
  return(
     
       <NavigationContainer>
          
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Autour de moi" component={ActivityStackScreen} />
          </Drawer.Navigator>

      </NavigationContainer>  


  )
} ;