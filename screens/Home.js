import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';
import MapType from './component/MapType';



function  Home(props) {
  const [listActivity, setListActivity]= useState()

  const [adress,setAdress] = useState("Saisissez votre adresse")
  const [distance,setdisctance] = useState(1000)

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

    props.position(location)


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

let adress = response.features[0].properties.label
setAdress(adress)
}

// requete BDD http://192.168.56.1:3000/nature`

/* useEffect(()=>{

  async function recupDonnée(){
   
    var requestBDD = await fetch('http://192.168.1.8:3000/sportlist',{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&distance=${distance}`
    })
    var reponse = await requestBDD.json()
    setListActivity(reponse)
    console.log(reponse)
   
  }
 
  recupDonnée()
 
},[latitude]) */

//  console.log("hello",reponse);


let test =() => {
  
  async function recupDonnée(){
   
    var requestBDD = await fetch('http://192.168.1.8:3000/sportlist',{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&distance=${distance}`
    })
    var reponse = await requestBDD.json()
    setListActivity(reponse)
    console.log(reponse)
   
  }
 
  recupDonnée()
}



  return (

  <View style={styles.containerAll}>
       
        <Button large dark onPress ={() => test()}>
            <Text>Dark Large</Text>
          </Button>
        <Card>
          <CardItem bordered>
              </CardItem>
                <CardItem bordered>
                   <Body>
                      <Text>Adresse</Text>
                        <Item floatingLabel>
                          <Icon active type="FontAwesome" name="map-marker" />
                          <Input placeholder={adress}/>
                        </Item>

                      <Text>Rayon de recherche</Text>
                        <Item floatingLabel >    
                          <Icon active type="MaterialCommunityIcons" name="map-marker-distance" />
                          <Input keyboardType="numeric"  placeholder={distance}/>
                        </Item>
                  </Body>
                </CardItem>
        </Card>
  

      <Tabs>
          <Tab heading={ <TabHeading><Icon name="home" /><Text>Camera</Text></TabHeading>}>
          <MapType />
          </Tab>
          <Tab heading={ <TabHeading><Text>No Icon</Text></TabHeading>}>
          <ListType />
          </Tab>

        </Tabs>

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


function mapStateToProps(state) {
  return { position: state.position }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    }
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);


//export default Home