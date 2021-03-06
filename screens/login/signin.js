import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Keyboard,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import { Item, Input, Label, Container,Card } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ButtonValidation from '../component/ButtonValidation'


function signin(props) {
  useEffect(()=>{
    props.navigation.setOptions({ title:"" } )
  },[])
  
    let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]

    const [showValidateButton,setShowValidateButton] = useState(true)
    const [email,setEmail] = useState("")
    const [pseudo,setPseudo] = useState("")
    const [password,setPassword] = useState("")
    
    // Error wording
        //Global
    const [isError, setIsError] = useState(false)
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
    
 
let buttonIsValidated ="true"

let ValidationButton = ()=>{ 
    if(pseudo.length > 2 ||email.length  > 2  ||password.length  > 2  ){
      buttonIsValidated ="false"}

    if (showValidateButton){

      return ( 
        <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendRequest()}>
            <ButtonValidation wordingLabel="Créer un compte" icon="account-plus-outline" isValidated={buttonIsValidated}/>
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

let resultMail = expressionMail.test(email)
let resultPass = expressionPass.test(password)


if(!resultMail){
  setEmailError(
        <Text style={{color:"red",fontFamily:"Monserrat-Italic"}}>Format d'email incorrect</Text>
    )
}else{setEmailError()}

if(pseudo.length<3){
    setPseudoError(
        <Text style={{color:"red",fontFamily:"Monserrat-Italic"}}>Veuillez saisir un pseudo de 4 charactères minimum </Text>
    )
}else{setPseudoError()}

if(!resultPass){
  setPasswordError(
        <Text style={{color:"red",fontFamily:"Monserrat-Italic"}}>Le mot de passe doit contenir au moins 6 charactères, 1 majuscule et 1 chiffre</Text>
    )
}else{setPasswordError()}


if (resultPass && pseudo.length>2 && resultMail){

    let requestBDD =await fetch(`${ip}users/createuser`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${email}&pseudo=${pseudo}&password=${password}`
      })

      var retourCreatAccount = await requestBDD.json()
      let result=retourCreatAccount.created

      if( result ){
        var userData = {email:email,pseudo:pseudo}
        AsyncStorage.setItem('userInformation',JSON.stringify(userData))
        props.navigation.navigate("ParticipantListAdress")
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
    <Card style={styles.formContainer}>

      <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Créer votre compte</Text>
       
            <Item floatingLabel>
              <Label>Email</Label>
              <Input                     
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoFocus={true}
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
                    textContentType="username"
                    onChangeText={text => setPseudo(text)}
                    onSubmitEditing={text => setPseudo(text)} />
            </Item>
            {pseudoError}
            <Item floatingLabel style={{marginTop:20}} >
              <Label>Password</Label>
              <Input                     
                    autoCapitalize="none"
                    secureTextEntry={false}
                    placeholder="Email *"
                    textContentType="password"
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={text => sendRequest(text)}/>
            </Item>
            {passwordError}
        <ErrorMessage />
    </Card>

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
    backgroundColor:color3
  },
  formContainer:{
    width:"90%",
    flex:10,
    borderRadius:20,
    padding:20,
    marginTop:20
    
  },    
  buttonContainer: {
    display:"flex",
    flex:1,
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:15,
    width:"100%",
    backgroundColor:color3
   
},
buttonOpacity:{
    width:"90%",
    backgroundColor:color3
},
 buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:20,
    fontFamily: 'Baskerville-Black',
    marginRight:20,
    
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

