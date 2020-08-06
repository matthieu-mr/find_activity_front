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



function  ListForActivity(props) {
  const [natureList, setListNature] = useState()

  const [adress,setAdress] = useState("Saisissez votre adresse")
  const [distance,setdisctance] = useState("10 km")


// requete BDD
    useEffect(()=>{
      recupDonnée()
    //  console.log("hello",reponse);
    })

    async function recupDonnée(){
      var requestBDD = await fetch(`http://192.168.56.1:3000/nature`)
      var reponse = await requestBDD.json()
    }
    
// recuperation de la location
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

const [latitude,setLatitude] = useState();
const [longitude,setLongitude] = useState();


useEffect(() => {
  (async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);



    setLatitude(location.coords.latitude)
    setLongitude(location.coords.longitude)
    getAdressCoords(location.coords.longitude,location.coords.latitude)
  })();
},[]);


let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}


// Ajout des inputs & saisie adresse



 
let getAdressCoords =async (lon,lat)=> {
  let lon2 = 2.37
  let lat2 = 48.357

var rawResponse =await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357&type=street`)



var response = await rawResponse.json();
// var response = JSON.parse(list.getBody())

let adress = response.features[0].properties.label
setAdress(adress)
 
}




let test = ()=> {
  getAdressCoords() ;
}


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


export default ListForActivity