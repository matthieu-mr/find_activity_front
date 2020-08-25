import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body, Row,Form,Picker,Header,Left,Title,Right  } from 'native-base';

import {Marker} from 'react-native-maps';


import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';



function  ListOneActivity(props) {

// let ip = `http://192.168.1.183:3000/` //IP wifi windows
let ip = `http://192.168.56.1:3000/` // ip lan windows

 console.log(props)

 let sportName = props.sport.name
 props.navigation.setOptions({ title:sportName })

// recuperation des types d'activite 
useEffect(()=>{
let lat ="test"
let long ="test"
let dist="test"

  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}sport`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${long}&dist=${dist}&sport=${sportName}`
    })
    var listSportRaw = await requestBDD.json()
    props.listActivity(listSportRaw)
  //  console.log("list sport",listSportRaw)
  }
  recupDonnée()
  
},[])

  return (

  <View style={styles.containerAll}>
       <ListType />
</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    flex: 1, 
    backgroundColor: '#fff', 
  },
  searchField:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
  },
  adressField:{
    flex:1
  },
  distanceField:{
    flex:1
  },  containerMap: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})


function mapStateToProps(state) {
  return { position: state.positionInfo,sport:state.sportName }
}
function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },
    listActivity: function(list) {
      dispatch( {type: 'addList',list:list} )
  },

  }
}


export default connect(
  mapStateToProps, 
    mapDispatchToProps
)(ListOneActivity);


//export default Home