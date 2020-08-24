import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import { Container, Header,Text, Item, Input, Icon, Content, Card, CardItem, Right } from 'native-base';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {connect} from 'react-redux';

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
  let nom = item.fields.insnom
  

let goPlaceDetails = () => {
  navigation.navigate('Parametres')
}


  return (
    <Card key={i}>
    <CardItem  onPress={() => {goPlaceDetails('You tapped the button!');}}>
      <View>
      <Text>{nom}</Text>
        <View> 
          <Text>{type} - {distance} Mètres</Text>
       
        </View>
      </View>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
     </CardItem>
   </Card>
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

})


function mapStateToProps(state) {
  return { listActivity: state.listActivity }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },

  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListType);





//export default ListType