import React,{useState,useEffect} from 'react';
import { StyleSheet, View,Dimensions,Text,Image  } from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import {connect} from 'react-redux';
import { Button, Icon, Tab, Tabs, TabHeading,Card, Body, Form,Picker,Header,Left,Title,Right,Spinner,CardItem  } from 'native-base';
import { useIsFocused } from "@react-navigation/native";
import {Marker} from 'react-native-maps';


import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';



function  Home(props) {


// recuperation de la location
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [getLocation,setGetLocation] = useState (false)
const isFocused = useIsFocused();
// Type d'activité
const [typeActivite,setTypeActivite] = useState () // selected by user

 
// recup label from props
useEffect(()=>{
  let typeValue = `${props.positionRecupState.activityType}`
  console.log("change type ", typeActivite)
  setTypeActivite(typeActivite)
  },[isFocused])


// Liste activité
const [listActivity, setListActivity] = useState([])

let lat = props.positionRecupState.lat
let lon = props.positionRecupState.lon
let dist = props.positionRecupState.dist
let typeFromProps = props.positionRecupState.activityType
let afficheEcran = props.navigation.isFocused()
const [getTypeActivity,setGetType] = useState()


useEffect(()=>{

setGetType(props.positionRecupState.activityType)
console.log("changement type ",getTypeActivity)
select(props.positionRecupState.activityType)
},[afficheEcran])



let [affichageList,setAffichageList] = useState(false)


// Recuperation de la localisation de l'user
useEffect(() => {

  (async () => {  
  
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    let coords = {
      lat :location.coords.latitude,
      lon :location.coords.longitude,
      dist:1000,
      typeDist:"auto",
      activityType:'Toutes'
    }
    props.positionInfo(coords)
    lat = location.coords.latitude
    lon =location.coords.longitude
  
  })();
  setAffichageList(true)
},[]);

let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}


// recuperation des types d'activite et nb

const [total,setTotal] = useState()
const [listActivityType, setListActivityType]= useState([]) // type activity, ex indoor recup from back

useEffect(()=>{
  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${dist}&type=${typeFromProps}`
    })
    var listActivityRaw = await requestBDD.json()
    props.listType(listActivityRaw.resultFiltered)
    setListActivityType(listActivityRaw.resultFiltered)
    setTotal(listActivityRaw.total)
  }
  recupDonnée()
  
},[lat,dist])

// Affichage type d'activite

 let typeActivityArray = listActivityType.map((item,i)=>{
    let type = item.name
    let count = item.count
    
    let tabRaw = item.equipementtypecode
    var tab = [...new Set(item.equipementtypecode)];

    var nbSite = tab.length ;
    let wordingLabel = `${type} - ${count} Activités - sur ${nbSite} sites`

    return (<Picker.Item selectedValue={"test"} label={wordingLabel} value={type} key={i}/>)
  })
  

// recuperation des POI 
useEffect(()=>{
  console.log("send listpoint",getTypeActivity)
  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}listpoint`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${dist}&type=${getTypeActivity}`
    })
    var listActivityRaw = await requestBDD.json()
    setListActivity(listActivityRaw)
    props.listActivity(listActivityRaw)
    
  }
  recupDonnée()
  
},[dist,getTypeActivity])


// FILTRAGE DES RESULTATS By TYPE

let select = (filterType)=> {
    
  let listTypeFromProps = props.activity

    setTypeActivite(filterType)
    props.changeTypeActivity(filterType)

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
          body:`lat=${lat}&long=${lon}&dist=${dist}&type=${filterType}`
        })

        var listActivityRaw = await requestBDD.json()
        props.listActivity(listActivityRaw)
        setListActivity(listActivityRaw)
      }
      recupDonnée()
}


// Affichage des markers
let markerList

let goPlaceDetails = (name,lat,lon,item) => {
  let infoToSend = {
    name:name,
    lat:lat,
    long:lon,
    item:item
  }
  props.infoPlace(infoToSend)
  props.navigation.navigate("Place details")
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

  if ( listActivity.result== undefined){
  
  }
  else {
    markerList = listActivity.result.map((item,i)=>{
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
  }
  return (
    <MapView style={styles.mapStyle} 
  
                  initialRegion={{
                  latitude: lat,
                  longitude:  lon,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.07,
                  }}
  
                  >

                  {markerList}
                  <Marker
                      key={"800"}
                      coordinate=
                      {{
                        latitude: lat,
                        longitude: lon}}
                        title={"Votre position"}
                        description={""}
                        pinColor="blue"
                     
                  >
                      <Image
                        style={styles.tinyLogo}
                        source={require('../assets/perso.png')}
                      />
                  </Marker>
                  </MapView>   
      )
    }
}

  return (

  <View style={styles.containerAll}>
       <Card style={styles.cardActivity}>
         
        <Form>
          <Text style={styles.textTitle}> Type d'activité :</Text>
            <Picker
              renderHeader={backAction =>
                <Header >
                  <Left>
                    <Button onPress={backAction}>
                      <Icon name="arrow-back" style={{ color: "#fff" }} />
                    </Button>
                  </Left>
                  <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#red" }}>Selectionner une activité</Title>
                  </Body>
                  <Right />
                </Header>}

              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={typeActivite}
              onValueChange={(value)=>select(value)}
            >
              
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
  cardActivity:{
    padding:10
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
  },
  tinyLogo: {
    resizeMode: 'center',
    height: 50,
  },

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
  changeTypeActivity: function(typeActivityToProps) {
    dispatch( {type: 'changeTypeActivityPosition',typeActivityToProps:typeActivityToProps} )
},
infoPlace: function(info) {
  dispatch( {type: 'callPlace',info:info} )
},
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);


//export default Home