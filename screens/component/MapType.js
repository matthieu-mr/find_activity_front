import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage,Container,TextInput,Dimensions,ScrollView,Text  } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';

import { Button,Item, Input, Icon,Label } from 'native-base';
import {Marker} from 'react-native-maps';

function MapType(props) {





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
  containerMap: {
    flex:1,
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

function mapStateToProps(state) {
  return { listActivity: state.listActivity }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },

  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MapType);



//export default MapType