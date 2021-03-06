import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity,Keyboard, } from 'react-native';
import {connect} from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
//Style


function ButtonValidation(props) {
    const [showValidateButton,setShowValidateButton] = useState(true)

    let wordingLabel =props.wordingLabel

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

let nameIcon = "send"      
if(props.icon){
  nameIcon=props.icon
}    

switch(props.isValidated){
  case 'true':
    gradient=["#80d6ff","#42a5f5","#42a5f5","#80d6ff"]
    
  break;
  case 'false':
    gradient=["#e2f1f8","#b0bec5","#b0bec5","#808e95","#e2f1f8"]
  break;
  case 'none':
    gradient=["#e2f1f8","#b0bec5","#b0bec5","#808e95","#e2f1f8"]
    break;
}


let ValidationButton = ()=>{ 

        if (showValidateButton){
          return ( 
                <LinearGradient
                colors={gradient}
                start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
                style={{ height: 48, marginLeft:"1%",width:"98%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
                >
    
                    <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Text style={styles.buttonText}>
                            {wordingLabel} 
                        </Text>
                        <MaterialCommunityIcons name={nameIcon} size={28} style={{marginLeft:15}} color="white" />
                    </View>
                </LinearGradient>
          ) 
        } else {
            return <Text>  </Text>
        }
        
    }
  return (

<ValidationButton />

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:"flex-start"
  },
  constainerFilterList:{
    backgroundColor:"#80d6ff",
    display:"flex",
    flexDirection :"row",
    flex:1,
    height: 10,
  },
  buttonFilter:{
    height: 48,
     width: 150, 
     alignItems: 'center', 
     justifyContent: 'center',
      borderRadius:50,
      marginTop:20,
      marginLeft:15,
  },
    
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:20,
    fontFamily: 'Baskerville-Black',
}

});


function mapStateToProps(state) {
  return { listAdress: state.listAdress }
}




export default connect(
  mapStateToProps, 
  null
)(ButtonValidation);

