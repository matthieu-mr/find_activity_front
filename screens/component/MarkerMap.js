import React from 'react';
import { StyleSheet, View,Text,} from 'react-native';
import {Marker} from 'react-native-maps';
import {Icon, Badge} from 'native-base';

import {connect} from 'react-redux';
import {Callout} from 'react-native-maps';

import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';


import { MaterialCommunityIcons } from '@expo/vector-icons';

//import module



function MarkerMap(props) {
  const navigation = useNavigation();
  let goPlaceDetails = () => {
    props.infoPlace(props.item)
    console.log("info marker ",props.item)
   navigation.navigate("Place details")
  }

  let badge

  switch(props.action){
    case 'goPlaceDetail':

    badge=props.item.nature_libelle.map((item,i)=>{
      return (
      
        <Badge style={{backgroundColor:color3,marginRight:5}}>
        <Text style={{margin:5,color:"black"}}>{item}</Text>
      </Badge>
      )

    })


    break
      default : 
    badge=<Text></Text>
  } 
  
  


  return (
    <Marker
    key={1}
    coordinate=
    {{
    latitude: props.lat,
    longitude: props.lon}}
    title=""
    description=""
    pinColor="blue"
    style={styles.marker}
    >


      <Callout onPress={() => {goPlaceDetails();}}>
        <View style={styles.HeaderContent}> 
          <Text style={styles.textHeader}>{props.name}</Text>
        </View >

        < View style={{display:"flex",flexDirection:"row",margin:5,flexWrap:"wrap"}}>  
          {badge}
        </View>

        <Text style={styles.textContent}>{props.adress}</Text>

        <View style={styles.actionCards}>
          <Text style={styles.textAction}>Voir plus</Text>
          <MaterialCommunityIcons name="eye-plus-outline" size={24} color={color2} />
        </View>
      
      </Callout>
    </Marker>
  
  );
}

// STYLES
const styles = StyleSheet.create({

  HeaderContent:{
    display:"flex",
    flex:1,
    backgroundColor:"#42a5f5",
    marginTop:10
  },
  textHeader:{
    fontSize:20,
    margin:5,
    color:"white",
    alignSelf:"center"

  },
  textContent:{
    fontSize:17,
    marginLeft:5,
    marginTop:10,
  },
  actionCards:{

    flexDirection:"row",
    alignContent:"center",
    alignItems:"center",
    justifyContent:"center",
    marginTop:15,
    marginBottom:15
  },
  textAction:{
    color:color2,
    marginRight:5,
    fontSize:17
  }

})


function mapStateToProps(state) {
  return { listActivity: state.listActivity, positionRecupState: state.positionInfo}
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
)(MarkerMap);





//export default ListType