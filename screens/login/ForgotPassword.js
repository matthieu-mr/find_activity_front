import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Keyboard,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import { Item, Input, Label, Container, } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


function forgotPassword(props) {

    let gradient =["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]

    useEffect(()=>{
        props.navigation.setOptions({ title:"Mot de passe oublié" } )
      },[])
      


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
    
 


let ValidationButton = ()=>{ 

    if(pseudo.length > 0 ||email.length > 0 ){
        gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
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

    let requestBDD =await fetch(`${ip}users/sendmailnewpassword`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`email=${email}`
      })

      var retourSendMail = await requestBDD.json()
     console.log(retourSendMail.result)
     if(retourSendMail.result){
      setEmailError(
        <Text style={{color:"#0077c2",fontFamily:"Monserrat-Italic",fontSize:20}}>Un email avec le lien de réinitialisation vient de vous être envoyé</Text>
    )
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

      <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20}}> Veuillez saisir votre email ou pseudo : </Text>
       
            <Item floatingLabel>
              <Label>Email / Pseudo</Label>
              <Input                     
                    autoCapitalize="none"
                    placeholder="Email *"
                    onChangeText={text => setEmail(text)}
                    onSubmitEditing={text => setEmail(text)} />
            </Item>
            {emailError}
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
)(forgotPassword);

