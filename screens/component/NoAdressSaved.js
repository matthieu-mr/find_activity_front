import React from 'react';
import { StyleSheet, Text, View,Image} from 'react-native';
import {connect} from 'react-redux';


function NoAdressSaved(props) {

  return (
    <View style={styles.containerNoAdress}> 
        <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28}}> Bonjour : {props.userInfo.pseudo} </Text>
 
        <Text ></Text>
        <Text style={styles.contentDescritptionCardNoAdress}>Vous n'avez actuellement aucune adresse sauvegardé.</Text>

        <Text style={styles.contentDescritptionCardNoAdress}>Pour ajouter une adresse, cliquez sur l'étoile en haut à droite de la carte.</Text>
        <Image source = {{uri:'http://matthieu-michon.fr/imagesprojet/quoifaire/saveadress.jpg'}}
        style = {{ width:"100%", height: 200,marginTop:20 }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#80d6ff', 
  },
  constainerList:{
    alignItems:"center",
    backgroundColor:"red",
    width:"98%",
    backgroundColor: '#80d6ff', 
    alignSelf:"center"
  },
  containerNoAdress: {
    flex:1,
    alignContent:"center",
    alignItems:"center",
    marginTop:20,
    width:"94%",
    borderRadius:20,
    padding:20,
    backgroundColor:"#FFF",
  },

  contentTitleCardNoAdress:{
    fontSize:22,
    color:"#0077c2",
    fontFamily: 'Monserrat-Light'
  },
  
  contentDescritptionCardNoAdress:{
    fontSize:16,
    marginBottom:20,
    fontFamily: 'Monserrat-Light'
  },
  

});


function mapStateToProps(state) {
    return { actionOnSaved:state.actionOnSaved,userInfo:state.userInformation }
  }
  
  
  export default connect(
    mapStateToProps, 
    null
  )(NoAdressSaved)
  


