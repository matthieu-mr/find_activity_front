import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

//Style


function ButtonActivity(props) {


  return (

          <LinearGradient
          colors={props.gradient}
          start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
          style={{ height: 50, width:props.width,alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20,padding:15,alignSelf:"center"}}
          >
            <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
              <Text style={{ textAlign: 'center',fontSize:props.fontSize,color:props.color, fontFamily: 'Baskerville-Black'}}>
                {props.wording_fr}
              </Text>
            </View>
          </LinearGradient>

    
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
    fontSize:15,
    fontFamily: 'Baskerville-Black',
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
    addActivity: function(item) {
    dispatch( {type: 'addActivity',item} )
  },
    deleteActivity: function(item) {
    dispatch( {type: 'deleteAdress',item} )
  },
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ButtonActivity);

