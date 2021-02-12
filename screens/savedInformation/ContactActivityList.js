import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import BoutonNonConnecte from '../component/BoutonNonConnecte'
import ListAdress from '../component/ListCardAdress'

function ContactScreen(props) {
  useEffect(()=>{
    props.navigation.setOptions({ title:"Sorties sauvegardées" } )
  },[])
  
  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
  const [contactAdress,setcontactAdress] = useState([])

  let isConnected = props.userInfo.email


// List type part 
useEffect(()=>{
  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}users/userinformation`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`email=${props.userInfo.email}`
    })
    var listTypeRaw = await requestBDD.json()
    setcontactAdress(listTypeRaw.user.favoritesplaces)

  }
  recupDonnée()
  
},[props.actionOnSaved])

 

let NoAdress = ()=>{
 //let photoPlace = <Image source={require('../assets/img-404.png')}  style={{height: 200, width: null, flex: 1}}/>
// http://matthieu-michon.fr/imagesprojet/quoifaire/fleche.jpg
  return (
    <View style={styles.containerNoAdress}> 
      <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,padding:15}}> Bonjour : {props.userInfo.pseudo} </Text>
      <Text style={styles.contentDescritptionCardNoAdress}>Vous n'avez actuellement aucune activité sauvegardé.</Text>
      <Text style={styles.contentDescritptionCardNoAdress}>Pour ajouter une activité, cliquez sur l'étoile en haut à droite de la description des lieux.</Text>

      <Image source = {{uri:'http://matthieu-michon.fr/imagesprojet/quoifaire/fleche.jpg'}}
      style = {{ width:"100%", height: 200,marginTop:20 }}
      />
    </View>

  )
}

    let  ListAdressSaved 
    if (isConnected ==false){
      ListAdressSaved = <BoutonNonConnecte />
    } else if (contactAdress.length == 0 ){
     ListAdressSaved =  <NoAdress />
    }else{
      ListAdressSaved = contactAdress.map(function(item, i) {
        return <ListAdress key={i} name={item.name} adress={item.adress} postcode={item.postcode} city={item.city} id={item._id} lat={item.lat} lon={item.lon} type="activity" action="modification" screenShow="listSavedAdress"/>;
      })
    }



  return (
  <View style={styles.container}>
    <ScrollView>
      <View style={styles.constainerList}> 
        {ListAdressSaved}
      </View>
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#80d6ff', 
  },
  constainerList:{
    alignItems:"center",
    backgroundColor:"red",
    width:"98%",
    backgroundColor: '#80d6ff', 
    alignSelf:"center"
  },
  containerNoAdress: {
    flex:1,
    alignContent:"center",
    alignItems:"center",
    marginTop:20,
    width:"94%",
    borderRadius:20,
    padding:20,
    backgroundColor:"#FFF",
  },

  contentTitleCardNoAdress:{
    fontSize:22,
    color:"#0077c2",
    fontFamily: 'Monserrat-Light'
  },
  
  contentDescritptionCardNoAdress:{
    fontSize:16,
    marginTop:20,
    fontFamily: 'Monserrat-Light'
  },
  


});

function mapStateToProps(state) {
  return { actionOnSaved:state.actionOnSaved,userInfo:state.userInformation}
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAdress: function(item) {
        dispatch( {type: 'deleteAdress',item} )
    },

  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ContactScreen);

