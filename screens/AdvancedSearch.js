import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, ScrollView, Alert  } from 'react-native';
import {connect} from 'react-redux';

import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body,ListItem,CheckBox,Header,Left,Right,Title  } from 'native-base';



import * as Location from 'expo-location';
function  AdvancedSearch(props) {
// let ip = `http://192.168.1.183:3000/` //IP wifi windows
 // let ip = `http://192.168.56.1:3000/` // ip lan windows
 let ip = `http://192.168.1.174:3000/`

  const [adress,setAdress] = useState()
  const [distance,setdistance] = useState("10 km")
  const [changeType,setChangeType] = useState(false)

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
  },[])

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



// gestion des inputs

  let changeAdress = (value) => {
    console.log("change adress", value)
  }
  
  let changeDistance = (value) => {
      let valuetext = value + " Km"
      setdistance(valuetext)
      props.distance(value)
  }


// Gestion adress depuis coords


useEffect(()=>{

let lat = props.positionInfo.lat
let lon = props.positionInfo.lon

let distance = 10000

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}adressesListCoord`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${distance}`
    })

    var adressRaw = await requestBDD.json()
    console.log("adresseeeeee",adressRaw.adress)
    setAdress(adressRaw.adress)
  }
  recupDonnée()
  
},[])



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
                  <CardItem bordered>
                     <Body>
                       <View style={styles.searchInput}>
                       <Text style={styles.labelSearch}>Adresse</Text>
                          <Item floatingLabel>
                            <Icon active type="FontAwesome" name="map-marker" />
                            <Input value={adress}  onChangeText={(value) => changeAdress(value)}/>
                          </Item>
                       </View>
  
                       <View style={styles.searchInput}>
                        <Text style={styles.labelSearch}>Rayon de recherche (km) </Text>
                          <Item floatingLabel >    
                            <Icon active type="MaterialCommunityIcons" name="map-marker-distance" />
                            <Input keyboardType="numeric"  value={distance} onChangeText={(value) => changeDistance(value)}/>
                          </Item>
                        </View>
                    </Body>
                  </CardItem>
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