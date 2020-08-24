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

//let ip = "192.168.1.102:3000" // ip ext
 let ip = `http://192.168.1.43:3000/`


// recuperation des types d'activite 
useEffect(()=>{

  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}sport`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      //body:`lat=${latitude}&long=${longitude}&dist=${distance}`
    })
    var listSportRaw = await requestBDD.json()
    props.listActivity(listSportRaw)
    console.log("list sport",listSportRaw)
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
  return { position: state.position,activity:state.listType }
}

function mapDispatchToProps(dispatch) {
  return {
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