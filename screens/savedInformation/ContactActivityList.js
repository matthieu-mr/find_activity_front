import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,Keyboard,} from 'react-native';
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
    props.navigation.setOptions({ title:"Activités sauvegardées" } )
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
  return (
    <View style={styles.containerNoAdress}> 
    <Text>Bonjour : {props.userInfo.pseudo}</Text>
    <Text>Vous n'avez actuellement aucune activité sauvegardé</Text>
    <Text>Pour ajouter une activité cliquez sur l'étoile en haut à droite de la description de slieux lors de votre recherche</Text>
    </View>

  )
}

    var ListAdressSaved 
    if (isConnected ==false){
      ListAdressSaved = <BoutonNonConnecte />
    } 
    if (contactAdress.length == 0){
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


  content:{
   width:"90%",

  },
  contentTextCard:{
    fontSize:16,
    color:"#819ca9",
    fontFamily: 'Monserrat-Light'
  },
  
  contentCard:{
    display:"flex",
    flexDirection:"row",
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
  
},
  buttonInput:{
    textAlign: 'center',
    color: '#4C64FF',
    padding: 15,
    marginLeft: 1,
    marginRight: 1,
    width: 198,
    alignItems: 'center',
    },
    
  buttonContainer: {
    display:"flex",
    flexDirection:"row",
},
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:17,
    fontFamily: 'Baskerville-Black'
}

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

