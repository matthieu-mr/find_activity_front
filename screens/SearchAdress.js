import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, } from 'react-native';
import {connect} from 'react-redux';

import { Button,Item,  Icon,Header,ListItem,Input,Right } from 'native-base';



import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
function  SearchAdress(props) {
 let ip = `http://192.168.1.183:3000/` //IP wifi windows
//  let ip = `http://192.168.56.1:3000/` // ip lan windows
// let ip = `http://192.168.1.174:3000/`

  const [listAdress,setListAdress] = useState({})
  //gestion de la liste

// recup address from input

let search = (value) => { 


    async function recupDonnée(){
        var requestBDD = await fetch(`${ip}adressesList`,{
          method:"POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body:`adress=${value}`
        })
        var listAdressRaw = await requestBDD.json()
        setListAdress(listAdressRaw.result)
    
      }
      recupDonnée()
}


let sendChoice = (name,lon,lat) => {

let valueForProps = {
    lat:lat,
    lon:lon,
    adress:name,
    type:"manual"

}

props.position(valueForProps)
props.navigation.navigate('Parametres')

}


// Affichage 
let ListResult = () => {

    if(listAdress.map == [] || listAdress.map == undefined ){
        return (
            <Text style={styles.noresult}> Aucun résultat </Text> 
        )
    }else {
        return (
            listAdress.map((item,i)=>{

                let lon = item.geometry.coordinates[0]
                let lat = item.geometry.coordinates[1]
                let name = item.properties.name
                
                let city = item.properties.city
                let citycode =item.properties.citycode

                let allInfo = name + ", "+ citycode + ", " + city
                
                return (
           
                <ListItem key={i}  onPress={()=> sendChoice(allInfo,lat,lon)}> 
                    <View style={{flex:1}}> 
                        <Text style={styles.textTitle}>{name} </Text>
                       <Text>{citycode}, {city} </Text>
                    </View>
                    <View> 
                  <Right>
                      <Icon name="arrow-forward" />
                  </Right>
               </View>
            </ListItem>
    
                )
            })
        )
    }


}

const [textSearch,setTextSearch]= useState("Rechercher")
    
    return (
      <View style={styles.containerAll}>
            
            <Header searchBar rounded style={{backgroundColor:"#009387" }}>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder={textSearch} onChangeText={(value) => search(value)}/>         
          </Item>
          <Button transparent >
            <Text>Rechercher</Text>
          </Button>
        </Header>
  <ListResult/>
    
  </View>
    );
  }





  
// STYLES
const styles = StyleSheet.create({
  containerAll: {
    backgroundColor: '#fff', 
    display:"flex",
    flex:1
    
  },
    searchInput :{
    width:Dimensions.get('window').width-40,
    marginTop:20
    },
  textTitle:{
    fontSize:20
  },
  noresult :{
    fontSize:40,
    marginTop:50,
    alignSelf:"center"
  }
})
  
  function mapStateToProps(state) {
    return { positionInfo: state.positionInfo,type:state.listType }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      position: function(location) {
        dispatch( {type: 'addManualAdress',location:location} )
    },
    }
  }
  
  
  export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(SearchAdress);

//export default AdvancedSearch