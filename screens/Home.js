import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';

import {connect} from 'react-redux';
import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body, Row,Form,Picker,Header,Left,Title,Right  } from 'native-base';



import * as Location from 'expo-location';


//import components
import ListType from './component/ListType';
import MapType from './component/MapType';



function  Home(props) {


  const [adress,setAdress] = useState("Saisissez votre adresse")
  const [distance,setdisctance] = useState("1000")

// recuperation de la location
const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [latitude,setLatitude] = useState();
const [longitude,setLongitude] = useState();

// Type d'activité

const [listActivityType, setListActivityType]= useState([]) // type activity, ex indoor recup from back
const [typeActivite,setTypeActivite] = useState ("Toutes") // selected by user



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



// recuperation des types d'activite 
useEffect(()=>{
  
  async function recupDonnée(){

    var requestBDD = await fetch(`http://192.168.1.8:3000/nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}`
    })
    var listActivityRaw = await requestBDD.json()
     
      setListActivityType(listActivityRaw.result.facets)
      
  }
  recupDonnée()
  
},[])


const [totalActivite,setTotalActivity] = useState(0)

let totalLabel = `Toutes - ${totalActivite} sites`


 let typeActivityArray = listActivityType.map((item,i)=>{
    
    let type = item.name
    let count = item.count
  
    let wordingLabel = `${type} - ${count} sites`

   // let total = totalActivite + count
   // setTotalActivity(total)
    return (<Picker.Item label={wordingLabel} value={wordingLabel} key={i}/>)
  })
  



// recuperation des types d'activite 
useEffect(()=>{
  
  async function recupDonnée(){

    var requestBDD = await fetch(`http://192.168.1.8:3000/listpoint`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${typeActivite}`
    })
    var listActivityRaw = await requestBDD.json()
    console.log("nouvelle requete")
    props.listActivity(listActivityRaw)
  
  }
  recupDonnée()
  
})



let test = (value)=> {
  console.log("input",value)
  setTypeActivite(value)
}



  return (

  <View style={styles.containerAll}>
       

        <Card>
        <Form>
            <Item floatingLabel>
              <Label>Recherche d'activité</Label>
              <Input onChangeText={(value)=>test(value)}/>
            </Item>

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
              onValueChange={(value)=>test(value)}
            >
              <Picker.Item label={totalLabel} value="Toutes" />
              {typeActivityArray}
            </Picker>
    

          </Form>
        </Card>
  

      <Tabs>
          <Tab heading={ <TabHeading><Icon name="map" /><Text> Carte</Text></TabHeading>}>
          <MapType />
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
  }
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
  }
  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Home);


//export default Home