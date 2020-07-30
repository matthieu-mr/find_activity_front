import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';

import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body,ListItem,CheckBox  } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


import * as Location from 'expo-location';

function AdvancedSearch(props) {
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

    console.log(location)

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
  console.log("retour api gouv =======>",adress)
}




let test = ()=> {
  getAdressCoords() ;
}


  return (
  <View style={styles.containerAll}>


      <Text>Recherche avancée</Text>


    <View style={styles.containerType}>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Type d'activité</Text>
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
      </Content>
    </View>


   <View style={styles.containerType}>
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Text>Type d'activité</Text>
              </CardItem>
                <CardItem bordered>
                  <Body>
                  <ListItem>
                      <CheckBox checked={true} />
                        <Text>     Daily Stand Up</Text>
                    </ListItem>
                  
                  <ListItem>
                      <CheckBox checked={true} />
                        <Text>    Daily Stand Up</Text>
                    </ListItem>
                    <ListItem>
                      <CheckBox checked={false} />
                        <Text>    Daily Stand Up</Text>
                    </ListItem>
                    <ListItem>
                      <CheckBox checked={true} />
                        <Text>  Daily Stand Up</Text>
                    </ListItem>
                  </Body>
                </CardItem>
        </Card>
      </Content>
    </View>


      <Button full onPress={()=>test()}>
        <Text>Valider</Text>
      </Button>


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
  },

  containerType: {
    flex:1,
    backgroundColor: '#fff',
  },

})

export default AdvancedSearch