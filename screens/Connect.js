import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';


import { LoginButton } from 'react-native-fbsdk';
import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


import * as Location from 'expo-location';




function  Connect(props) {



  return (

    <View>
        <Text>Ajout function</Text>
    <LoginButton
      publishPermissions={["email"]}
      onLoginFinished={
        (error, result) => {
          if (error) {
            alert("Login failed with error: " + error.message);
          } else if (result.isCancelled) {
            alert("Login was cancelled");
          } else {
            alert("Login was successful with permissions: " + result.grantedPermissions)
          }
        }
      }
      onLogoutFinished={() => alert("User logged out")}/>
  </View>
);


}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    flex: 1, 
    backgroundColor: '#fff', 
  },

})


export default Connect