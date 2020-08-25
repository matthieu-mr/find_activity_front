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


// let ip = `http://192.168.1.183:3000/` //IP wifi windows
 // let ip = `http://192.168.56.1:3000/` // ip lan windows
let ip = `http://192.168.1.174:3000/`

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

    let coords = {
      lat:location.coords.latitude,
      long:location.coords.longitude
    }

    props.position(coords)

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
      body:`lat=${latitude}&long=${longitude}&dist=${distance}`
    })
    var listActivityRaw = await requestBDD.json()

      setTotal(listActivityRaw.total)
      setListActivityType(listActivityRaw.resultFiltered)
      props.listType(listActivityRaw.resultFiltered)
  }
  recupDonnée()
  
},[])



// recuperation des POI 
useEffect(()=>{
  
  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}listpoint`,{
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
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${filterType}`
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
  />
    )
  })
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
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}} activeTextStyle={{color: 'yellow'}} ><Icon name="map" style={{color: 'dark'}} /><Text  > Carte</Text></TabHeading>} >
            
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
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}}><Icon name="list"  style={{color: 'dark'}} /><Text  >  Liste</Text></TabHeading>}>
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
  textTitle:{
    marginTop:15,
    fontSize:20
  }

})


function mapStateToProps(state) {
  return { position: state.position,activity:state.listType }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
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