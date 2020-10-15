import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,Keyboard,} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


function ContactScreen(props) {
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
      body:`useremail = m.michon@yahoo.fr`
    })
    var listTypeRaw = await requestBDD.json()
    setUserInfo(listTypeRaw.user)
    setcontactAdress(listTypeRaw.user.favoritesplaces)
   // console.log(listTypeRaw.user)
    
  }
  recupDonnée()
  
},[])


var ListAdressSaved = contactAdress.map(function(item, i) {
  console.log("item envoye",item)
  return <LisAdress key={i} name={item.name} adress={item.adress} postcode={item.postcode} city={item.city} id={item._id} lat={item.lat} lon={item.lon} type="activity"/>;
})


  return (
  <View style={styles.container}>
    <ScrollView>


    <View style={styles.constainerList}> 
    <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Vos Activités sauvgardées </Text>
      {ListAdressSaved}
    </View>

    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"white",
    alignContent:"center",
    alignItems:"center",
  },
  formContainer:{
    width:"90%",
    flex:10
  },    
  buttonContainer: {
    display:"flex",
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:15,
    width:"100%",
   
},
buttonOpacity:{
    width:"90%"
},
 buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:20,
    fontFamily: 'Baskerville-Black',
    marginRight:20
},
buttonTextByPass:{
  textAlign: 'center',
  color: 'black',
  fontSize:20,
  fontFamily: 'Baskerville-Black',
  marginRight:20
}

});


function mapStateToProps(state) {
  return { listAdress: state.listAdress }
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

