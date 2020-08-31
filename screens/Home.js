import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body, Row,Form,Picker,Header,Left,Title,Right,Spinner  } from 'native-base';

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


let lat = props.positionRecupState.lat
let lon = props.positionRecupState.lon


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

    let coords = {
      lat :location.coords.latitude,
      lon :location.coords.longitude,
      type:"auto"
    }
    props.positionInfo(coords)

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

    var requestBDD = await fetch(`${ip}nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${distance}`
    })

    var listActivityRaw = await requestBDD.json()

      setTotal(listActivityRaw.total)
      setListActivityType(listActivityRaw.resultFiltered)
      props.listType(listActivityRaw.resultFiltered)
  }
  recupDonnée()
  
},[lat])



// recuperation des POI 
useEffect(()=>{

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}listpoint`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${distance}&type=${typeActivite}`
    })
    var listActivityRaw = await requestBDD.json()
    setListActivity(listActivityRaw)
    props.listActivity(listActivityRaw)

  }
  recupDonnée()
  
},[lat])


/// count nb activity
const [total,setTotal] = useState()

let totalLabel = `Toutes - ${total} sites`

 let typeActivityArray = listActivityType.map((item,i)=>{
    let type = item.name
    let count = item.count
  
    let wordingLabel = `${type} - ${count} sites`
    return (<Picker.Item label={wordingLabel} value={type} key={i}/>)
  })
  
// FILTRAGE DES RESULTATS By TYPE
let lettreComparaison ="";
let filteredList=[] ;

let select = (filterType)=> {
let listTypeFromProps = props.activity

let typeActivityNewArray= listTypeFromProps.map((item,i)=>{
  if (item.name===filterType){
      item.state=true
      return item
  }else {
    item.state=false
      return item
  }
})


props.listType(typeActivityNewArray)

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}filteredType`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${distance}&type=${typeActivite}`
    })

    var listActivityRaw = await requestBDD.json()
    props.listActivity(listActivityRaw)
    setListActivity(listActivityRaw)
  }
  recupDonnée()
}

// Affichage des markers
let markerList

if ( listActivity.result== undefined){

}
else {
  markerList = listActivity.result.map((item,i)=>{
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
      pinColor="blue"
   
  />
    )
  })
}

let MyMarker  = ()=>{
    return (
      <Marker
      key={"800"}
      coordinate=
      {{
      latitude: props.positionRecupState.lat,
      longitude: props.positionRecupState.lon}}
      title={"moi"}
      description={"name"}
      pinColor="blue"
      image={require('../assets/perso.png')}
  />
    )
  }

MapViewMEF()

function MapViewMEF(){

if (props.positionRecupState.lat == undefined){
  return(
      <Spinner color='blue' />
  )
} else {
  let lat = props.positionRecupState.lat
  let lon = props.positionRecupState.lon
  return (
    <MapView style={styles.mapStyle} 
  
                  initialRegion={{
                  latitude: lat,
                  longitude:  lon,
                  latitudeDelta: 0.07,
                  longitudeDelta: 0.07,
                  }}
  
                  >
                    <Marker
                      key={"800"}
                      coordinate=
                      {{
                      latitude: lat,
                      longitude: lon}}
                      title={"moi"}
                      description={"name"}
                      pinColor="blue"
                      image={require('../assets/perso.png')}
                    />
                  {markerList}
                  </MapView>   
      )
    }
}

  return (

  <View style={styles.containerAll}>
       <Card>
        <Form>
          <Text style={styles.textTitle}> Type d'activité</Text>
            <Picker
              renderHeader={backAction =>
                <Header style={{ backgroundColor: "#009387"  }}>
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
  

      <Tabs tabBarUnderlineStyle={{borderBottomColor:'#009387',borderBottomWidth:5}} activeTextStyle={{color: 'red'}} >
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}} activeTextStyle={{color: 'yellow'}} ><Icon name="map" style={{color: '#000000'}} /><Text  > Carte</Text></TabHeading>} >
            <MapViewMEF />
      </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}}><Icon name="list"  style={{color: '#000000'}} /><Text  >  Liste</Text></TabHeading>}>
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
  textTitle:{
    marginTop:15,
    fontSize:20
  }

})


function mapStateToProps(state) {
  return { positionRecupState: state.positionInfo,activity:state.listType }
}

function mapDispatchToProps(dispatch) {
  return {
    positionInfo: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },
    listActivity: function(list) {
      dispatch( {type: 'addList',list:list} )
  },
  listType: function(listType) {
    dispatch( {type: 'changeTypeActivity',listType:listType} )
},
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);


//export default Home