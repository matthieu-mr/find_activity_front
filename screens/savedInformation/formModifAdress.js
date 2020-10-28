import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,Keyboard,} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons'; 

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import SearchAdress from "./SearchSaveAdress"

function FormModifAdress(props) {
  const [showValidateButton,setShowValidateButton] = useState(true)

  const[nameAdress,setName]=useState("null")

  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
  let affichagelist =props.infoFormAdress.showListSearch


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


let AffichageList = () =>{
  if(affichagelist){
    return(
      < SearchAdress />
    )
  }else{
    return(
      <TouchableOpacity style={styles.buttonOpacity} onPress={()=>changeAffichageList()}>
        <View style={{display:"flex",flexDirection:"row"}}> 
        <Text  style={styles.inputStyle}> {props.infoFormAdress.adress}, {props.infoFormAdress.postcode}, {props.infoFormAdress.city}     </Text>
        <FontAwesome name="edit" size={28} color="#0077c2" />
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
    return ( 
      <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendModification()}>
          <LinearGradient
          colors={gradient}
          start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
          style={{ height: 48, width:"100%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
          >

              <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                  <Text style={styles.buttonText}>
                      Valider 
                  </Text>
                  <MaterialCommunityIcons name="check" size={28} color="white" />
              </View>
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
    if(newItem.name =="Veuillez saisir unn nom d'adresse"){
      gradient = ["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]
    }else{
      let info = JSON.stringify(props)
      alert('ok')
      if(props.infoFormAdress.action == "new"){
        await fetch(`${ip}users/savecontactadress`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`info=${info}`
        })
      }else{
        /*
        await fetch(`${ip}users/deleteinfo`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`useremail =aa@a.com&objectid=${props.id}&type=${props.type}`
        })*/

      }

    }
//  props.actionOnSaved()

}



return (
<View style={styles.container}>
<View style={{display:"flex",flex:8,width:"90%"}}> 
    <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Nom de l'adresse </Text>

          <Item floatingLabel>
            <Label>{props.infoFormAdress.name}</Label>
            <Input                     
                  autoCapitalize="none"
                  placeholder="Email *"
                  onChangeText={(text) => setName(text)}
                  style={styles.inputStyle} />
          </Item>
    

<Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Adresse</Text>
  <AffichageList/>
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
    backgroundColor:"white",
    alignContent:"center",
    alignItems:"center",
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
},
inputStyle:{
  fontFamily:"Monserrat-Medium", 
  fontSize:17,

}

});


function mapStateToProps(state) {
    return { infoFormAdress:state.infoFormAdress }
}
function mapDispatchToProps(dispatch) {
  return {
    actionOnSaved: function(info) {
      dispatch( {type: 'actionOnSavedChange',info:info} )
  },    
  showList: function(info) {
    dispatch( {type: 'showListSearchAdress',info:info} )
  },

  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(FormModifAdress);

