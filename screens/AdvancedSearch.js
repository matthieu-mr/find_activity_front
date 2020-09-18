import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, ScrollView, Alert,Keyboard, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import { Button, Icon,Card,CardItem,Body,ListItem,CheckBox,Input,Picker  } from 'native-base';



import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
function  AdvancedSearch(props) {

  const [adress,setAdress] = useState()
  //const [distance,setDistance] = useState()
  const [baseDist, setBaseDist] = useState ()
  const [changeType,setChangeType] = useState(false)

// recuperation du picker depuis les reducer
useEffect(()=>{
  let dist = `${props.positionInfoProps.dist/1000}`
  setBaseDist(dist)

  })

// Gestion adress depuis coords

  const isFocused = useIsFocused();

  //gestion de la liste
  let select = (filterType)=> {
    props.changeTypeActivityPos(filterType)

    listTypeFromProps.map((item,i)=>{
       if (item.name==filterType){
           //item.state=item.state
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
             <Text>  {item.name} - {item.count} Activités</Text>
         </ListItem>
         )
       })
     )
   }
     useEffect(()=>{
       AffichageList()
     },[])


// Gestion adress depuis coords
useEffect(()=>{
  let lat = props.positionInfoProps.lat
  let lon = props.positionInfoProps.lon

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
    
  },[props, isFocused])


// Actualisation liste nature
useEffect(()=>{
  let lat = props.positionInfoProps.lat
  let lon = props.positionInfoProps.lon
  let dist = props.positionInfoProps.dist
  let type = props.positionInfoProps.activityType

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}nature`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&dist=${dist}&type=${type}`
    })

    var listActivityRaw = await requestBDD.json()
      listTypeFromProps = listActivityRaw.resultFiltered
      props.listType(listActivityRaw.resultFiltered)
   
  }
  recupDonnée()
  
},[baseDist])




// gestion des inputs

  let changeDistance = (value) => {
 //  props.setInputDist(value.nativeEvent.text)
  setBaseDist(value)
  props.positionInfo(value*1000)
  }


let PickerDistance = ()=> { 
  return (
    <Picker
    mode="dropdown"
    iosHeader="Distance autour de vous"
    iosIcon={<Icon name="arrow-down" />}
    style={{ width: undefined }}
    selectedValue={baseDist}
    onValueChange={(value)=>changeDistance(value)}
  >
    <Picker.Item label="1 Km" value="1" />
    <Picker.Item label="5 Km" value="5" />
    <Picker.Item label="10 Km" value="10" />
    <Picker.Item label="15 Km" value="15" />
    <Picker.Item label="30 Km" value="30" />
    <Picker.Item label="50 Km" value="50" />
    <Picker.Item label="100 Km" value="100" />
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
                      <AffichageList/>
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
    return { positionInfoProps: state.positionInfo,type:state.listType }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      positionInfo: function(location) {
        dispatch( {type: 'addDistance',location:location} )
    },
    changeTypeActivityPos: function(typeActivityToProps) {
      dispatch( {type: 'changeTypeActivityPosition',typeActivityToProps:typeActivityToProps} )
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