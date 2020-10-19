import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView,TouchableOpacity} from 'react-native';
import { Container, Header,Text, Item, Input, Icon, Content, Card, CardItem,  } from 'native-base';
import {connect} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; 

//import module

function AccordionComponent(props) {
  const navigation = useNavigation();

  let deleteAdress=async()=>{
    props.actionOnSaved()
 
    await fetch(`${ip}users/deleteinfo`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`useremail =aa@a.com&objectid=${props.id}&type=${props.type}`
    })
 
  }


let changeInfo = ()=> {
  props.goToFormAdress(props)
  navigation.navigate("formChangeAdressInfo")
}

let firstAction =(
  <View> 
  <TouchableOpacity onPress={() => changeInfo("save")}>
    <FontAwesome name="edit" size={28} color="#0077c2" />
  </TouchableOpacity>
</View>
)
let secondAction =(
  <TouchableOpacity onPress={() => deleteAdress({id})}>
    <FontAwesome name="remove" size={20} color="red" />
  </TouchableOpacity>
)


console.log("---> component", props)

let fromScreen = props.screenShow
switch (fromScreen){
    case "listSavedAdress":
      console.log(`listAddAdress`);

    case 'addParticipantAdress':
    
        firstAction =(
          <View> 
          <TouchableOpacity onPress={() => props.addParticipant(props)}>
            <FontAwesome name="plus-circle" size={28} color="#0077c2" />
          </TouchableOpacity>
        </View>
        )
        secondAction =(<View></View> )
        
        break;

    case 'listParticipantAdress':
     
      if (props.isFavorite) {
        firstAction =(
        <View> 
          <TouchableOpacity onPress={() => props.addParticipant(props)}>
            <FontAwesome name="star" size={28} color="#0077c2" />
          </TouchableOpacity>
        </View>
        )
        secondAction =(
        <View>
          <TouchableOpacity onPress={() => props.deleteParticipant(props)}>
            <FontAwesome name="remove" size={20} color="red" />
          </TouchableOpacity>
        </View> 
        )
      }
      if (!props.isFavorite) {
        firstAction =(
        <View> 
          <TouchableOpacity onPress={() => props.addParticipant(props)}>
            <FontAwesome name="star-o" size={28} color="black" />
          </TouchableOpacity>
        </View>
        )
        secondAction =(
      <View>
        <TouchableOpacity onPress={() => props.deleteParticipant(props)}>
          <FontAwesome name="remove" size={20} color="red" />
        </TouchableOpacity>
      </View> 
        )
      }

      break;

    default:
    console.log(`Sorry, we a.`);
}


  return (
    
    <View style={{marginTop:15,borderRadius:500,width:"80%"}} key="0">
    <LinearGradient
    colors={gradient}
    start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
    >    
          <Card style={{display:"flex",flexDirection:"column"}}>
            <CardItem bordered >
              <View style={styles.contentCard}>
                <View> 
                  <Text style={{fontSize:26,color:"#546e7a",fontFamily: 'Baskerville-Medium'}}>
                   {props.name}
                  </Text>
                </View>

                <View> 
                  {firstAction}
                </View>
              </View>
            </CardItem>

            <CardItem >
              <View style={styles.contentCard}> 
                  <View> 
                    <Text style={styles.contentTextCard}>
                      {props.adress}
                    </Text>
                    <Text style={styles.contentTextCard}>
                      {props.postcode} - {props.city}
                    </Text>
                  </View>
                {secondAction}
              </View>
            </CardItem>
          </Card>
    </LinearGradient>
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
   
  },
  contentTextCard:{
    fontSize:16,
    color:"#819ca9",
    fontFamily: 'Monserrat-Light'
  },
  
  contentCard:{
    display:"flex",
    flexDirection:"row",
    flex:1,
    justifyContent:"space-between",
    alignItems:"center",
  },
})



function mapDispatchToProps(dispatch) {
  return {
    actionOnSaved: function(info) {
      dispatch( {type: 'actionOnSavedChange',info:info} )
  },
  goToFormAdress: function(info) {
    dispatch( {type: 'infoFormAdress',info:info} )
},
  addParticipant: function(info) {
    dispatch( {type: 'addNewAdressContact',info:info} )
  },
  deleteParticipant: function(info) {
    dispatch( {type: 'deleteAdressParticipant',info:info} )
  },
  }
}



export default connect(
  null, 
  mapDispatchToProps
)(AccordionComponent);





//export default ListType