import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import { Container, Header,Text, Item, Input, Icon, Content, Card, CardItem, Right,ListItem } from 'native-base';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {connect} from 'react-redux';
import { Divider } from 'react-native-elements';

import * as Location from 'expo-location';


//import module

function ListType(props) {

let listRaw =props.listActivity.list.result
//console.log("--------------------------- >>>>>>>>>",listRaw)

let listArray = listRaw.map((item,i)=>{

  let type = item.fields.equipementtypelib
  let dist = item.fields.dist
  let distance = Math.round(dist)
  let nature =item.fields.naturelibelle
  let name = item.fields.insnom
  
  

let goPlaceDetails = () => {
  alert("test")
  let infoToSend = {
    name:name,
    lat:46.55,
    long:3.00

  }
  props.infoPlace(infoToSend)
  //props.navigation.navigate('Parametres')
}


  return (
    <View >
      <Card transparent key={i} >
        <CardItem button onPress={() => {goPlaceDetails('You tapped the button!');}}>
          <View>
              <Text style={styles.textTitle}>{name}</Text>
              <Text>{type} - {distance} Mètres</Text>
          </View>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </CardItem>
      </Card>
      <Divider/>
   </View>
  ) 
});


  return (
    


    <View>
      <ScrollView>
      {listArray}
      </ScrollView>
    </View>
  
  
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
  return { listActivity: state.listActivity }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },
    infoPlace: function(info) {
      dispatch( {type: 'callPlace',info:info} )
  },


  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListType);





//export default ListType