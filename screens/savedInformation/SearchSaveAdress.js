import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, } from 'react-native';
import {connect} from 'react-redux';
import { Item,Header,ListItem,Input } from 'native-base';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

let gradient = {gradient}

import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons'; 


function  SearchSaveAdress(props) {
  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]

  const [adress,setAdress] = useState("16 rue saint hilaire")
  const [listAdress,setListAdress] = useState([])

  useEffect(()=>{
    async function recupDonnée(){
      var requestBDD = await fetch(`${ip}adress/coords`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`adress=${adress}`
      })
      var listAdressBdd = await requestBDD.json()
      setListAdress(listAdressBdd)
    }
    recupDonnée()
    
  },[adress])

  let ListResult =(
    <View style={{display:"flex",flex:1,alignItems:"center",alignContent:"space-around",justifyContent:"space-around"}}> 
      <Feather name="arrow-up" size={35} color="#0077c2" />
      <Text  style={{color:"#0077c2",fontFamily: 'Sansita-Medium',fontSize:30}}> Veuillez saisir une adresse</Text>
    </View>
    )
   
  if (adress !==""){
    ListResult = (
      listAdress.map((item,i)=>{
        return (
      <ListItem key={i}   
            onPress={() => {
              props.changeAdress(item)
            }}

            style={{backgroundColor:"white",display:"flex",flex:1}}>

            <View style={{display:"flex",flex:1,flexDirection:"row",alignItems:"center",alignContent:"space-around",justifyContent:"space-around"}}> 
                <View style={{display:"flex",flex:1,alignItems:"flex-start",alignContent:"space-around",justifyContent:"space-around"}} > 
                  <Text style={{fontSize:20,fontFamily: 'Baskerville-Medium'}}>{item.properties.name}</Text>
                  <Text style={{fontSize:17,fontFamily: 'Monserrat-Light'}}>{item.properties.postcode}, {item.properties.city} </Text>
                </View>
            <View> 

                <Ionicons name="ios-add-circle-outline" size={24} color="#42a5f5" />
              </View>
            </View>
              
      </ListItem>  

          )
      })
    )
  }
 



  return (
    <View style={styles.container}>

          <LinearGradient
            colors={gradient}
              start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
              style={{ alignItems: 'center', justifyContent: 'center', }}
            >
            
            <View style={styles.searchInput}>
              <Item >
              <AntDesign name="search1" size={20} color="white" />
                <Input style={styles.textInput}  
                placeholderTextColor={"white"}
                
                    placeholder="Recherche" onChangeText={text => setAdress(text)} />
              </Item>
            </View>

          </LinearGradient>

      <ScrollView> 
          {ListResult}
      </ScrollView>
        

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent:"center",
    backgroundColor: '#fff',
  },
  searchInput:{
    marginTop:10,
    marginBottom:5,
    width:"90%",
    marginLeft:"5%",
    marginRight:"5%",
    borderRadius:50,
    color:"white"
  },
  textInput:{
    color:"white",
    fontFamily: 'Baskerville-Medium'
  }
});

function mapDispatchToProps(dispatch) {
  return {
    changeAdress: function(info) {
      dispatch( {type: 'changeAdressFromFormSaved',info:info} )
    },

  }
}

  
  export default connect(
    null, 
    mapDispatchToProps
  )(SearchSaveAdress);

//export default AdvancedSearch