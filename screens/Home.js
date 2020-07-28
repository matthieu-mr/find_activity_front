import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native';
import { Container, Header,Text,Form, Item, Input, Icon, Tab, Tabs, TabHeading,ScrollableTab } from 'native-base';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import * as Location from 'expo-location';


//import tab
import Tab1 from './ListForActivity';
import Tab2 from './ListForActivity';
import Tab3 from './ListForActivity';

function Home(props) {
  const [natureList, setListNature] = useState()

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
    
  })();
});


let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}

// Ajout des inputs 

const [adress,setAdress] = useState("test")

 

let test = ()=> {
  recupDonnée()
}


  return (
    <View>
          
          <Text h1>Le type d'activité 25</Text>
          
          <Item floatingLabel>
          <Icon active type="FontAwesome" name="map-marker" />
              <Input placeholder='Icon Textbox'/>
            </Item>

    
      <Container>
        <Header hasTabs/>
        <Tabs renderTabBar={()=> <ScrollableTab />}>
          <Tab heading="Tab1">
            <Tab1 />
          </Tab>
          <Tab heading="Tab2">
            <Tab2 />
          </Tab>
          <Tab heading="Tab3">
            <Tab3 />
          </Tab>

        </Tabs>
      </Container>



    </View>
  
  );
}

// STYLES
const styles = StyleSheet.create({
  categoryTitle: {
    color:"#383838", 
  },

})

export default Home