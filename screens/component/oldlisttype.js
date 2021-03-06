import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView} from 'react-native';
import { Container, Header,Text, Item, Input, Icon, Content, Card, CardItem, Right,ListItem } from 'native-base';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {connect} from 'react-redux';
import { Divider } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';
import { Octicons } from '@expo/vector-icons'; 

//import module

function ListType(props) {
  const navigation = useNavigation();
  let listRaw =props.listActivity

  let lastName

let listArray = listRaw.map((item,i)=>{

  let type = item.fields.equipementtypelib
  let dist = item.fields.dist
  let distance = Math.round(dist)
  let nature =item.fields.naturelibelle
  let name = item.fields.insnom
  let lat = item.fields.gps[0]
  let lon = item.fields.gps[1]

let goPlaceDetails = (name,lat,lon) => {
  let infoToSend = {
    name:name,
    lat:lat,
    long:lon,
    item:item
  }
  props.infoPlace(infoToSend)
  navigation.navigate("Place details")
  
}

if (lastName != name ){
  
  lastName = name

  return (
    <View key={i}>
      <Card transparent key={i} >
        <CardItem button style={{display:"flex",flex:1,alignContent:"center",alignItems:"center"}} onPress={() => {goPlaceDetails(name,lat, lon,item);}}>
          <View style={{flex:1}}>
              <Text style={styles.textTitle}>{name}</Text>
              <Text>{type} </Text>
          </View>
          <View > 
          <Octicons name="triangle-right" size={24} color="#009387" />
          </View>
        </CardItem>
      </Card>
      <Divider/>
   </View>
  ) 
}


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
  return { listActivity: state.listActivity}
}

function mapDispatchToProps(dispatch) {
  return {
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