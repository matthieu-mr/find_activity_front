import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, ScrollView, Alert,Keyboard, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import { Button,Item,  Icon,Card,CardItem,Body,ListItem,CheckBox,Input  } from 'native-base';



import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
function  AdvancedSearch(props) {

 /* 
 let ip = `http://192.168.1.183:3000/` //IP wifi windows
//  let ip = `http://192.168.56.1:3000/` // ip lan windows
// let ip = `http://192.168.1.174:3000/`
*/

  const [adress,setAdress] = useState()
  const [distance,setdistance] = useState('zefzf')
  const [changeType,setChangeType] = useState(false)


  const isFocused = useIsFocused();
  
  
  //gestion de la liste
  let select = (filterType)=> {

    listTypeFromProps.map((item,i)=>{
       if (item.name==filterType){
           item.state=item.state
           listTypeFromProps[i].state = true
       }else {
         listTypeFromProps[i].state =false
       }
     })
   
     props.listType(listTypeFromProps)
     setChangeType(!changeType)
   }




   let listTypeFromProps =props.type
 
   let AffichageList = ()=>{
     return (
       listTypeFromProps.map((item,i)=>{
         return (
           <ListItem style ={styles.searchInput} onPress={()=>select(item.name)} key={i}>
              <CheckBox checked={item.state} color="green" />
             <Text>  {item.name} - {item.count} Sites</Text>
         </ListItem>
         )
       })
     )
   }
   
     useEffect(()=>{
       AffichageList()
     },[[props, isFocused]])


// gestion des inputs

  let changeAdress = (value) => {
    console.log("change adress", value)
   
  }

  let validAdress = (value) => {
    console.log("valid adress", value)

  }
  
  let changeDistance = (value) => {
    
    console.log("distance",value.nativeEvent.text)
    props.distance(value.nativeEvent.text *1000)
  //  setdistance(value.nativeEvent.text + " Km")

  }


// Gestion adress depuis coords

console.log("recup props search",props.positionInfo)
let type = props.positionInfo.type


useEffect(()=>{



let lat = props.positionInfo.lat
let lon = props.positionInfo.lon

let distance = 10000

  async function recupDonnée(){
    console.log("envoi requete")
    var requestBDD = await fetch(`${ip}adressesListCoord`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${distance}`
    })

    var adressRaw = await requestBDD.json()
    console.log("adresseeeeee",adressRaw)
    setAdress(adressRaw.adress)
  }
  recupDonnée()
  
},[props, isFocused])


let AffichageHeader = () => {
return (
  <CardItem bordered>
                     <Body>
                  
                       <View style={styles.searchInput}>
                       <Text style={styles.labelSearch}>Adresse</Text>
                       <TouchableOpacity onPress ={()=> {props.navigation.navigate('SearchAdress');}}>
                       <ListItem>
                       <Icon active type="FontAwesome" name="map-marker" />
                          <Text>{adress}</Text>
                        </ListItem>
                       </TouchableOpacity>

                       </View>
  
                       <View style={styles.searchInput}>
                        <Text style={styles.labelSearch}>Rayon de recherche (km) </Text>
                      
                         <Item stackedLabel>
                              <Icon  active type="MaterialCommunityIcons" name="map-marker-distance"  />
                              <Input value ={distance} keyboardType='decimal-pad' onChangeText ={(value) => changeDistance(value)}/>
                          </Item>
                      
                        </View>
                    </Body>
                  </CardItem>
            )
}




/*
// recup address from input
useEffect(()=>{

  async function recupDonnée(){

    var requestBDD = await fetch(`${ip}nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}`
    })
    var listActivityRaw = await requestBDD.json()

  }
  recupDonnée()
  
},[])


*/

    
    return (
      <View style={styles.containerAll}>
      <ScrollView>
      <View >
          <Card>
                <AffichageHeader/>
          </Card>
      </View>
  
  
     <View>
          <Card>
            <CardItem header bordered>
              <Text style={styles.labelSearch}>Type d'activité</Text>
                </CardItem>
                  <CardItem>
                    <Body>
                      <AffichageList/>
                    </Body>
                  </CardItem>
          </Card>
      </View>
  
        <Button full onPress={()=>test()}>
          <Text>Valider</Text>
        </Button>
    </ScrollView>
  
  </View>
    );
  }





  
// STYLES
const styles = StyleSheet.create({
  containerAll: {
    backgroundColor: '#fff', 
  },
searchInput :{
width:Dimensions.get('window').width-40,
marginTop:20
  },
labelSearch:{
  fontSize:20
},
})
  
  function mapStateToProps(state) {
    return { positionInfo: state.positionInfo,type:state.listType }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      distance: function(location) {
        dispatch( {type: 'addDistance',location:location} )
    },
    listType: function(listType) {
      dispatch( {type: 'changeTypeActivity',listType:listType} )
      },
    }
  }
  
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(AdvancedSearch);

//export default AdvancedSearch