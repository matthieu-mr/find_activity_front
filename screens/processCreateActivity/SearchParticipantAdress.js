import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text,AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import { Item,Header,ListItem,Input,Tab, Tabs, TabHeading,Icon} from 'native-base';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

let gradient = {gradient}

import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


import ListAdress from '../component/ListCardAdress'
import ListType from '../component/ListItemInfo';
import ButtonValidation from '../component/ButtonValidation'
import BoutonNonConnecte from '../component/BoutonNonConnecte'

// get center coordinates : 
// https://www.npmjs.com/package/geolib



function  SearchAdress(props) {
 // props.navigation.setOptions({ title:"Ajouter une adresse" })

  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]

  const [adress,setAdress] = useState("")
  const [listAdressResult,setListAdressResult] = useState([])
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [buttonSetLocation,setButtonLocation] = useState()
const [userActualLocation,setUserActualLocation] = useState([])

let pageTitle = "Recherche d'adresse"

useEffect(()=>{
  props.navigation.setOptions({ title:"Ajouter des Participants" } )
},[])


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [setButtonLocation]);




  let text = 'Waiting..';
  if (errorMsg) {
    return 
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  useEffect(()=>{
    async function recupDonnée(){
      var requestBDD = await fetch(`${ip}adress/adressesListCoord`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`lon=${location.coords.longitude}&lat=${location.coords.latitude}`
      })
      var adressRaw = await requestBDD.json()
      setUserActualLocation(adressRaw)
    }
    recupDonnée()
    
  },[location])


let InfoUserLocation = ()=>{
let buttonIsValidated = "true"

  if(!buttonSetLocation || userActualLocation==[] ){
      return (
        <View> 
        <TouchableOpacity onPress={()=>setButtonLocation(!buttonSetLocation)}>
          <ButtonValidation wordingLabel="Ma position" icon="crosshairs-gps" isValidated={buttonIsValidated}/>        
          </TouchableOpacity>
      </View>
      )
    }else{
      return <ListAdress key="0" name="Votre Position" title1={userActualLocation.response.features[0].properties.name} adress={userActualLocation.response.features[0].properties.name} postcode={userActualLocation.response.features[0].properties.postcode} city={userActualLocation.response.features[0].properties.city} id="33" lat={location.coords.latitude} lon={location.coords.longitude} type="contact" action="addParticipantNotFav" screenShow="addUserActualLocation"/>;
    }

  }











  let infoAdress = <Text></Text>

  if(adress.length < 1){
    infoAdress= (
    <View style={{display:"flex",alignItems:"center",marginTop:15}}>
    <AntDesign name="arrowup" size={28} color="#0077c2"  />
    <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:10,alignSelf:"center"}}> Veuillez saisir une adresse </Text>
    </View>
    )
  }else{
    infoAdress=listAdressResult.map((item,i)=>{
      let cityWording =`${item.properties.postcode} - ${item.properties.city} `
      return <ListType key={i} title1={item.properties.name} title2={cityWording} postcode={item.properties.postcode} city={item.properties.city} type="adress" action="addParticipant" screenShow="addParticipantAdress" lat={item.geometry.coordinates[1]} lon={item.geometry.coordinates[0]} />
    })
  }

  useEffect(()=>{
    async function recupDonnée(){
      var requestBDD = await fetch(`${ip}adress/coords`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`adress=${adress}`
      })
      var listAdressBdd = await requestBDD.json()
      setListAdressResult(listAdressBdd)
    }
    recupDonnée()
  },[adress])


const [contactAdress,setcontactAdress] = useState([])
  // List type part 
useEffect(()=>{
  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}users/userinformation`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`email=${props.userInfo.email}`
    })
    var listTypeRaw = await requestBDD.json()
    setcontactAdress(listTypeRaw.user.contactInt)
  }
  recupDonnée()
  
},[])
// Checl if user is connectd ? list adress : create account 


var ListAdressSaved
let isConnected = props.userInfo.email

  ListAdressSaved = contactAdress.map(function(item, i) {
    return <ListAdress key={i} name={item.name} adress={item.adress} postcode={item.postcode} city={item.city} id={item.id} lat={item.lat} lon={item.lon} type="contact" action="addParticipant" screenShow="addParticipantAdress"/>;
  })
  if (isConnected ==false){
    ListAdressSaved = <BoutonNonConnecte />
  } 
  return (

    <View style={styles.container}>

        <Tabs activeTabStyle={{backgroundColor:"red"}}>        
            <Tab heading={ <TabHeading style={{backgroundColor:"#0077c2"}}><MaterialIcons name="search" size={24} color="white" /><Text style={styles.textInput}>  Recherche</Text></TabHeading>}
            >
          <LinearGradient
            colors={gradient}
              start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            >
            
            <View style={styles.searchInput}>
              <Item >
              <AntDesign name="search1" size={20} color="white" />
                <Input 
                style={styles.textInput} 
                placeholder="Recherche" 
                textContentType="fullStreetAddress"
                onChangeText={text => setAdress(text)} />
              </Item>
            </View>

          </LinearGradient>

          <ScrollView> 
            {infoAdress}
          </ScrollView>
            

          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor:"#0077c2"}}><MaterialIcons name="blur-linear" size={24} color="white" /><Text style={styles.textInput}>  Adresses</Text></TabHeading>}>
          <View style={{display:"flex",flex:1,backgroundColor:"#80d6ff"}}>  
            <ScrollView>

              <View style={{display:"flex",alignItems:"center",backgroundColor:"#80d6ff"}}>   
                {ListAdressSaved}
              </View>    
            </ScrollView>
          </View>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor:"#0077c2"}}><MaterialIcons name="room" size={24} color="white" /><Text style={styles.textInput}>  Ma position</Text></TabHeading>}>
            <ScrollView>
              <View style={{display:"flex",alignItems:"center",padding:20,width:"100%"}}>   
                <InfoUserLocation/>
              </View>    
            </ScrollView>
          </Tab>
        </Tabs>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:"center",
    backgroundColor: '#fff',
  },
  searchInput:{
    marginTop:10,
    marginBottom:5,
    width:"90%",
    marginLeft:"5%",
    marginRight:"5%",
    borderRadius:50,
    color:"white"
  },
  textInput:{
    color:"white"
  }
});


function mapStateToProps(state) {
  return { userInfo:state.userInformation }
}

function mapDispatchToProps(dispatch) {
  return {
    addAdress: function(location) {
      dispatch( {type: 'addNewAdress',location:location} )
    },
  }
}

  
  export default connect(
    mapStateToProps,  
    mapDispatchToProps
  )(SearchAdress);

//export default AdvancedSearch