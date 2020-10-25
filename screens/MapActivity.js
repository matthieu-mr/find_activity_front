import React,{useState,useEffect} from 'react';
import { StyleSheet, View,Text,Image,StatusBar,Dimensions  } from 'react-native';
import MapView, {Callout,Marker} from 'react-native-maps';
import {connect} from 'react-redux';
import {  Icon, Tab, Tabs, TabHeading, Header} from 'native-base';



import * as Location from 'expo-location';


//import components
import ListType from './component/ListItemInfo';
import MarkerMap from'./component/MarkerMap';
import HeaderComponent from './component/Header'
import { ScrollView } from 'react-native-gesture-handler';

function MapActivity(props) {
let lon
let lat 
let typeActivity 
let dist 

lat = 48.7927087
lon = 2.5133559

const [listPoint,setListPoint] = useState([])

// List type part 
useEffect(()=>{
  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}sport/mapactivity`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${dist}&type=${typeActivity}`
    })
    var listTypeRaw = await requestBDD.json()
    setListPoint(listTypeRaw.arrayResult)
  }
  recupDonnée()
  
},[])

let markerListMap =listPoint.map((item,i)=>{
  return(
    <MarkerMap key={i} lat={item.lat} lon={item.lon} adress={item.adress} coloraction={"green"} name={item.name} item={item} type="goPlace" action="goPlaceDetail" screenShow="listActivity"/>
  )
})


let ListMap =listPoint.map((item,i)=>{
  return(
    <ListType key={i} lat={item.lat} sizeTitle1={20} color={color1} lon={item.lon} title2={item.adress} title1={item.name} item={item} type="goPlace" action="goPlaceDetail" screenShow="listActivity" />
  )
})
console.log(props)
  return (

  <View style={styles.containerAll}>
      <HeaderComponent/>



      <Tabs onChangeTab={(e)=>console.log(e.i)} tabBarUnderlineStyle={{borderBottomColor:color2,borderBottomWidth:5}}  >
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}}  ><Icon name="map" style={{color: '#000000'}} />
          <Text style={{fontFamily: 'Baskerville-Medium'}} > Carte</Text></TabHeading>} >
          <MapView style={styles.mapStyle} 
              initialRegion={{
              latitude: lat,
              longitude:  lon,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
              }}
          >
           <MapView.Circle
                key = { 1}
                center = { {
                  latitude: lat,
                  longitude: lon
              }}
                radius = { 50000 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
               
        />
            <Marker
            key={"800"}
            coordinate=
            {{
            latitude: lat,
            longitude: lon}}
            title={"Votre position"}
            description={""}
            pinColor="red"
            >
            </Marker>
            {markerListMap}
    </MapView>  
      </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}}><Icon name="list"  style={{color: '#000000'}} />
            <Text style={{fontFamily: 'Baskerville-Medium'}}  >  Liste</Text>
          </TabHeading>}>
              <ScrollView>
                {ListMap}
              </ScrollView>
  
          </Tab>
        </Tabs>




</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    display:"flex",
    flex: 1, 
    backgroundColor: '#fff', 
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  return { positionRecupState: state.positionInfo,listTypeFromState:state.listType,listActivityFromState:state.listActivity }
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
)(MapActivity);


//export default Home