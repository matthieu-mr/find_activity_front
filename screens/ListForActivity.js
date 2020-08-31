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

const [listActivity,setListActivity] = useState([])
const [searchHeader, setSearchHeader] = useState(false)


console.log("props.position",props.positionRecupState)
let latitude = props.positionRecupState.lat
let longitude = props.positionRecupState.longitude

let distance = props.positionRecupState.distance

// recuperation des types d'activite 
useEffect(()=>{
  
  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}sportlist`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}`
    })
    var listSportRaw = await requestBDD.json()
    var listSport =listSportRaw.result
    setListActivity(listSport)   
  }
  recupDonnée()
  
},[props])


// FILTRAGE DES RESULTATS
let lettreComparaison ="";

const[search,setSearch]=useState("")

let filteredList=[] ;

/*  waiting for array playlist initialisation */
   if(listActivity){
       filteredList= listActivity.filter(function(item) {
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
 
  // Reset filtered search
 let resetSearch =()=>{
  setSearch("")
  filteredList = listActivity ;
 }  


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

let headerSearchInput

affichageHeader()
//Afichage de la liste comparaison premiere lettre
let typeActivityArray = filteredList.map((item,i)=>{
  let wordingNb = `Nombre de lieux trouvés : ${item.count}`
  if(item.count == 1 ){
    wordingNb = `Nombre de lieu trouvé : ${item.count}`
  }

  if (lettreComparaison === item.first_letter){
    return (  
    <ListItem onPress={() => redirect({item})} key={i}>
         <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",margin:5}}> 
              <View style={{flex:1}}>
                  <Text style={styles.textTitle}>{item.name}</Text>
                  <Text>{wordingNb}</Text>
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
    lettreComparaison = item.first_letter
    return ( 
      <View>
      <ListItem itemDivider style={{ borderBottomWidth:2 }} key={i}>
        <Text style={{ fontWeight: "600",fontSize:22}}>{item.first_letter}</Text>
      </ListItem>

      <ListItem onPress={() => redirect({item})}>

      <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",margin:5}}> 
              <View style={{flex:1}}>
                  <Text style={styles.textTitle}>{item.name}</Text>
                  <Text>{wordingNb}</Text>
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
});


let redirect = (item) => {
   props.sportName(item.item.name)
   let title = item.item.name
   props.navigation.navigate('ListOneActivity')}
  
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
    flex: 1, 
    backgroundColor: '#fff', 
  },
  textTitle:{
    fontSize:20
  }

})


function mapStateToProps(state) {
  return { positionRecupState: state.positionInfo }
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