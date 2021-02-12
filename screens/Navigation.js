import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { View,Text,AsyncStorage } from 'react-native';
import * as Linking from 'expo-linking';
import { Icon } from 'native-base';

// Ajout des modules de navigation 
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import ConnectScreen from './login/ConnectScreen'
import AdvancedParam from './AdvancedSearch'
import siginScreen from './login/signin'
import forgotPassword from './login/ForgotPassword'

import ListActivitySortie from './listTypeActivitySortie'
import ListActivtySport from './listTypeActivitySport';

import MapActivity from './showActivity/MapActivity'
import PlaceDetail from './PlaceDetail'

import ParticipantListAdress from './processCreateActivity/ParticipantListAdress'
import SearchAdressParticipant from './processCreateActivity/SearchParticipantAdress'
import MapAllParticipant from './processCreateActivity/mapAllParticipant'

import ContactAdressList from "./savedInformation/ContactAdressList"
import SearchSaveAdress from './savedInformation/SearchSaveAdress'
import ContactActivityList from './savedInformation/ContactActivityList'
import FormChangeInfoAdress from './savedInformation/formModifAdress'




function DrawerContent(props){

  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  //const navigation = useNavigation();

  const Tab = createMaterialTopTabNavigator();
  const [infoUserAsync,setinfoUserAsync] = useState(true)
  

  AsyncStorage.getItem("userInformation", 
      function(error, data){
        setinfoUserAsync(data);
      })


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

      let menuWithSetting ={
        headerLeft:()=>(
          <Icon reverse name='ios-menu' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress={()=>{navigation.openDrawer();}}   />),
          headerRight:()=>(
          <Icon reverse name='ios-settings' type='Ionicons'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {navigation.navigate('Parametres');}}  />
          ), 
      }

      let nothing ={
        headerLeft:()=>(
          <Icon/>),
          headerRight:()=>(
          <Icon  />
          ), 
      }

     // let screenHomeLogged = infoUserAsync ==null ? <Stack.Screen name="Accueil" component={ConnectScreen}/> : <Stack.Screen name="Accueil" component={PlaceDetail} options={menuOnly}/>

      let screenHomeLogged = infoUserAsync ==null ? <Stack.Screen name="Accueil" component={ConnectScreen}/> : <Stack.Screen name="Accueil" component={ParticipantListAdress} options={menuOnly}/>
    return (
    <Stack.Navigator
      screenOptions={{
      headerStyle: {
        backgroundColor: '#0077c2',
        },
        headerTintColor:'#fff',
      }} >

        {screenHomeLogged}
        <Stack.Screen name="Place details" component={PlaceDetail} options={goBack} />
        <Stack.Screen name="SearchAdressParticipant" component={SearchAdressParticipant} options={goBack} />

        <Stack.Screen name="ConnectScreen" component={ConnectScreen} options={nothing}/> 
        <Stack.Screen name="ForgotPassword" component={forgotPassword} options={goBack} /> 

        <Stack.Screen name="ParticipantListAdress" component={ParticipantListAdress} options={menuOnly}/>

        <Stack.Screen name="mapParticipant" component={MapAllParticipant} options={goBack}/>

        <Stack.Screen name="ListActivitySport" component={ListActivtySport} options={goBack} />
        <Stack.Screen name="ListActivitySortie" component={ListActivitySortie} options={goBack} />

        <Stack.Screen name="siginScreen" component={siginScreen} options={goBack} />
        <Stack.Screen name="ContactAdressList" component={ContactAdressList} options={menuOnly} />
        <Stack.Screen name="SearchSaveAdress" component={SearchSaveAdress} options={goBack} />
        <Stack.Screen name="ContactActivityList" component={ContactActivityList} options={menuOnly} />
        <Stack.Screen name="formChangeAdressInfo" component={FormChangeInfoAdress} options={goBack} />
        <Stack.Screen name="Parametres" component={AdvancedParam} options={goBack} />
       
        <Stack.Screen name="MapActivity" component={MapActivity} options={goBack} />

      
    </Stack.Navigator>
    )

  }



const CustomDrawerContent = (props) => {

  let Disconnect = ()=>{
    AsyncStorage.removeItem("userInformation")

    AsyncStorage.getItem("userInformation",
            function(err, data) { 
              var userData = JSON.parse(data); 
            } 
          )
    props.navigation.navigate("ConnectScreen")
  }



  return (
    <DrawerContentScrollView {...props} screenOptions ={{
      headerStyle:{
        backgroundColor:"#5c6bc0"
      },
      headerTintColor:"white"
    }} >


    <DrawerItem 
      label ="Accueil"
      labelStyle={{color:"#0077c2"}}
      onPress={()=>{props.navigation.navigate("ParticipantListAdress");}}
      icon ={()=> <Icon reverse name='ios-home' type='Ionicons' style={{fontSize: 30, color:"#0077c2" }} />}
      />

    <DrawerItem 
      label ="Vos adresses"
      labelStyle={{color:"#0077c2"}}
      onPress={()=>{props.navigation.navigate("ContactAdressList");}}
      icon ={()=> <Icon reverse name='ios-contacts' type='Ionicons' style={{fontSize: 30, color:"#0077c2" }} />}
      />
    
    <DrawerItem 
      label ="  Vos sorties"
      labelStyle={{color:"#0077c2"}}
      onPress={()=>{props.navigation.navigate("ContactActivityList");}}
      icon ={()=> <Icon reverse name='ios-restaurant' type='Ionicons' style={{fontSize: 30, color:"#0077c2"}} />}
      />

<DrawerItem 
style={{ marginTop:20,borderTopWidth:2,borderTopColor: "#42a5f5"}}
      label ="Deconnection"
      labelStyle={{color:"#0077c2"}}
      onPress={()=>Disconnect()}
      icon ={()=> <Icon reverse name='ios-log-out' type='Ionicons' style={{fontSize: 30, color:"#0077c2"}} />}
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