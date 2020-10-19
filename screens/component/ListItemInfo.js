import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView,Text} from 'react-native';
import { Container, Header,Item, Input, Icon, Content, Card, CardItem, Right,ListItem } from 'native-base';
import {connect} from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

//import module

function ListType(props) {


// add the switch to props
let envoiPropsInformation =()=>{
  props.addParticipantList(props)
}

  return (
      <ListItem key={1}   
            onPress={() =>envoiPropsInformation(props)}>
            <View style={{display:"flex",flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}> 
                <View > 
                  <Text style={{fontSize:20,fontFamily: 'Baskerville-Medium'}}>{props.title1}</Text>
                  <Text style={{fontSize:17,fontFamily: 'Monserrat-Light'}}>{props.title2} </Text>
                </View>
              
                <Ionicons name="ios-add-circle-outline" size={24} color="#42a5f5" />
              </View>
      </ListItem>  

  );
}

// STYLES
const styles = StyleSheet.create({
  categoryTitle: {
    color:"#383838", 
  },
  textTitle:{
    fontSize:20
  },
  textUnder:{
    fontSize:15,
  }
})


function mapStateToProps(state) {
  return { listActivity: state.listActivity}
}

function mapDispatchToProps(dispatch) {
  return {
    infoPlace: function(info) {
      dispatch( {type: 'callPlace',info:info} )
  },
  addParticipantList: function(info) {
    dispatch( {type: 'addNewParticipantAdress',info:info} )
  },
  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListType);





//export default ListType