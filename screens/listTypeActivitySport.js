import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Fab,Icon,Spinner,Header,Item,Input } from 'native-base';

import { LinearGradient } from 'expo-linear-gradient';

//Style
import HeaderComponent from './component/Header'
import ListType from './component/ListItemInfo';
import ButtonType from './component/ButtonActivity'

import { ScrollView } from 'react-native-gesture-handler';



function  ListForActivity(props) {

 //let navigation=props.navigation
 //props.navigation.setOptions({ title:"Selection du sport" })
  let gradientSelected = ["#80d6ff","#42a5f5","#42a5f5","#80d6ff"]
  let noSelectGradient = ["#e2f1f8","#b0bec5","#b0bec5","#808e95","#e2f1f8"]
  let noSelectGradientWhite = ["#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"]

 const [listSport,setListSport] = useState([])
 const [listTypeSport,setListTypeSport] = useState([])

 const [typeFilter,setTypeFilter] = useState("Toutes")
 
 
 const [selectedSport,setSelectedSport] = useState()
 const [searchHeader, setSearchHeader] = useState(false)
 const[search,setSearch]=useState("")

let latitude = props.rdvPoint.lat
let longitude = props.rdvPoint.lon
let distance = 5000


// recuperation des types d'activite 
useEffect(()=>{
  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}sport/filteredType`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${typeFilter}`
    })
    var listfilterSport = await requestBDD.json()
    setListSport(listfilterSport.resultSport)
  }
  recupDonnée()
  
},[typeFilter])

useEffect(()=>{
  
  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}sport/filteredType`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${typeFilter}`
    })
    var listfilterSport = await requestBDD.json()
    setListTypeSport(listfilterSport.arrayTypeActivity)
    setListSport(listfilterSport.resultSport)
  }
  recupDonnée()
  
},[])


 // Affichage filter header   
 let affichageFiltre=listTypeSport.map((item,i)=>{

  let gradient = typeFilter==item.path ?gradientSelected:noSelectGradient
  let width = typeFilter==item.path ?180:150
  let color = typeFilter==item.path ?"white":"black" 
  let fontSize = typeFilter==item.path ?15:15
  
  return (
    <View style={{marginBottom:15,alignSelf:"center",marginLeft:15}}> 
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>setTypeFilter(item.path)}>
      <ButtonType ley={i} width={width} color={color}  fontSize={fontSize} gradient={gradient} wording_fr={item.path}/>
          </TouchableOpacity>
      </View>
  )
})


// search function 
let affichageHeader=()=>{
  if(searchHeader){
    headerSearchInput = (
      <Header searchBar rounded style={{backgroundColor: "#42a5f5" }}>
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

  // Reset filtered search
  let resetSearch =()=>{
    setSearch("")
    filteredList = listSport ;
   }  
  

// Affichage result
let affichageResult
if(filteredList.length ==0){
  filteredList= <Spinner style={{flex:1 }}color='blue' />
}else{

  affichageResult=filteredList.map((item,i)=>{
    let gradient = props.sportNameState==item.path ?gradientSelected:noSelectGradientWhite
    let width = props.sportNameState==item.path ?"98%":"85%" 
    let color = props.sportNameState==item.path ?"white":"black" 
    let fontSize = props.sportNameState==item.path?20:15
    

    return (
      <View style={{alignSelf:"center",width:"100%",backgroundColor:gradient}} key={i}>
      <TouchableOpacity onPress={()=>{alert(item.path)}}>
      <LinearGradient
                  colors={gradient}
                  start={{x: 1.0, y: 10.0}} end={{x: 0.0, y: 0.0}}
                  >
      <ListType key={i} title1={item.path} color={color} sizeTitle1={fontSize} type="sport" action="addSport" screenShow="addParticipantAdress" item={item} filterType={typeFilter} />        
        </LinearGradient>
      </TouchableOpacity>
  
      </View>
    )
  })
  
}

let headerSearchInput
let filteredList=[] ;
// FILTRAGE DES RESULTATS
let lettreComparaison ="";




  return (

<View style={styles.container}>
  <HeaderComponent/>

    <View>
      {headerSearchInput}
    </View>
    <View style={styles.constainerFilterList}> 
      <ScrollView  horizontal={true}>
        {affichageFiltre}
      </ScrollView>
    </View>

    <View style={styles.listInformation}> 
        <ScrollView>
          <View style={{display:"flex",flex:5,flexDirection:"row",flexWrap:"wrap",alignContent:"flex-start",}}> 
          {affichageResult}
          </View>
          </ScrollView>
      </View>
 

<View> 
<Fab
    direction="up"
    containerStyle={{ }}
    style={{ backgroundColor: "#42a5f5"  }}
    position="bottomRight"
    onPress={() => setSearchHeader(!searchHeader)}>
    <Icon name="search" />
  </Fab>
</View>

</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:"flex-start",
    backgroundColor: 'white',  
  },
  constainerFilterList:{
    display:"flex",
    flexDirection :"row",
    flex:1,
    height: 10,
  },
  buttonValidationContainer: {
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"center",
    marginBottom:15,
    width:"100%",
   
},

listInformation:{
  display:"flex",
  flex:5,
  flexDirection:"row",
  alignContent:"flex-start",
  alignSelf:"center",
  width:"95%",
  borderTopLeftRadius:20,
  borderTopRightRadius:20,
  backgroundColor:"white",
  padding:5,
  borderColor:"#80d6ff",
  borderWidth:3
},



  buttonFilter:{
    height: 60,
     width: 150, 
     alignItems: 'center', 
     justifyContent: 'center',
      borderRadius:50,
      marginTop:20,
      marginLeft:15,
      
  },
    
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:15,
    fontFamily: 'Baskerville-Black',
}

})


function mapStateToProps(state) {
  return { rdvPoint: state.rdvPointAdress}
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