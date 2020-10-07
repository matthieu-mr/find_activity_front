import React,{useState,useEffect} from 'react';
import { StyleSheet, View,Text,Image  } from 'react-native';
import MapView, {Callout} from 'react-native-maps';
import {connect} from 'react-redux';
import { Button, Icon, Tab, Tabs, TabHeading,Card, Body, Form,Picker,Header,Left,Title,Right,Spinner,CardItem  } from 'native-base';




import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';
import MapPoint from './component/map'


function  Home(props) {


// recuperation de la location
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);

// Recup information
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
      dist:'1000',
      typeDist:"auto",
      activityType:'Toutes'
    }
    props.positionInfo(coords)

  })();

},[]);

// Recuperation de la localisation de l'user
let lat = props.positionRecupState.lat
let lon =props.positionRecupState.lon
let dist= props.positionRecupState.dist
let typeListActivity =props.listTypeFromState
let listActivity =props.listActivityFromState




let text = 'Waiting..';
if (errorMsg) {
  text = errorMsg;
} else if (location) {
  text = JSON.stringify(location);
}



// List type part 
useEffect(()=>{
  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${dist}&type=${typeListActivity}`
    })
    var listTypeRaw = await requestBDD.json()
    var listType=listTypeRaw.resultFiltered
    props.listType(listType)
  }
  recupDonnée()
  
},[lat,dist])

const [wordingSelectedType,setWordingSelectedType] = useState("")

// recuperation des POI 
useEffect(()=>{
  let type

  typeListActivity.map((item)=>{
    if (item.state == true){
      type=item.name
      setWordingSelectedType(item.name)
    }
  })

  async function recupDonnée(){
    console.log("calling")

    var requestBDD = await fetch(`${ip}listpoint`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${dist}&type=${type}`
    })
    var listActivityRaw = await requestBDD.json()
    console.log("Result")
    var listActivity = listActivityRaw.result
    props.listActivity(listActivity)
  }
  recupDonnée()
  
},[lat,dist,typeListActivity])


let showListActivity = typeListActivity.map((item,i)=>{
  
  let wordingLabel = `${item.name} - ${item.count} Activités - sur ${item.nbSite} sites`
  
  return (<Picker.Item label={wordingLabel} value={item.name} key={i}/>)
})



let select = (filterType)=> {
      let typeActivityNewArray= typeListActivity.map((item,i)=>{
        if (item.name===filterType){
            item.state=true
           // setWordingSelectedType(item.name)
            return item
        }else {
          item.state=false
            return item
        }
      })
      props.listType(typeActivityNewArray)
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
              selectedValue={wordingSelectedType}
              onValueChange={(value)=>select(value)}
            >
                  {showListActivity}
            </Picker>


          </Form>
        </Card>
  

      <Tabs tabBarUnderlineStyle={{borderBottomColor:'#009387',borderBottomWidth:5}} activeTextStyle={{color: 'red'}} >
          <Tab heading={ <TabHeading style={{backgroundColor: '#ffffff'}} activeTextStyle={{color: 'yellow'}} ><Icon name="map" style={{color: '#000000'}} /><Text  > Carte</Text></TabHeading>} >
          <MapPoint />
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
)(Home);


//export default Home