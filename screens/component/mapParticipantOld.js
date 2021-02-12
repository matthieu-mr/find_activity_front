import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage,Dimensions, ScrollView,Text} from 'react-native';
import {Marker} from 'react-native-maps';
import { Spinner } from 'native-base';

import {connect} from 'react-redux';
import MapView, {Callout} from 'react-native-maps';

import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


//import module

function mapComponent(props) {

const navigation = useNavigation();
let lat = props.positionRecupState.lat
let lon = props.positionRecupState.lon
let dist = props.positionRecupState.dist
let markerList = props.listActivity
let carte =  <Spinner color='#009387'  />


let latitudeDelta
let longitudeDelta 



if (lat != undefined ){
    carte = (
        <MapView style={styles.mapStyle} 
        initialRegion={{
        latitude: lat,
        longitude:  lon,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
        }}
    >
            <Marker
            key={"800"}
            coordinate=
            {{
            latitude: lat,
            longitude: lon}}
            title={"Votre position"}
            description={""}
            pinColor="red"
            >
            </Marker>
            {markerListMap}
    </MapView>  
    )
}


  return (
    <View>
        {carte}
</View>
  
  );
}

// STYLES
const styles = StyleSheet.create({
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
})


function mapStateToProps(state) {
  return { listAdress: state.listAdress,rdvPointAdress:state.rdvPointAdress}
}

function mapDispatchToProps(dispatch) {
  return {
    infoPlace: function(info) {
      dispatch( {type: 'callPlace',info:info} )
  },


  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(mapComponent);





//export default ListType