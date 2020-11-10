import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity,AsyncStorage } from 'react-native';
import {connect} from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';
//Style
import ListAdress from '../component/ListCardAdress'
import BoutonNonConnecte from '../component/BoutonNonConnecte'
import ButtonValidation from '../component/ButtonValidation'


import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 

function AdressList(props) {

 // props.navigation.setOptions({ title:"Adresses sauvegardées" })

  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
  const [nbAdress,setNbAdress] = useState(15)

  const [userInfo,setUserInfo] = useState(null)
  const [contactAdress,setcontactAdress] = useState([])

// List type part 
useEffect(()=>{
  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}users/userinformation`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`info= aa`
    })
    var listTypeRaw = await requestBDD.json()
    setUserInfo(listTypeRaw.user)
    setcontactAdress(listTypeRaw.user.contactInt)
  }
  recupDonnée()
  
},[props.actionOnSaved])




let isConnected = props.userInfo.email

    var ListAdressSaved = contactAdress.map(function(item, i) {
      return <ListAdress key={i} name={item.name} adress={item.adress} postcode={item.postcode} city={item.city} id={item._id} lat={item.lat} lon={item.lon} type="contact" action="modification" screenShow="listSavedAdress"/>;
    })

if (isConnected!=false){
  ListAdressSaved = <BoutonNonConnecte />
} 


let ButtonAddNewAdress = () =>{
  if (isConnected !=false){
    return (
      <Text> </Text>
    )

    return (
      <View style={{marginBottom:15,alignSelf:"center"}}> 
      <ButtonValidation wordingLabel="Ajouter nouvelle adresse"/>
      </View>
    )
  
}}


let navigationNewAdress =()=>{
  props.goToemptyFormAdress(),
  props.navigation.navigate('formChangeAdressInfo')
}

  return (
  <View style={styles.container}>
        <ScrollView>

    <View style={styles.constainerList}> 
      {ListAdressSaved}
    </View>

    </ScrollView>
    <View style={{marginBottom:15}}> 
        <TouchableOpacity style={styles.buttonOpacity} onPress={()=>navigationNewAdress()}>
                <ButtonValidation wordingLabel="Ajouter une adresse"/>
        </TouchableOpacity>
      </View>
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
  return { actionOnSaved:state.actionOnSaved,userInfo:state.userInformation }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAdress: function(item) {
        dispatch( {type: 'deleteAdress',item} )
    },
    goToemptyFormAdress: function(info) {
      dispatch( {type: 'EmptyFormAdress',info:info} )
  },
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AdressList)
