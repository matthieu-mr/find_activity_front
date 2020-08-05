import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage,Container,TextInput,Dimensions,ScrollView,Text  } from 'react-native';
import MapView from 'react-native-maps';

import { Button,Item, Input, Icon,Label } from 'native-base';
import {Marker} from 'react-native-maps';

function MapType(props) {


  return (
   
    <View style={styles.containerMap}>
            <Button full onPress={()=>test()}>
              <Text>Primary</Text>
            </Button>

        <MapView style={styles.mapStyle} 

          initialRegion={{
          latitude: 48.866667,
          longitude:  2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}

        >
  <Marker
    coordinate={{latitude: 48.866667, longitude: 2.333333}}
  />


        </MapView>

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

export default MapType