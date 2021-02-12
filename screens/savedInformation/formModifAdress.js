import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; 

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import SearchAdress from "./SearchSaveAdress"

import ButtonValidation from '../component/ButtonValidation'



function FormModifAdress(props) {

  const [showValidateButton,setShowValidateButton] = useState(true)
  const[nameAdress,setName]=useState(props.infoFormAdress.name)

  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
  let affichagelist =props.infoFormAdress.showListSearch

  useEffect(()=>{
    let wording = `Modification ${props.infoFormAdress.type}`
    if(props.infoFormAdress.action == "SaveNewAdressFromListContact"){
      wording=`Ajout ${props.infoFormAdress.type}`
    }
    props.navigation.setOptions({ title:wording} )
  },[])
 
console.log(props.infoFormAdress)

/*  

useEffect(() => {
  Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
  Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
}, []);

const _keyboardDidShow = () => {
  setShowValidateButton(!showValidateButton)
};

const _keyboardDidHide = () => {
  setShowValidateButton(true)
};
*/
let AffichageAdress = () =>{
  if(affichagelist){
    return(
      < SearchAdress />
    )
  }else{
    return(
      <TouchableOpacity style={styles.adress} onPress={()=>changeAffichageList()}>
        <View style={{display:"flex",flexDirection:"row",alignContent:"stretch",justifyContent:"space-between"}}> 
          <View> 
            <Text  style={styles.title1}> {props.infoFormAdress.adress}  </Text>
            <Text  style={styles.title2}> {props.infoFormAdress.postcode}, {props.infoFormAdress.city}   </Text>
          </View>
         <FontAwesome name="edit" style={{marginRight:5}}size={28} color="#0077c2" />
        </View>
      </TouchableOpacity>
    )
  }
}

let changeAffichageList = () =>{props.showList()}


let ValidationButton = ()=>{ 
  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
  if(props.infoFormAdress.name =="Veuillez saisir une adresse" && nameAdress =="null"){
    gradient = ["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]
  }

  if (showValidateButton){
    let wording = `Valider ${props.infoFormAdress.type}`
    return ( 
      <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendModification()}>
          <LinearGradient
          colors={gradient}
          start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
          style={{ height: 48, width:"100%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
          >
            <ButtonValidation wordingLabel={wording} icon="check"/>

          </LinearGradient>
      </TouchableOpacity>
    ) 
  } else {
      return <Text>  </Text>
  }
  
}

let sendModification =async ()=>{ 
let newItem =props.infoFormAdress

    if(nameAdress != "null"){
      newItem.name=nameAdress
    }
    if(newItem.name =="Veuillez saisir un nom d'adresse"){
      gradient = ["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]
    }else{
      let info = JSON.stringify(props.infoFormAdress)


      if(props.infoFormAdress.action=="SaveNewAdressFromParticipant"){
  
        await fetch(`${ip}users/savecontactadress`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`info=${info}&type=contact&email=${props.userInfo.email}`
        })
        
        props.deleteParticipant(info)
        props.addParticipantToFav(props.infoFormAdress)
        props.actionOnSaved(info)
        props.navigation.navigate("ParticipantListAdress")

      }else if(props.infoFormAdress.action=="SaveNewAdressFromListContact"){

        console.log(`info=${info}&type=contact&email=${props.userInfo.email}`)
        if(info.name="Veuillez saisir un nom de contact" || info.adress==false){
          Alert.alert(
            "Il manque des informations",
            "Veuillez Saisir un nom de contact et une adresse",
            [
      
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
        }else{
    
          await fetch(`${ip}users/savecontactadress`,{
            method:"POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body:`info=${info}&type=contact&email=${props.userInfo.email}`
          })        
          props.actionOnSaved(info)
          props.navigation.navigate("ContactAdressList")
        }
        
      }else{

        await fetch(`${ip}users/modifinfo`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`info=${info}&type=${props.infoFormAdress.type}&email=${props.userInfo.email}`
        })
        props.actionOnSaved()

      if(props.infoFormAdress.type=="contact"){
        props.navigation.navigate("ContactAdressList")
      }  else {
       props.navigation.navigate("ContactActivityList")
      }
      }
    }
 props.actionOnSaved()

}

let title = "Modification de l'adresse"
if(props.infoFormAdress.type=="contact"){title ='Nom du contact'}

return (
<View style={styles.container}>
<View style={{display:"flex",flex:12,width:"98%"}}> 
    
  <Card style={styles.cardContainer}>
    <View style={{display:"flex",flexDirection:"row",margin:15}}> 
      <View style={{flex:1}}> 
        <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:15}}>{title}</Text>

        <Item floatingLabel>
          <Label>{props.infoFormAdress.name}</Label>
          <Input                     
          autoCapitalize="none"
          placeholder="Email *"
          onChangeText={(text) => setName(text)}
          style={styles.title1} />
        </Item>

      </View>
    </View>
  </Card>

  <Card style={styles.adressContainer}>
        <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,padding:15}}> Adresse </Text>
        <AffichageAdress/>

  </Card>

</View>



    <Container style={styles.buttonContainer}> 
        <ValidationButton />
    </Container>
</View>
);
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#80d6ff', 
    alignContent:"center",
    alignItems:"center",
  },
  cardContainer:{
    borderRadius:20,
  },
adressContainer:{
  borderRadius:20,
  flex:1
},
adress:{
  padding:15
},
title1:{
  fontSize:20,
  fontFamily: 'Baskerville-Medium'
},
title2:{
  fontSize:17,
  fontFamily: 'Monserrat-Light'
},


  buttonContainer: {
    display:"flex",
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:15,
    width:"100%",
    backgroundColor: '#80d6ff', 
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

inputStyle:{
  fontFamily:"Monserrat-Medium", 
  fontSize:17,

}

});


function mapStateToProps(state) {
    return { infoFormAdress:state.infoFormAdress,userInfo:state.userInformation }
}
function mapDispatchToProps(dispatch) {
  return {
    actionOnSaved: function(info) {
      dispatch( {type: 'actionOnSavedChange',info:info} )
  },    
  showList: function(info) {
    dispatch( {type: 'showListSearchAdress',info:info} )
  },
  deleteParticipant: function(info) {
    dispatch( {type: 'deleteAdressParticipant',info:info} )
  },
  addParticipantToFav:function(info) {
    dispatch( {type: 'addNewAdressContact',info:info} )
  },

  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FormModifAdress);

