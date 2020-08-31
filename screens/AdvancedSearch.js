import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, ScrollView, Alert,Keyboard, TextInput  } from 'react-native';
import {connect} from 'react-redux';
import { useIsFocused } from "@react-navigation/native";

import { Button, Icon,Card,CardItem,Body,ListItem,CheckBox,Input,Picker  } from 'native-base';



import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
function  AdvancedSearch(props) {

  const [adress,setAdress] = useState()
  const [distance,setDistance] = useState()
  const [baseDist, setBaseDist] = useState ("5 km")
  const [changeType,setChangeType] = useState(false)


  const isFocused = useIsFocused();
  
if (distance==undefined){
  setDistance(baseDist)
}

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
             <Text>  {item.name} - Sites</Text>
         </ListItem>
         )
       })
     )
   }
   
     useEffect(()=>{
       AffichageList()
     },[[props, isFocused]])


// gestion des inputs

  let changeDistance = (value) => {
 //  props.setInputDist(value.nativeEvent.text)
 setBaseDist(value)

    console.log('change',value)

    switch (value) {
      case 5 :
        console.log(value)
        props.newDistance(value)
      case 10 :
        console.log(value)

        props.newDistance(value)

      case 15 :
        console.log(value)

        props.newDistance(value)

      case 30 :
        console.log(value)

        props.newDistance(value)

      case 50 :
        console.log(value)

        props.newDistance(value)

      case 100 :
        console.log(value)
        props.newDistance(value) 
    }
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
inputText:{
fontSize:15,
marginLeft:20,
},

})
  
  function mapStateToProps(state) {
    return { positionInfo: state.positionInfo,type:state.listType }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      newDistance: function(location) {
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