import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Alert,Keyboard,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import { Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content,Button } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


function ConnectScreen(props) {
  props.navigation.setOptions({ title:"" })

    let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]


    const [infoUserAsync,setinfoUserAsync] = useState(false)
  
    AsyncStorage.getItem("userInformation", 
        function(error, data){
          setinfoUserAsync(data);
        })

let sendToAsync=(email,pseudo) =>{
  var userData = {email:email,pseudo:pseudo}
  AsyncStorage.setItem('userInformation',JSON.stringify(userData))
  props.navigation.navigate("ParticipantListAdress")
}


if(infoUserAsync){
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
    let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]

    if(email.length == 0  ||password.length == 0 ){
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
                       Se connecter
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

let Create= ()=>{ 
  let gradient = ["#ffffff","#fafafa","#c7c7c7","#fafafa","#ffffff"]
  if (showValidateButton){
    return ( 
 
      <TouchableOpacity style={styles.buttonOpacity} onPress={()=>props.navigation.navigate("siginScreen")}>
        <LinearGradient
        colors={["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]}
        start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
        style={{ height: 48, width:"100%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
        >

            <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <Text style={styles.buttonText}>
                Créer un compte
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


let CreateOrByPassButton = ()=>{ 
  let gradient = ["#ffffff","#fafafa","#c7c7c7","#fafafa","#ffffff"]


  if (showValidateButton){
    return ( 
      <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendToAsync(false,false)}>
          <LinearGradient
          colors={gradient}
          start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
          style={{ height: 48, width:"100%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
          >

              <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                  <Text style={styles.buttonTextByPass}>
                    Utiliser sans compte
                  </Text>
                  <MaterialCommunityIcons name="send" size={28} color="black" />
              </View>
          </LinearGradient>
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
        console.log("retour create",retourCreatAccount.user.email,retourCreatAccount.user.pseudo)
        sendToAsync(retourCreatAccount.user.email,retourCreatAccount.user.pseudo)
    }
     else {
         let wording = retourCreatAccount.retour
          setIsError(true)
          setError(wording)
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

      <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Connexion</Text>
       
            <Item floatingLabel>
              <Label>Email</Label>
              <Input                     
                    autoCapitalize="none"
                    placeholder="Email *"
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

        <View style={{marginTop:20,alignItems:"center"}} > 
          <Text style={{alignItems:"center",fontFamily:"Sansita-Bold", color:"#42a5f5",fontSize:20}} > Ou </Text>
        </View>


        <View style={{marginTop:20,alignItems:"center"}} > 
          <Create/>
        </View>
    
    </Container>

      <View style={{marginTop:20,marginBottom:20,alignItems:"center"}} > 
        <Text style={{alignItems:"center",fontFamily:"Sansita-Bold", color:"#42a5f5",fontSize:20}} > Mot de passe oublié ? </Text>
      </View>


    <Container style={styles.buttonContainer}> 
      <CreateOrByPassButton />
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
)(ConnectScreen);

