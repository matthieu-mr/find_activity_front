import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView,TouchableOpacity} from 'react-native';
import { Container, Header,Text, Item, Input, Icon, Content, Card, CardItem, Right,ListItem, Accordion } from 'native-base';
import {connect} from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons'; 

//import module

function AccordionComponent(props) {
  const navigation = useNavigation();
  const [popOver,setPopOver] = useState(true)

  let deleteAdress=async()=>{
    console.log(`useremail =aa@a.com&objectid=${props.id}&type=${props.type}`)
    props.actionOnSaved()
 
    await fetch(`${ip}users/deleteinfo`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`useremail =aa@a.com&objectid=${props.id}&type=${props.type}`
    })
 
  }

let changeInfo = ()=> {
//  alert("test")
  props.goToFormAdress(props)
  navigation.navigate("formChangeAdressInfo")

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
                   {props.name} - test
                  </Text>
                </View>

                <View> 
                  <TouchableOpacity onPress={() => changeInfo("save")}>
                    <FontAwesome name="edit" size={28} color="#0077c2" />
                  </TouchableOpacity>
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
                <TouchableOpacity onPress={() => deleteAdress({id})}>
                <FontAwesome name="remove" size={20} color="red" />
                </TouchableOpacity>
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

  }
}



export default connect(
  null, 
  mapDispatchToProps
)(AccordionComponent);





//export default ListType