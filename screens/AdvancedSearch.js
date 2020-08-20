import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text, ScrollView, Alert  } from 'react-native';
import {connect} from 'react-redux';

import { Button,Item, Input, Icon,Label, Container, Tab, Tabs, TabHeading,Card, Content,CardItem,Body,ListItem,CheckBox,Header,Left,Right,Title  } from 'native-base';



import * as Location from 'expo-location';

function AdvancedSearch(props) {
  const [natureList, setListNature] = useState()

  const [adress,setAdress] = useState("Saisissez votre adresse")
  const [distance,setdisctance] = useState("10 km")


// Ajout des inputs & saisie adresse
let getAdressCoords =async (lon,lat)=> {
  let lon2 = 2.37
  let lat2 = 48.357

var rawResponse =await fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357&type=street`)

var response = await rawResponse.json();
// var response = JSON.parse(list.getBody())

let adress = response.features[0].properties.label
setAdress(adress)
 
}



let listTypeFromProps =props.type

let typeActivityArray = listTypeFromProps.map((item,i)=>{

  return (
    <ListItem style ={styles.searchInput} onPress={()=>select(item.name)}>
    <CheckBox checked={item.state} color="green" />
          <Text>  {item.name}</Text>
  </ListItem>
  )
})


// FILTRAGE DES RESULTATS
let lettreComparaison ="";
let filteredList=[] ;

let select = (filterType)=> {
  

let listTypeFromProps = props.type


let typeActivityNewArray= listTypeFromProps.map((item,i)=>{
  if (item.name===filterType){
      item.state=true
      return item
  }else {
    item.state=false
      return item
  }
})


props.listType(typeActivityNewArray)
  async function recupDonnée(){
    var requestBDD = await fetch(`http://192.168.1.8:3000/filteredType`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${latitude}&long=${longitude}&dist=${distance}&type=${filterType}`
    })

    var listActivityRaw = await requestBDD.json()
    props.listActivity(listActivityRaw)
 
  }
  recupDonnée()
}





let test = ()=> {
  getAdressCoords() ;
  props.navigation.navigate("Liste")
}


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
                          <Input placeholder={adress}/>
                        </Item>
                     </View>

                     <View style={styles.searchInput}>
                      <Text style={styles.labelSearch}>Rayon de recherche</Text>
                        <Item floatingLabel >    
                          <Icon active type="MaterialCommunityIcons" name="map-marker-distance" />
                          <Input keyboardType="numeric"  placeholder={distance}/>
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
                  {typeActivityArray}
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
}
})

function mapStateToProps(state) {
  return { position: state.position,type:state.listType }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
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