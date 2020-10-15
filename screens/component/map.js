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


switch(dist){
  case "5000":
    latitudeDelta = 0.07
    longitudeDelta =0.07
    break;

  case "10000":
      latitudeDelta =0.25
      longitudeDelta = 0.35
    break;

  case "15000":
    latitudeDelta = 1.50
    longitudeDelta =1.50
    break;

  case "30000":
    latitudeDelta = 1.50
    longitudeDelta =1.50
    break;

  case "50000":
    latitudeDelta = 1.50
    longitudeDelta =1.50
    break;

    default:
      latitudeDelta = 0.07
      longitudeDelta =0.07
}



let markerListMap   



let goPlaceDetails = (name,lat,lon,item) => {
    let infoToSend = {
      name:name,
      lat:lat,
      long:lon,
      item:item
    }
    props.infoPlace(infoToSend)
    navigation.navigate("Place details")
  }
  
markerListMap = markerList.map((item,i)=>{
    
    let actlib = item.fields.actlib
    let name = item.fields.insnom
    let lat = item.fields.gps[0]
    let lon = item.fields.gps[1]

    return (
        <Marker Button
        key={i}
        coordinate={{latitude: lat,
        longitude: lon}}
        title={actlib}
        description={name}
        pinColor="blue"
    >

      <Callout tooltip onPress={() => {goPlaceDetails(name,lat, lon,item);}}>
        <View style={{backgroundColor:'white',padding:20}} > 
            <Text style={{fontSize:20}} > {name}</Text>
            <Text  style={{fontSize:15}}> Activité proposée : {actlib}</Text>
        </View>

      </Callout> 
  
    </Marker>
      )



})




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
  return { listActivity: state.listActivity, positionRecupState: state.positionInfo}
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