import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { View,Text } from 'react-native';

import { List,ListItem,Body,Left,Thumbnail,Right,Button,Icon,Content, Title  } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Ajout des modules de navigation 
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem,CustomDrawerContent } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';




import Home from './Home'
import ConnectScreen from './login/ConnectScreen'
import ListForActivty from './listTypeActivitySport.js';
import ListOneActivity from './ListOneActivity'
import AdvancedParam from './AdvancedSearch'
import ConnectComponent from './component/ConnectComponent'
import PlaceDetail from './PlaceDetail'
import siginScreen from './login/signin'



import ListActivityType from './listTypeActivitySortie'

import ListActivitySortie from './processCreateActivity/SearchParticipantAdress'
import ParticipantListAdress from './processCreateActivity/ParticipantListAdress'
import SearchAdressParticipant from './processCreateActivity/SearchParticipantAdress'

import ContactAdressList from "./savedInformation/ContactAdressList"
import SearchSaveAdress from './savedInformation/SearchSaveAdress'
import ContactActivityList from './savedInformation/ContactActivityList'
import FormChangeInfoAdress from './savedInformation/formModifAdress'
import MapActivity from './MapActivity'





function DrawerContent(props){

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  //const navigation = useNavigation();

  const Tab = createMaterialTopTabNavigator();




  const Screens = ({navigation}) => {
    let goBack = {
      headerLeft:()=>(
      <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
      headerRight:()=>(
      <Icon  />
          ),
      }
  
  
      let menuOnly ={
        headerLeft:()=>(
          <Icon reverse name='ios-menu' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress={()=>{navigation.openDrawer();}}   />),
      }

      let menu ={
        headerLeft:()=>(
          <Icon reverse name='ios-menu' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress={()=>{navigation.openDrawer();}}   />),
          headerRight:()=>(
          <Icon reverse name='ios-settings' type='Ionicons'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {navigation.navigate('Parametres');}}  />
          ), 
      }

    return (
    <Stack.Navigator
      screenOptions={{
      headerStyle: {
        backgroundColor: '#0077c2',
        },
        headerTintColor:'#fff',
      }} >

      <Stack.Screen name="Accueil" component={ConnectScreen}/>

        <Stack.Screen name="Place details" component={PlaceDetail} options={goBack} />
        <Stack.Screen name="Liste" component={ListForActivty} options={menu} />
        
        
        <Stack.Screen name="ParticipantListAdress" component={ParticipantListAdress} options={menuOnly} />
        <Stack.Screen name="SearchAdressParticipant" component={SearchAdressParticipant} options={goBack} />


        
        <Stack.Screen name="ListActivityType" component={ListActivityType} options={goBack} />

        <Stack.Screen name="ListOneActivity" component={ListOneActivity} options={goBack} />
        <Stack.Screen name="ListActivitySortie" component={ListActivitySortie} options={goBack} />
        <Stack.Screen name="siginScreen" component={siginScreen} options={goBack} />
        <Stack.Screen name="ContactAdressList" component={ContactAdressList} options={goBack} />
        <Stack.Screen name="SearchSaveAdress" component={SearchSaveAdress} options={goBack} />
        <Stack.Screen name="ContactActivityList" component={ContactActivityList} options={goBack} />
        <Stack.Screen name="formChangeAdressInfo" component={FormChangeInfoAdress} options={goBack} />
        <Stack.Screen name="Parametres" component={AdvancedParam} options={goBack} />
       
        <Stack.Screen name="ConnectionItem" component={ConnectComponent} />

    </Stack.Navigator>
    )

  }



const CustomDrawerContent = (props) => {
  return (

    <DrawerContentScrollView {...props} screenOptions ={{
      headerStyle:{
        backgroundColor:"#5c6bc0"
      },
      headerTintColor:"white"
    }} >


    <DrawerItem 
      label ="Accueil"
      labelStyle={{marginLeft:-16}}
      onPress={()=>{props.navigation.navigate("Accueil");}}
      icon ={()=> <Icon reverse name='ios-home' type='Ionicons' style={{fontSize: 30, color:"#009387" }} />}
      />

    <DrawerItem 
      label ="Vos adresses"
      labelStyle={{marginLeft:-16}}
      onPress={()=>{props.navigation.navigate("ContactAdressList");}}
      icon ={()=> <Icon reverse name='ios-list' type='Ionicons' style={{fontSize: 30, color:"#009387" }} />}
      />
    
    <DrawerItem 
      label ="Vos sorties"
      labelStyle={{marginLeft:-16}}
      onPress={()=>{props.navigation.navigate("ContactActivityList");}}
      icon ={()=> <Icon reverse name='ios-list' type='Ionicons' style={{fontSize: 30, color:"#009387" }} />}
      />

    <DrawerItem 
      label ="Parametres"
      labelStyle={{marginLeft:-16}}
      onPress={()=>{props.navigation.navigate("Parametres");}}
      icon ={()=> <Icon reverse name='ios-settings' type='Ionicons' style={{fontSize: 30, color:"#009387" }} />}
      />

    </DrawerContentScrollView>

  )

}



  return(
    <View style ={{flex:1,display:"flex"}}>
        <Drawer.Navigator initialRouteName="Place details"  drawerContent={props=> <CustomDrawerContent {...props} /> }   >
          <Drawer.Screen name="Screens" component={Screens} />
      </Drawer.Navigator>
    </View>


  )
} ;





export default DrawerContent