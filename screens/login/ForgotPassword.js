import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity, Keyboard,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import { Item, Input, Label, Container, Card} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

//import * as Analytics from 'expo-firebase-analytics';
//import * as firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import ButtonValidation from '../component/ButtonValidation'

function forgotPassword(props) {

    let gradient =["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]

    useEffect(()=>{
        props.navigation.setOptions({ title:"Mot de passe oublié" } )
      },[])
      


    const [showValidateButton,setShowValidateButton] = useState(true)
    const [email,setEmail] = useState("")
    const [pseudo,setPseudo] = useState("")
    
    // Error wording
        //Global
    const [isError, setIsError] = useState(false)
    const [error,setError] = useState()

        //item
    const[emailError, setEmailError] =useState()
 

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
          <ButtonValidation wordingLabel="Envoyer la demande " icon="send" isValidated={"true"}/>
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

    <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,}}> Saisir Email ou Pseudo</Text>
       
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

      <View style={{marginTop:20, display:"flex",alignItems:"center",width:400,marginBottom:20}}>  
        <ValidationButton />
        </View>

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

