import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { View,Text } from 'react-native';

import { List,ListItem,Body,Left,Thumbnail,Right,Button,Icon,Content  } from 'native-base';

// Ajout des modules de navigation 
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItem,CustomDrawerContent } from '@react-navigation/drawer';

import Home from './Home'
import ConnectScreen from './Connect'
import ListForActivty from './ListForActivity';
import ListOneActivity from './ListOneActivity'
import AdvancedParam from './AdvancedSearch'
import ConnectComponent from './component/ConnectComponent'
import PlaceDetail from './PlaceDetail'
import SearchAdress from './SearchAdress'
import ListComponent from './component/ListType'


function DrawerContent(props){

  const  [connected,setConnected] = useState(false)


  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();

  const Screens = ({navigation}) => {
    
    return (
    <Stack.Navigator
    >
      <Stack.Screen name="Accueil" component={Home}                  
      options={{ 
        headerLeft:()=>(
          <Icon reverse name='ios-menu' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress={()=>{navigation.openDrawer();}}   />
        ),
        headerRight:()=>(
                    <Icon reverse name='ios-settings' type='Ionicons'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {navigation.navigate('Parametres');}}  />
                    ), 
                  headerStyle: {
                    backgroundColor: '#009387',
                  },
                  headerTintColor:'#fff',
                      }} />


      <Stack.Screen name="ListOneActivity" component={ListOneActivity} 
                 options={{
                  headerLeft:()=>(
                    <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
                  headerRight:()=>(
                    <Icon  />
                  ), 
                  headerStyle: {
                    backgroundColor: '#009387',
                  },
                  headerTintColor:'#fff',
                      }} />

      <Stack.Screen name="ListComponent" component={ListComponent} 
                options={{
                  headerLeft:()=>(
                    <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
                  headerRight:()=>(
                    <Icon  />
                  ), 
                  headerStyle: {
                    backgroundColor: '#009387',
                  },
                  headerTintColor:'#fff',
                      }} />
      
      <Stack.Screen name="SearchAdress" component={SearchAdress}
          options={{
            headerLeft:()=>(
              <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
            headerRight:()=>(
              <Icon  />
            ), 
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor:'#fff',
                }} />

      <Stack.Screen name="Place details" component={PlaceDetail}
                 options={{
                  headerLeft:()=>(
                    <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
                  headerRight:()=>(
                    <Icon reverse name='ios-settings' type='Ionicons'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {navigation.navigate('Parametres');}}  />
                    ), 
                  headerStyle: {
                    backgroundColor: '#009387',
                  },
                  headerTintColor:'#fff',
                      }} />

      <Stack.Screen name="Liste" component={ListForActivty} 
                options={{
                  headerLeft:()=>(
                    <Icon reverse name='ios-menu' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress={()=>{navigation.openDrawer();}}   />
                  ),
                  headerRight:()=>(
                    <Icon reverse name='ios-settings' type='Ionicons'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {navigation.navigate('Parametres');}}  />
                  ), 
                  headerStyle: {
                    backgroundColor: '#009387',
                  },
                  headerTintColor:'#fff',
                      }}
              />
      
      
      <Stack.Screen name="Parametres" component={AdvancedParam} 
          options={{
            headerLeft:()=>(
              <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
              headerRight:()=>(
              <Icon />
            ), 
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor:'#fff',
                }}
        />

        {/*   <Stack.Screen name="Connection" component={ConnectScreen}  /> */} 
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} 
          options={{
            headerLeft:()=>(
              <Icon reverse name='arrow-back' type='Ionicons'  color="#009387" size={25} style={{ marginLeft: 10, color:"white" }} onPress ={()=> navigation.goBack()}  />        ),
              headerRight:()=>(
              <Icon />
            ), 
            headerStyle: {
              backgroundColor: '#009387',
            },
            headerTintColor:'#fff',
                }}
        />
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
      label ="Liste complète des activités"
      labelStyle={{marginLeft:-16}}
      onPress={()=>{props.navigation.navigate("Liste");}}
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
        <Drawer.Navigator initialRouteName="PlaceDetail"  drawerContent={props=> <CustomDrawerContent {...props} /> }   >
        <Drawer.Screen name="Screens" component={Screens} />
      </Drawer.Navigator>
    </View>


  )
} ;





export default DrawerContent