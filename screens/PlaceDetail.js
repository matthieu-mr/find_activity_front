import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text,Image,Share,Alert  } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {Spinner,Card,CardItem,Left,Thumbnail,Body,Button,Right,List,ListItem,Badge,Icon} from 'native-base';
import { Asset } from 'expo-asset';


import * as Location from 'expo-location';


//import components
import { ScrollView } from 'react-native-gesture-handler';



function  PlaceDetail(props) {
  const [infoPlace,setInfoPlace] = useState()

  let iconHeader = 'ios-star-outline'
  
 useEffect(()=>{
  props.navigation.setOptions({ title:"Détails du site",         
  headerRight:()=>(
    <Icon reverse name={iconHeader} type='Ionicons'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {saveActivity();}}  />
    ),  })
},[])


let saveActivity = async()=>{
// check if user is connected
  if(props.userInfo.email==false){
    Alert.alert(
      "Vous n'êtes pas connecté",
      "Connectez-vous ou créez un compte pour sauvegarder une activité.",
      [
        {
          text: 'Aller à la page connexion',
          onPress: () => navigation.navigate('ConnectScreen')
        },

        { text: 'OK'}
      ],
      { cancelable: false }
    );
  }else {
    let adress = infoPlace.address_components[0].short_name +", "+ infoPlace.address_components[1].short_name

    let infoToSend ={
      date : "undefined",
      name:infoPlace.name,
      category:props.listType.typeActivity,
      adress:adress,
      type:"bar",
      city: infoPlace.address_components[2].short_name, 
      postcode:infoPlace.address_components[6].short_name,
      lat:infoPlace.geometry.location.lat, 
      lon:infoPlace.geometry.location.lng,
      icon:infoPlace.icon,
      googleIdPlace:infoPlace.place_id,
    }
  
    let info = JSON.stringify(infoToSend)
    
    await fetch(`${ip}users/savecontactadress`,{
        method:"POST",
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body:`info=${info}&type=adress&email=${props.userInfo.email}`
      })
    
      iconHeader = 'ios-star'
  }

} 

console.log("recup props", props.item.place_id)

useEffect(()=>{

  let lat =  props.item.lat
  let lon = props.item.lon
  let name =  props.item.name
  let placeid = false

  if (props.item.place_id){
    placeid = props.item.place_id
}

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}googleinfo/pointinformation`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&lon=${lon}&name=${name}&place_id=${placeid}`
    })
    var placeRaw = await requestBDD.json()
  setInfoPlace(placeRaw.responseDetail)
  }
  recupDonnée()
  
},[])




// function share & other 
let webSite = async()=>{
  console.log(infoPlace.website)
  if(infoPlace.website){
    let result = await WebBrowser.openBrowserAsync(infoPlace.website);
  }else{
    let name = props.item.name
    let natureJoin = name.replace(/ /g, "+")
    let natureActivite = encodeURI(natureJoin);
  
    let result = await WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${natureActivite}`);
  }

}

let mapItineraire = async()=>{

  let url =`https://www.google.com/maps/dir/?api=1&destination=${infoPlace.name} ${props.item.adress}&destination_place_id=${props.item.place_id}8&travelmode=walking`
  let result = await WebBrowser.openBrowserAsync(url);
  //setNavWeb(result)

}

// add share option
const share = async () => {
    try {
      const result = await Share.share({
        message:
          `${props.item.name} situé à l'adresse : ${props.item.adress} `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };


let comment =[]

  
  let Affichage = () => {
    if (infoPlace == undefined){
      return (
        <View style={{display:"flex",flex:1}}>
            <Spinner color='blue' />
        </View>
       
      )
  
    }else {

     // let photoIdGet = infoPlace.photos[0].photo_reference
     // let photoPlaceLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoIdGet}&key=AIzaSyCXI24AWr0Cv2AXnbh29nVA9Ge7SPIvYBo`
     let photoId = infoPlace.photos
     let review = infoPlace.reviews
      let photoPlace = <Image source={require('../assets/img-404.png')}  style={{height: 200, width: null, flex: 1}}/>
      //let photoPlace= <Image source={{uri: `${photoPlaceLink}`}} style={{height: 200, width: null, flex: 1}}/>
      let photoPlaceLink
      let comment= <Text style={{flex:1}}>Aucun commentaire</Text> 
  
      // custom photo if find 
      if (photoId !== undefined ){
      let photoIdGet = infoPlace.photos[0].photo_reference
      photoPlaceLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoIdGet}&key=AIzaSyCXI24AWr0Cv2AXnbh29nVA9Ge7SPIvYBo`
      photoPlace= <Image source={{uri: `${photoPlaceLink}`}} style={{height: 200, width: null, flex: 1}}/>
      }

      if (review !== undefined ){
        comment= infoPlace.reviews.map((item,i)=>{
          return (
            <List key={i}>
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri: `${item.profile_photo_url}` }} />
              </Left>
              <Body>
                <Text>{item.author_name}</Text>
                <Text note>{item.text}</Text>
                <Text note>{item.relative_time_description}</Text>
              </Body>
              <Right>
                <Text note> note : {item.rating}</Text>
              </Right>
            </ListItem>
          </List>
        ) 
        })
        }

      
      return(
        <View style={styles.allCard}>

      
        <Card style={styles.cardContainer}>
                  <View style={{display:"flex",flexDirection:"row",margin:5}}> 
                    <View style={{alignSelf:"center",marginRight:15}}> 
                      <Thumbnail source={{uri: `${infoPlace.icon}`}} />
                    </View>
                    <View style={{flex:1}}> 
                    <Text  note style={styles.textTitle}>{infoPlace.name}</Text>
                        <Text style={styles.textSubTitle}>{infoPlace.formatted_address}</Text>
                    </View>
                  </View>

                  {photoPlace}


            <View style={styles.buttonActionCard}>
                    <Button transparent  onPress={() => {console.log('You tapped the button!');}}>
                    <Ionicons name="md-star" size={22} color="yellow" />
                      <Text>{infoPlace.rating}</Text>
                    </Button>

                    <Button transparent onPress={() => {webSite();}}>
                    <Ionicons name="md-globe" size={22} color='#80d6ff' />
                      <Text> Site internet</Text>
                    </Button>

                      <Button transparent onPress={() => {share();}}>
                      <Ionicons name="md-share" size={22} color='#80d6ff' />
                      <Text> Partager</Text>
                    </Button>

                    <Button transparent onPress={() => {mapItineraire();}}> 
                    <Ionicons name="md-navigate" size={22} color='#80d6ff' />
                      <Text> Aller</Text>
                    </Button>
                </View>
        </Card>
        <Card style={styles.cardContainer}>
          {comment}
        </Card>
      </View>
      )

    } 
  }   

 return (
<View style={styles.containerAll}> 
  <ScrollView>
    <Affichage />
  </ScrollView>
</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    flex:1,
    display:"flex",
    backgroundColor: '#80d6ff',  
  },

allCard:{   
  display:"flex",
  width:"98%",
  alignSelf:"center",
  margin:10
},
cardContainer:{
  borderRadius:20
},

  buttonActionCard:{
    width:"100%",
    flexDirection:"row", 
    justifyContent:"space-around",
    flex:1,
  },
 
  textTitle:{
    flex:1,
    flexWrap:"wrap",
    marginTop:15,
    fontSize:20,
    color:"#0077c2",
  },
  textSubTitle:{
    fontSize:17,
    flex:1,
    flexWrap:"wrap",
  }
})


function mapStateToProps(state) {
  return { position: state.position,item:state.infoPlace,listType:state.listType,userInfo:state.userInformation }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },
    listActivity: function(list) {
      dispatch( {type: 'addList',list:list} )
  }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(PlaceDetail);


//export default Home