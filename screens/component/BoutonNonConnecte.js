import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {Card} from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

//Style
import ButtonType from './ButtonActivity'


function ButtonNonConnecte(props) {
    let gradientSelected = ["#80d6ff","#42a5f5","#42a5f5","#80d6ff"]
    let noSelectGradient = ["#e2f1f8","#b0bec5","#808e95","#b0bec5","#e2f1f8"]
    const navigation = useNavigation();


let i 
let width = "98%" 
let color = "white"
let fontSize = 17
let gradient = gradientSelected

  return (

    <Card style={styles.container} > 
      <Text style={styles.wordingTitle} > Pour utiliser cette fonctionnalité </Text>
      <Text style={styles.wordingTitle} > Merci de : </Text>
  
      <TouchableOpacity onPress={()=>{navigation.navigate("siginScreen")}}>
          <ButtonType ley={i} width={width} color={color}  fontSize={fontSize} gradient={gradient} wording_fr={"Créer un compte"}/>
        </TouchableOpacity>
          <Text style={styles.wording} > Ou </Text>

      <TouchableOpacity onPress={()=>{navigation.navigate("Accueil")}}>
          <ButtonType ley={i} width={width} color={color}  fontSize={fontSize} gradient={gradient} wording_fr={"Vous connecter"}/>
      </TouchableOpacity>
    </Card>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:"center",
    alignItems:"center",
    marginTop:20,
    width:"94%",
    borderRadius:20,
    padding:20,
    backgroundColor:"#FFF",
  },
  wordingTitle:{
    alignItems:"center",
    fontFamily:"Sansita-Bold", 
    color:"#42a5f5",
    fontSize:20,

  },

  wording:{
    alignItems:"center",
    fontFamily:"Sansita-Bold", 
    color:"#42a5f5",
    fontSize:20,
    marginTop:20,
    marginBottom:20
  }


});



export default ButtonNonConnecte;

