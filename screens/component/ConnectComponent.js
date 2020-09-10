import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux';
import { View,Text,Image } from 'react-native';
import { Link } from '@react-navigation/native';
import { List,ListItem,Body,Left,Thumbnail,Right,Button,Icon,Content  } from 'native-base';



function DrawerConnect(props) {
 

  //const exampleImage = require('findactivity/assets/logo.png')




  const  [connected,setConnected] = useState(true)
const ConnectScreen =({navigation}) => {

  if (connected) {
    return (
      <Content>
       
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