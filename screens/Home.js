import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body, Row,Form,Picker,Header,Left,Title,Right  } from 'native-base';

import {Marker} from 'react-native-maps';


import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';



function  Home(props) {

  const [distance,setdisctance] = useState("1000")

// recuperation de la location
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [latitude,setLatitude] = useState();
const [longitude,setLongitude] = useState();

// Type d'activité

const [listActivityType, setListActivityType]= useState([]) // type activity, ex indoor recup from back
const [typeActivite,setTypeActivite] = useState ("Toutes") // selected by user
 // Liste activité

const [listActivity, setListActivity] = useState({})


// Recuperation de la localisation de l'user
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
    props.position(location)
  })();
},[]);


let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}


// recuperation des types d'activite 
useEffect(()=>{
  
  async function recupDonnée(){

    var requestBDD = await fetch(`http://192.168.1.8:3000/nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}`
    })
    var listActivityRaw = await requestBDD.json()

      setTotal(listActivityRaw.total)
      setListActivityType(listActivityRaw.resultFiltered)
      
  }
  recupDonnée()
  
},[])



// recuperation des POI 
useEffect(()=>{
  
  async function recupDonnée(){

    var requestBDD = await fetch(`http://192.168.1.8:3000/listpoint`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${typeActivite}`
    })
    var listActivityRaw = await requestBDD.json()
    setListActivity(listActivityRaw)
    props.listActivity(listActivityRaw)

  }
  recupDonnée()
  
},[])

const [total,setTotal] = useState()

let totalLabel = `Toutes - ${total} sites`

 let typeActivityArray = listActivityType.map((item,i)=>{
    let type = item.name
    let count = item.count
  
    let wordingLabel = `${type} - ${count} sites`
   // console.log("mon total =",total)
   
    return (<Picker.Item label={wordingLabel} value={type} key={i}/>)
  })
  
// FILTRAGE DES RESULTATS
let lettreComparaison ="";

let filteredList=[] ;

let select = (filterType)=> {
  console.log(filterType)

  async function recupDonnée(){
    var requestBDD = await fetch(`http://192.168.1.8:3000/filteredType`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${filterType}`
    })
    var listActivityRaw = await requestBDD.json()
    props.listActivity(listActivityRaw)
    setListActivity(listActivityRaw)

  }
  recupDonnée()
}

// Affichage des markers

//console.log(listActivity.result[0].fields.gps)


let markerList

if ( listActivity.result== undefined){
  console.log("first")
}
else {
  markerList = listActivity.result.map((item,i)=>{
    console.log(item.fields)

    let actlib = item.fields.actlib
    let name = item.fields.insnom
    let lat = item.fields.gps[0]
    let lon = item.fields.gps[1]
    return (
      <Marker
      key={i}
      coordinate={{latitude: lat,
      longitude: lon}}
      title={actlib}
      description={name}
  />
    )
  })
}


  return (

  <View style={styles.containerAll}>
       <Card>
        <Form>
          <Text> Type d'activité</Text>
            <Picker
              renderHeader={backAction =>
                <Header style={{ backgroundColor: "#f44242" }}>
                  <Left>
                    <Button transparent onPress={backAction}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#fff" }}>Selectionner une activité</Title>
                  </Body>
                  <Right />
                </Header>}

              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={typeActivite}
              onValueChange={(value)=>select(value)}
            >
              <Picker.Item label={totalLabel} value="Toutes" />
              {typeActivityArray}
            </Picker>
    

          </Form>
        </Card>
  

      <Tabs>
          <Tab heading={ <TabHeading><Icon name="map" /><Text> Carte</Text></TabHeading>}>
            
          <MapView style={styles.mapStyle} 

                initialRegion={{
                latitude: 48.866667,
                longitude:  2.333333,
                latitudeDelta: 1,
                longitudeDelta: 1,
                }}

                >
                {markerList}
                </MapView>          
</Tab>
          <Tab heading={ <TabHeading><Icon name="list" /><Text> Liste</Text></TabHeading>}>
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
  return { position: state.position }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },
    listActivity: function(list) {
      dispatch( {type: 'addList',list:list} )
  },
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);


//export default Home