import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Button,Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content } from 'native-base';

import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';
import adressComponent from '../component/listCardAdress'
//Style
import ListAdress from '../component/listCardAdress'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 

function AdressList(props) {

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
      body:`email = m.michon@yahoo.fr`
    })
    var listTypeRaw = await requestBDD.json()
    setUserInfo(listTypeRaw.user)
    setcontactAdress(listTypeRaw.user.contactInt)
    
  }
  recupDonnée()
  
},[props.actionOnSaved])

var ListAdressSaved = contactAdress.map(function(item, i) {
  return <ListAdress key={i} name={item.name} adress={item.adress} postcode={item.postcode} city={item.city} id={item._id} lat={item.lat} lon={item.lon} type="contact" action="modification" screenShow="listSavedAdress"/>;
})


  return (
  <View style={styles.container}>
        <ScrollView>

    <View style={styles.constainerList}> 
      {ListAdressSaved}
    </View>

    </ScrollView>
      <View style={{marginBottom:15,alignSelf:"center"}}> 
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>{props.goToemptyFormAdress(),props.navigation.navigate('formChangeAdressInfo')}}>
        <LinearGradient
          colors={gradient}
            start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            style={{ height: 48, width: 400, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
          >
            <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
              <Text style={styles.buttonText}>
                  Ajouter une adresse              
                </Text>
              <MaterialCommunityIcons name="send" size={28} color="white" />
            </View>

             </LinearGradient>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"white"
  },

  constainerList:{
    alignItems:"center",

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
  return { actionOnSaved:state.actionOnSaved }
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
)(AdressList);
