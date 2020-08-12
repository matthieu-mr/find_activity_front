import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';

import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body,ListItem,CheckBox,Header,Left,Right,Title  } from 'native-base';
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
  props.navigation.navigate("Liste")
}


  return (
  <View style={styles.containerAll}>

    <View >
        <Card>
                <CardItem bordered>
                   <Body>
                     <View style={styles.searchInput}>
                     <Text style={styles.labelSearch}>Adresse</Text>
                        <Item floatingLabel>
                          <Icon active type="FontAwesome" name="map-marker" />
                          <Input placeholder={adress}/>
                        </Item>
                     </View>

                     <View style={styles.searchInput}>
                      <Text style={styles.labelSearch}>Rayon de recherche</Text>
                        <Item floatingLabel >    
                          <Icon active type="MaterialCommunityIcons" name="map-marker-distance" />
                          <Input keyboardType="numeric"  placeholder={distance}/>
                        </Item>
                      </View>
                  </Body>
                </CardItem>
        </Card>
    </View>


   <View>
        <Card>
          <CardItem header bordered>
            <Text style={styles.labelSearch}>Type d'activité</Text>
              </CardItem>
                <CardItem>
                  <Body>
                  <ListItem style ={styles.searchInput}>
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
    backgroundColor: '#fff', 
  },
searchInput :{
width:Dimensions.get('window').width-40,
marginTop:20
  },
labelSearch:{
  fontSize:20
}
})

export default AdvancedSearch