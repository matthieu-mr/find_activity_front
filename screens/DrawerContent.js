import 'react-native-gesture-handler';
import React from 'react';
import {connect} from 'react-redux';
import { View,Text } from 'react-native';

import { List,ListItem,Body,Left,Thumbnail,Right,Button,Icon  } from 'native-base';

// Ajout des modules de navigation 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';




export default function DrawerContent(props){
  
  return(
    <View style ={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <View>
f

          <ListItem icon onPress ={()=> props.navigation.navigate('Parametre')}>
            <Left>
              <Button style={{ backgroundColor: "#007AFF" }}>
                <Icon active name="wifi" />
              </Button>
            </Left>
            <Body>
              <Text>Wi-Fi</Text>
            </Body>
            </ListItem>
        </View>


      </DrawerContentScrollView>
          
    </View>


  )
} ;