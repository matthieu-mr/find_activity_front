import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text  } from 'react-native';
import {connect} from 'react-redux';

import { List,Item,itemDivider,ListItem,Right,Icon,Header,Input,Button, Fab } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';


import * as Location from 'expo-location';


//import components
import { ScrollView } from 'react-native-gesture-handler';
import ListType from './component/ListType'


function  ListForActivity(props) {

 //let navigation=props.navigation

const [listSport,setListSport] = useState([])
const [searchHeader, setSearchHeader] = useState(false)
const[search,setSearch]=useState("")

let latitude = props.positionRecupState.lat
let longitude = props.positionRecupState.lon
let distance = props.positionRecupState.dist
let type = "Toutes"
let typeListActivity =props.listTypeFromState


// recuperation des types d'activite 
useEffect(()=>{
  let type

  typeListActivity.map((item)=>{
    if (item.state == true){
      type=item.name
    }
  })

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}sportlist`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${type}`
    })
    var listSportRaw = await requestBDD.json()

    var listSportNb = listSportRaw.resultat
    setListSport(listSportNb)

    
  }
  recupDonnée()
  
},[typeListActivity,distance,type])

let headerSearchInput
let filteredList=[] ;
// FILTRAGE DES RESULTATS
let lettreComparaison ="";



// redirection vers liste
let redirect = (item) => {
  props.sportName(item.item.name)
  // let title = item.item.name
   console.log(item.item.name)
  props.navigation.navigate('ListOneActivity')
}


// search function
let affichageHeader=()=>{
  if(searchHeader){
    headerSearchInput = (
      <Header searchBar rounded style={{backgroundColor:"#009387" }}>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Rechercher" 
          onChangeText={(value) => setSearch(value)}
          />
          <Icon name="ios-close" onPress={() => resetSearch()}/>
        </Item>
      </Header>
    )
  }
}
affichageHeader()

  // Reset filtered search
  let resetSearch =()=>{
    setSearch("")
    filteredList = listSport ;
   }  
  
/*  waiting for array playlist initialisation */

if(listSport){

  filteredList= listSport.filter(function(item) {
    
   //applying filter for the inserted text in search bar   
   const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
   const textData = search.toUpperCase();
   return itemData.indexOf(textData) > -1;
   });

}else{
  return (
    <Text>Waitting</Text>
  )
}

let typeActivityArray = filteredList.map((item,i)=>{

  if (lettreComparaison === item.name[0] ){
    return (  
    <ListItem onPress={() => redirect({item})} key={i}>
         <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",margin:5}}> 
              <View style={{flex:1}}>
                  <Text style={styles.textTitle}>{item.name}</Text>
                  <Text>wordingNb</Text>
              </View>
          <View> 
              <Right>
                  <Icon name="arrow-forward" />
              </Right>
           </View>
        </View>
    </ListItem>
    )
  }else {
      lettreComparaison = item.name[0] 
      let nbsite 


    return ( 
      <View>
      <ListItem itemDivider style={{ borderBottomWidth:2 }} key={100*i}>
        <Text style={{ fontWeight: "600",fontSize:22}}>{item.name[0] }</Text>
      </ListItem>

      <ListItem onPress={() => redirect({item})}>

      <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",margin:5}}> 
              <View style={{flex:1}}>
                  <Text style={styles.textTitle}>{item.name}</Text>
                  <Text>Nombre de site trouvé(s) : {item.count} </Text>
              </View>
          <View> 
              <Right>
                  <Icon name="arrow-forward" />
              </Right>
           </View>
        </View>
      </ListItem>
      </View>
    )
  }

})



  return (

<View style={styles.containerAll}>
  <View>
    {headerSearchInput}
  </View>

  <ScrollView>
    <List>
      {typeActivityArray}
    </List>
  </ScrollView>

  <Fab
    direction="up"
    containerStyle={{ }}
    style={{ backgroundColor: "#009387"  }}
    position="bottomRight"
    onPress={() => setSearchHeader(!searchHeader)}>
    <Icon name="search" />
  </Fab>
</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    display:"flex",
    flex: 1, 
    backgroundColor: '#fff', 
  },
  textTitle:{
    fontSize:20
  }

})


function mapStateToProps(state) {
  return { positionRecupState: state.positionInfo,listTypeFromState:state.listType }
}


function mapDispatchToProps(dispatch) {
  return {
    sportName: function(name) {
        dispatch( {type: 'addName',name:name} )
    },
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListForActivity);





//export default ListForActivity