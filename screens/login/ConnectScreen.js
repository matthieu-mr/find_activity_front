import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,Keyboard,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ButtonValidation from '../component/ButtonValidation'


function ConnectScreen(props) {
 // props.navigation.setOptions({ title:"" })
 useEffect(()=>{
  props.navigation.setOptions({ title:"" } )
},[])

    let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]


let sendToAsync=(email,pseudo) =>{
  var userData = {email:email,pseudo:pseudo}
  AsyncStorage.setItem('userInformation',JSON.stringify(userData))
  props.navigation.navigate("ParticipantListAdress")
}


    const [showValidateButton,setShowValidateButton] = useState(true)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    // Error wording
        //Global
    const [isError, setIsError] = useState(false)
    const [error,setError] = useState()

        //item
    const[emailError, setEmailError] =useState()
    const[passwordError,setPasswordError] = useState()

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
  let buttonIsValidated ="true"
    if(email.length == 0  ||password.length == 0 ){
      buttonIsValidated ="false"    }
    if (showValidateButton){
      return ( 
        <View> 
        <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendRequest()}>
                <View style={{flex:1,width:300,padding:5,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <ButtonValidation wordingLabel="Connexion" icon="key" isValidated={buttonIsValidated}/>
                </View>
        </TouchableOpacity>

        <View style={{marginTop:20,alignItems:"center"}} > 
          <Text style={{alignItems:"center",fontFamily:"Sansita-Bold", color:"#42a5f5",fontSize:20}} > ----------------------- </Text>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate("ForgotPassword")}>
          <View style={{marginTop:10,marginBottom:20,alignItems:"center"}} > 
            <Text style={{alignItems:"center",fontFamily:"Sansita-Bold", color:"#42a5f5",fontSize:20}} > Mot de passe oublié ? </Text>
          </View>
      </TouchableOpacity>
        </View>

        

      ) 
    } else {
        return <Text>  </Text>
    }
    
}

let CreateAccount =()=>{
  let buttonIsValidated ="true"
  return ( 

    <TouchableOpacity style={styles.buttonOpacity} onPress={()=>props.navigation.navigate("siginScreen")}>
            <View style={{flex:1,width:300,padding:5,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
            <ButtonValidation wordingLabel="Créer un compte" icon="account-plus-outline" isValidated={buttonIsValidated}/>
            </View>
            
    </TouchableOpacity>

  ) 
}

let CreateOrByPassButton = ()=>{ 
  let buttonIsValidated ="false"
  if (showValidateButton){
    return ( 
      <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendToAsync(false,false)}>
          <View style={{marginTop:10,marginBottom:20,alignItems:"center"}} > 
            <Text style={{alignItems:"center",fontFamily:"Sansita-Bold", color:"#42a5f5",fontSize:20}} > Utiliser sans compte </Text>
          </View>
      </TouchableOpacity>
     
    ) 
  } else {
      return <Text>  </Text>
  }
  
}



let sendRequest =async ()=>{
    let requestBDD =await fetch(`${ip}users/login`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${email}&pseudo=${email}&password=${password}`
      })
      var retourCreatAccount = await requestBDD.json()
      var result = retourCreatAccount.login

      if( result ){
        sendToAsync(retourCreatAccount.user.email,retourCreatAccount.user.pseudo)
    }
     else {
         let wording = retourCreatAccount.retour
          setIsError(true)
          setError(wording)
      }


}

let ShowSecondCard=()=>{
  if (showValidateButton){
    return ( 
      <Card style={styles.bottomButtonContainer}>      
      <View style={{marginTop:20, display:"flex",alignItems:"center"}}>  
          <CreateAccount/>
        </View>
        <View style={{marginTop:20,alignItems:"center"}} > 
         <Text style={{alignItems:"center",fontFamily:"Sansita-Bold", color:"#42a5f5",fontSize:20}} > ----------------------- </Text>
        </View>
        <View style={{marginTop:0,alignItems:"center"}} > 
          <CreateOrByPassButton />
        </View>
  
      </Card>

    ) 
  } else {
      return <Text>  </Text>
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
      <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,}}> Connexion</Text>
            <Item floatingLabel>
              <Label>Email / Pseudo</Label>
              <Input                     
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    placeholder="Email / Pseudo *"
                    onChangeText={text => setEmail(text)}
                    onSubmitEditing={text => setEmail(text)} />
            </Item>
            {emailError}
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
        <View> 
         <ErrorMessage />
        </View>
   
        <View style={{marginTop:20, display:"flex",alignItems:"center"}}>  
          <ValidationButton />
        </View>

    </Card>

<ShowSecondCard />


</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:"#80d6ff",
    alignContent:"center",
    alignItems:"center",
  },
  formContainer:{
    flex:2,
    alignContent:"center",
    alignItems:"center",
    marginTop:20,
    paddingTop:40,
    width:"94%",
    borderRadius:20,
    padding:10,
    backgroundColor:"#FFF",
  }, 
  
  bottomButtonContainer: {
    flex:1,
    alignContent:"space-around",
    justifyContent:"space-around",
    alignItems:"center",
    width:"94%",
    borderRadius:20,
    padding:20,
    backgroundColor:"#FFF",
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
  buttonCreate:{
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
)(ConnectScreen);

