import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text,StatusBar  } from 'react-native';
import {connect} from 'react-redux';

import { List,Item,ListItem,Icon,Header,Input,Button, Fab } from 'native-base';

import { Octicons } from '@expo/vector-icons'; 


//import components
import { ScrollView } from 'react-native-gesture-handler';
import HeaderComponent from './component/header'


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
  props.navigation.navigate('ListOneActivity')
}


// search function
let affichageHeader=()=>{
  if(searchHeader){
    headerSearchInput = (
      <Header searchBar rounded style={{backgroundColor:"#009387" }}>
        <HeaderComponent/>

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
<ListItem onPress={() => redirect({item})}>

<View style={{display:"flex",flex:1,alignContent:"center",alignItems:"center",flexDirection:"row"}}> 
        <View style={{flex:1}}>
            <Text style={styles.textTitle}>{item.name}</Text>
            <Text>Nombre de site trouvé(s) : {item.count} </Text>
        </View>

    <View> 
      <Octicons name="triangle-right" size={24} color="#51c4b7" />
     </View>
  </View>
</ListItem>
    )
  }else {
      lettreComparaison = item.name[0] 
      let nbsite 
    return ( 
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#009387" />
      <ListItem itemDivider style={{ borderBottomColor:"#009387",display:"flex",flex:1,justifyContent:"center",backgroundColor:"#51c4b7"}} key={100*i}>
        <Text style={{ fontWeight: "00",fontSize:20,color:"white",}}>{item.name[0] }</Text>
      </ListItem>

      <ListItem onPress={() => redirect({item})}>

      <View style={{display:"flex",flex:1,alignContent:"center",alignItems:"center",flexDirection:"row"}}> 
              <View style={{flex:1}}>
                  <Text style={styles.textTitle}>{item.name}</Text>
                  <Text>Nombre de site trouvé(s) : {item.count} </Text>
              </View>
     
          <View> 
            <Octicons name="triangle-right" size={24} color="#51c4b7" />
           </View>
        </View>
      </ListItem>
      </View>
    )
  }

})



  return (

<View style={styles.containerAll}>
<HeaderComponent/>
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