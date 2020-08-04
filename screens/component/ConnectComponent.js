import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { View,Text } from 'react-native';
import { Link } from '@react-navigation/native';
import { List,ListItem,Body,Left,Thumbnail,Right,Button,Icon,Content  } from 'native-base';

// Ajout des modules de navigation 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem,CustomDrawerContent } from '@react-navigation/drawer';

import test from '../Connect'
import connectScreen from '../Connect'


function DrawerConnect(props) {
 

  const  [connected,setConnected] = useState(true)
const ConnectScreen =({navigation}) => {

  if (connected) {
    return (
      <Content>
        <List>
          <ListItem avatar>
            <Left>
              <Thumbnail source={{ uri: 'Image URL' }} />
            </Left>
            <Body>
              <Text>Kumar Pratik</Text>
              <Text note>Doing what you like will always keep you happy . .</Text>
            </Body>
          </ListItem>
        </List>
        </Content>
      )
    } 
    else{
      return (          
      
    
      <Text>Kumar Pratik</Text>
      

        )
    }
  }


  

return (
<ConnectScreen />
)

}

export default DrawerConnect