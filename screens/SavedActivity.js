import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';

import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';
import MapType from './component/MapType';



function  SavedActivity(props) {


  return (
  <View style={styles.containerAll}>
    <Text> Saved activity</Text>
</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    flex: 1, 
    backgroundColor: '#fff', 
  },
  containerAdress:{
    flex:1,
    height:500,
  },
  searchAdress: {
    alignItems: 'stretch',
    width:250,
  },

  containerType: {
    flex:1,
    backgroundColor: '#fff',

  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  containerMap: {
    flex:4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  containerAdress :{
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'stretch',
  },

})


export default SavedActivity