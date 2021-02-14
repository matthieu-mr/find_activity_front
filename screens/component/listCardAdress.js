import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView,TouchableOpacity,Alert} from 'react-native';
import { Text, Card, CardItem, Item,  } from 'native-base';
import {connect} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; 

//import module
function AccordionComponent(props) {
  const navigation = useNavigation();


  let deleteAdress=async()=>{
    props.actionOnSaved()
   // props.infoFormAdress
    await fetch(`${ip}users/deleteinfo`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`email=${props.userInfo.email}&objectid=${props.id}&type=${props.type}`
    })
    props.actionOnSaved()
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
  <TouchableOpacity onPress={() => deleteAdress()}>
    <FontAwesome name="remove" size={20} color="red" />
  </TouchableOpacity>
)

let fromScreen = props.screenShow
switch (fromScreen){
      case "listSavedAdress":
        break
        case 'addUserActualLocation':
          props.title1=props.name
          firstAction =(
            <View> 
            <TouchableOpacity onPress={() =>{props.addNewParticipant(props); navigation.navigate("ParticipantListAdress")}}>
            <FontAwesome name="plus-circle" size={28} color="#0077c2" />
            </TouchableOpacity>
            </View>
            )
          secondAction =(<View></View> )
        break;
  
    case 'addParticipantAdress':
        firstAction =(
          <View> 
          <TouchableOpacity onPress={() =>{props.addParticipant(props); navigation.navigate("ParticipantListAdress")}}>
            <FontAwesome name="plus-circle" size={28} color="#0077c2" />
          </TouchableOpacity>
        </View>
        )
        secondAction =(<View></View> )
        break;

    case 'listParticipantAdress':
      let createButtonAlert = () =>
      Alert.alert(
        "Vous n'etes pas connecté",
        "Connectez-vous ou créer un compte pour sauvegarder une adresse.",
        [
          {
            text: 'Aller à la page connexion',
            onPress: () => navigation.navigate('ConnectScreen')
          },
 
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
  
      let action1 =()=>{changeInfo("save")}  
          if(props.userInfo.email==false){
            action1 =()=>{createButtonAlert()}  
          }

          if (props.isFavorite) {
            firstAction =(
            <View> 
              <TouchableOpacity onPress={() => console.log("other")}>
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
          // <TouchableOpacity onPress={() => changeInfo("save")}>
            firstAction =(
                <View> 
                    <TouchableOpacity onPress={() => action1()}>
                    <FontAwesome name="star-o" size={32} color="#0077c2" />
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
}


  return (
    
    <View style={{marginTop:15,borderRadius:500,width:"98%"}} key="0">
    
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


function mapStateToProps(state) {
  return { userInfo:state.userInformation }
}



function mapDispatchToProps(dispatch) {
  return {
    actionOnSaved: function(info) {
      dispatch( {type: 'actionOnSavedChange',info:info} )
  },
  goToFormAdress: function(info) {
    dispatch( {type: 'infoFormAdress',info:info} )
},
saveAdressContact: function(info) {
  dispatch( {type: 'saveAdressContact',info:info} )
},

  addParticipant: function(info) {
    dispatch( {type: 'addNewAdressContact',info:info} )
  },
  addNewParticipant: function(info) {
    dispatch( {type: 'addNewParticipantAdress',info:info} )
  },
  deleteParticipant: function(info) {
    dispatch( {type: 'deleteAdressParticipant',info:info} )
  },
  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AccordionComponent);





//export default ListType