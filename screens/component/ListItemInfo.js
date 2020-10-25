import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView,Text} from 'react-native';
import { ListItem,Badge } from 'native-base';
import {connect} from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

//import module

function ListType(props) {
const navigation = useNavigation();
let styleTitle1 = {fontSize:20,fontFamily: 'Baskerville-Medium'}

let sizeTitle1 = props.sizetitle1
let color=props.color
let icon


// add the switch to props

let Wording= ()=>{
  return (
    <View style={{flex:15}}> 
    <Text style={{fontSize:sizeTitle1,fontFamily: 'Baskerville-Medium'}}>{props.title1}</Text>
    <Text style={{fontSize:17,fontFamily: 'Monserrat-Light'}}>{props.title2} </Text>
  </View>
  )
}


let actionOnClick =()=>{
  envoiPropsInformation(props)
}

let badge

switch(props.action){
  case 'addSport':
    sizeTitle1 = props.sizeTitle1
    color=props.color
    Wording= ()=>{
      return (
        <View style={{flex:15}}> 
        <Text style={{fontSize:sizeTitle1,fontFamily: 'Baskerville-Medium',color:color}}>{props.title1}</Text>
      </View>
      )
    }

    case 'goPlaceDetail':
      
      sizeTitle1 = props.sizeTitle1
      color=props.color
      icon =<AntDesign name="rightcircleo" size={24} color="#42a5f5" />

      actionOnClick = ()=>{
        props.infoPlace(props.item)
        navigation.navigate("Place details")
      }
      badge=props.item.nature_libelle.map((item,i)=>{
          return (
            <Badge style={{backgroundColor:color2,marginRight:5,color:"white"}}>
            <Text style={{margin:5,color:"white"}}>{item}</Text>
          </Badge>
          )
      })

      Wording= ()=>{
        return (
          <View style={{flex:15}}> 
          <Text style={{fontSize:sizeTitle1,fontFamily: 'Baskerville-Medium',color:color}}>{props.title1}</Text>
          <Text style={{fontSize:17,fontFamily: 'Monserrat-Light'}}>{props.title2} </Text>
          <View style={{flexDirection:"row",marginTop:5}}> 
          {badge}
          </View>
 
        </View>
        )
      }


  break
    default : 
    icon = <Ionicons style={{flex:1}} name="ios-add-circle-outline" size={24} color="#42a5f5" />
} 




let envoiPropsInformation =()=>{
  switch(props.action){
    case 'addSport':
      sizeTitle1 = 12
      props.sportName(props.title1)
    break
      default : 
      props.addParticipantList(props)
  } 
}

  return (
      <ListItem key={props.i}   
            onPress={() =>actionOnClick()}>
            <View style={{display:"flex",flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}> 
                  <Wording/>
                
                {icon} 
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
  sportName: function(name) {
    dispatch( {type: 'addName',name:name} )
  },
  }
  
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListType);





//export default ListType