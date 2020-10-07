import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, ScrollView, Alert,Keyboard, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import { Button, Icon,Card,CardItem,Body,ListItem,CheckBox,Input,Picker  } from 'native-base';
import { useNavigation } from '@react-navigation/native';



import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
function  AdvancedSearch(props) {

  const navigation = useNavigation();

  let lat = props.positionInfoProps.lat
  let lon = props.positionInfoProps.lon
  let dist = props.positionInfoProps.dist
  let type = props.positionInfoProps.activityType
  let listTypeActivity = props.listTypeFromState 
  
  const [adress,setAdress] = useState()
  const [distance,setDistance] = useState(dist)

// Gestion adress depuis coords
useEffect(()=>{

    async function recupDonnée(){
      var requestBDD = await fetch(`${ip}adressesListCoord`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`lat=${lat}&long=${lon}`
      })
  
      var adressRaw = await requestBDD.json()
      setAdress(adressRaw.adress)
    }
    recupDonnée()
    
  },[])

  let selectTypeActivity =(value)=>{
    let typeActivityNewArray =[...listTypeActivity]

    typeActivityNewArray.map((item,i)=> {      
      if(item.name == value ){
        item.state = true
      }else{
        item.state = false
      }
      
    })
    props.addListType(typeActivityNewArray)
  }


  let AffichageList = listTypeActivity.map((item,i)=> {
  return (
    <ListItem style ={styles.searchInput} onPress={()=>selectTypeActivity(item.name)} key={i}>
       <CheckBox checked={item.state} color="green" />
      <Text>  {item.name} - {item.count} Activités sur {item.nbSite} site(s) </Text>
  </ListItem>
  )
})


 

  

let changeDistance =async (value) => {
  props.positionInfo(value)
  setDistance(value)
  }

// gestion des inputs


let PickerDistance = ()=> { 
  return (
    <Picker
    mode="dropdown"
    iosHeader="Distance autour de vous"
    iosIcon={<Icon name="arrow-down" />}
    style={{ width: undefined }}
    selectedValue={distance}
    onValueChange={(value)=>changeDistance(value)}
  >
    <Picker.Item label="1 Km" value="1000" />
    <Picker.Item label="5 Km" value="5000" />
    <Picker.Item label="10 Km" value="10000" />
    <Picker.Item label="15 Km" value="15000" />
    <Picker.Item label="30 Km" value="30000" />
    <Picker.Item label="50 Km" value="50000" />
    <Picker.Item label="100 Km" value="100000" />
  </Picker>
  )
}





let AffichageHeader = () => {
return (
  <CardItem bordered>
    <Body>

      <View style={styles.searchInput}>
        <Text style={styles.labelSearch}>Adresse</Text>
          <TouchableOpacity onPress ={()=> {props.navigation.navigate('SearchAdress');}}>
            <ListItem>
              <Icon active type="FontAwesome" name="map-marker" />
              <Text style={styles.inputText}>{adress}</Text>
            </ListItem>
          </TouchableOpacity>
        </View>

              <View style={styles.searchInput}>
              <Text style={styles.labelSearch}>Rayon de recherche (km) </Text>
            <ListItem>

          <PickerDistance/>
        </ListItem>
      </View>

    </Body>
  </CardItem>
  )
}


   
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
                      {AffichageList}
                    </Body>
                  </CardItem>
          </Card>
      </View>
  
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
inputText:{
fontSize:15,
marginLeft:20,
},

})
  
  function mapStateToProps(state) {
    return { positionInfoProps: state.positionInfo,listTypeFromState:state.listType }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      positionInfo: function(location) {
        dispatch( {type: 'addDistance',location:location} )
    },
    addListType: function(listType) {
      dispatch( {type: 'addTypeActivity',listType:listType} )
      },
      listActivity: function(list) {
        dispatch( {type: 'addList',list:list} )
    },
    }
  }
  
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(AdvancedSearch);

//export default AdvancedSearch