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
  
   

    let AddAdress = ()=>{ 
        let gradient = ["#ffffff","#fafafa","#c7c7c7","#fafafa","#ffffff"]
        if (showValidateButton){
          return ( 
      
            
            <TouchableOpacity style={styles.buttonOpacity} onPress={()=>sendRequest()}>
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


  return (
  <View style={styles.container}>
      <Text> hello</Text>
      <Container style={styles.buttonContainer}> 
      <AddAdress />
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
)(ContactScreen);

