import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,Keyboard,} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


function signin(props) {
  
    let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]


    const [showValidateButton,setShowValidateButton] = useState(true)
    const [email,setEmail] = useState("")
    const [pseudo,setPseudo] = useState("")
    const [password,setPassword] = useState("")
    
    // Error wording
        //Global
    const [isError, setIsError] = useState(true)
    const [error,setError] = useState()

        //item
    const[emailError, setEmailError] =useState()
    const[passwordError,setPasswordError] = useState()
    const[pseudoError,setPseudoError] = useState()

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
    
 


let ValidationButton = ()=>{ 

    if(pseudo.length == 0 ||email.length == 0  ||password.length == 0 ){
        gradient = ["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]
    }



    if (showValidateButton){
      return ( 
        <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendRequest()}>
            <LinearGradient
            colors={gradient}
            start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            style={{ height: 48, width:"100%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
            >

                <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                    <Text style={styles.buttonText}>
                        Valider 
                    </Text>
                    <MaterialCommunityIcons name="send" size={28} color="white" />
                </View>
            </LinearGradient>
        </TouchableOpacity>
      ) 
    } else {
        return <Text>  </Text>
    }
    
}

let sendRequest =async ()=>{
const expressionMail =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const expressionPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/
    // at least one number, one lowercase and one uppercase letter
    // at least six characters

var pseudo = "azza"
var email = "aaa@a.com"
var password = "Test001"

let resultMail = expressionMail.test(email)
let resultPass = expressionPass.test(password)


if(!resultMail){
    setPasswordError(
        <Text style={{color:"red",fontFamily:"Monserrat-Italic"}}>Format d'email incorrect</Text>
    )
}else{setPasswordError()}

if(pseudo.length<3){
    setPseudoError(
        <Text style={{color:"red",fontFamily:"Monserrat-Italic"}}>Veuillez saisir un pseudo de 4 charactères minimum </Text>
    )
}else{setPseudoError()}

if(!resultPass){
    setEmailError(
        <Text style={{color:"red",fontFamily:"Monserrat-Italic"}}>Le mot de passe doit contenir au moins 6 charactères, 1 majuscule et 1 chiffre</Text>
    )
}else{setEmailError()}


if (resultPass && pseudo.length>3 && resultMail){
    let requestBDD =await fetch(`${ip}users/create`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${email}&pseudo=${pseudo}&password=${password}`
      })
      var retourCreatAccount = await requestBDD.json()
      var result = retourCreatAccount.login
      if( result ){
        alert("ok")
    }
     else {
         let wording = retourCreatAccount.retour
          setIsError(true)
          setError(wording)
      }


}

}


  let ErrorMessage = (errorWording)=>{ 
      if (isError){
        return (
        <View style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}> 
            <MaterialCommunityIcons name="alert-octagon-outline" size={24} color="red" />
             <Text style={{ color:"red",fontSize:18,fontFamily:"Baskerville-Black",marginTop:15}}> {error} </Text>
        </View>
             )
      }
      return <Text>  </Text>
  }

  return (
  <View style={styles.container}>
    <Container style={styles.formContainer}>

      <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Créer votre compte</Text>
       
            <Item floatingLabel>
              <Label>Email</Label>
              <Input                     
                    autoCapitalize="none"
                    placeholder="Email *"
                    onChangeText={text => setEmail(text)}
                    onSubmitEditing={text => setEmail(text)} />
            </Item>
            {emailError}
            <Item floatingLabel style={{marginTop:20}}>
              <Label>Pseudo</Label>
              <Input                     
                    autoCapitalize="none"
                    placeholder="Email *"
                    onChangeText={text => setPseudo(text)}
                    onSubmitEditing={text => setPseudo(text)} />
            </Item>
            {pseudoError}
            <Item floatingLabel style={{marginTop:20}} >
              <Label>Password</Label>
              <Input                     
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Email *"
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={text => sendRequest(text)}/>
            </Item>
            {passwordError}
        <ErrorMessage />

    </Container>

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
)(signin);

