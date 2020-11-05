import React from 'react';
import { StyleSheet, View,Text} from 'react-native';
import { ListItem,Badge } from 'native-base';
import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
//import module

function ListType(props) {
const navigation = useNavigation();

let sizeTitle1 = props.sizetitle1
let color=props.color
let icon= <Ionicons style={{flex:1}} name="ios-add-circle-outline" size={24} color="#42a5f5" />

// add the switch to props

let Wording


let actionOnClick =()=>{
  envoiPropsInformation(props)
}

let badge

switch(props.action){

  case 'addParticipant':
    color=props.color
    Wording= ()=>{
      return (
        <View style={{flex:15}}> 
          <Text style={{fontSize:props.sizeTitle1,fontFamily: 'Baskerville-Medium'}}>{props.title1}</Text>
          <Text style={{fontSize:17,fontFamily: 'Monserrat-Light'}}>{props.title2} </Text>
        </View>
      )
      }

      actionOnClick =()=>{
        props.addParticipantList(props)
        navigation.navigate("Accueil")
      }
      


  break

  case 'addSport':
    sizeTitle1 = props.sizeTitle1
    color=props.color
    let search=[props.title1]


    actionOnClick = ()=>{
      let item ={
        typeActivity:"sport",
        activity:search,
        filteredActivity:props.filterType
      }
      props.addActivity(item)
      navigation.navigate("MapActivity")
    }

    Wording= ()=>{
      return (
        <View style={{flex:15}}> 
        <Text style={{fontSize:sizeTitle1,fontFamily: 'Baskerville-Medium',color:color}}>{props.title1}</Text>
      </View>
      )
    }

    break
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
      case 'showRdvPoint':
      
        sizeTitle1 = props.sizeTitle1
        color=props.color
        icon =<FontAwesome name="map-o" size={24} color="#42a5f5" />
  
        actionOnClick = ()=>{
          navigation.navigate("MapActivity")
        }

        Wording= ()=>{
          return (
            <View style={{flex:15}}> 
              <Text style={{fontSize:sizeTitle1,fontFamily: 'Baskerville-Medium',color:color}}>Point de RDV</Text>
              <Text style={{fontSize:17,fontFamily: 'Monserrat-Light'}}>{props.title2} </Text>
            <View style={{flexDirection:"row",marginTop:5}}> 
           
            </View>
   
          </View>
          )
        }
  break
    default : 
} 


/*

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
*/
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
    addActivity: function(item) {
      dispatch( {type: 'addActivity',item} )
    },
  }
  
}



export default connect(
  null, 
  mapDispatchToProps
)(ListType);





//export default ListType