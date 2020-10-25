import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text,Image,Share  } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {Spinner,Card,CardItem,Left,Thumbnail,Body,Button,Right,List,ListItem,Badge,Icon} from 'native-base';



import * as Location from 'expo-location';


//import components
import { ScrollView } from 'react-native-gesture-handler';



function  PlaceDetail(props) {

  props.navigation.setOptions({ title:"Détails du site", headerRight:()=>(
    <Icon reverse name="star-outlined" type='Entypo'  color="#009387" size={25} style={{ marginRight: 10, color:"white" }} onPress ={()=> {alert('Parametres');}}  />
    ),  }
   )
const [infoPlace,setInfoPlace] = useState()

// recuperation des POI 
useEffect(()=>{


  let lat =  props.item.lat
  let lon = props.item.lon
  let name =  props.item.name

console.log("request",`lat=${lat}&long=${lon}&name=${name}`)


  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}pointinformation`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&name=${name}`
    })
    var placeRaw = await requestBDD.json()
    console.log("recup bdd",placeRaw)
   setInfoPlace(placeRaw)
  }
  recupDonnée()
  
},[])



//console.log("hours Test",infoPlace.response.opening_hours)

let Affichage = () => {
  if (infoPlace == undefined){
    return (
      <View style={{display:"flex",flex:1,backgroundColor:"red"}}>
          <Spinner color='green' />
      </View>
     
    )

  }else {
  
    if (infoPlace.existe == false){ // pas de resultat google place

      let startInfo = props.item.adress
      let namePlace = startInfo.insnom
      let adressPlace = startInfo.inslibellevoie + ", "+startInfo.inscodepostal + "," + startInfo.comlib
      let typePlace =  <Badge style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }}>{props.item.item.fields.naturelibelle}</Text></Badge>
      let iconPlace =  <Image source={require('../assets/img-404.png')}  style={{height: 200, width: null, flex: 1}}/>
      let photoPlace =  <Image source={require('../assets/img-404.png')}  style={{height: 200, width: null, flex: 1}}/>

            // function share 
            const [navWeb,setNavWeb] = useState(null)

            //ajout webview
            let webSite = async()=>{
                let result = await WebBrowser.openBrowserAsync(websitePlace);
                setNavWeb(result)
            }

            let mapItineraire = async()=>{
              let lat =  props.item.lat
              let lon = props.item.long
              let encodedName = encodeURI(namePlace)
                
              let url =`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${encodedName}&destination_place_id=${idPlace}8&travelmode=walking`

                
              let result = await WebBrowser.openBrowserAsync(url);
              setNavWeb(result)

            }

            // add share option
              const share = async () => {
                  try {
                    const result = await Share.share({
                      message:
                        `${namePlace} situé à l'adresse : ${adressPlace} `,
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


      return (


      <ScrollView>
        <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: `${iconPlace}`}} />
                    <Body>
                        <Text style={styles.textTitle}>{namePlace}</Text>
                        <Text note>{adressPlace}</Text>
                        <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",margin:5}}> 
                          {typePlace}
                        </View>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  {photoPlace}
                </CardItem>
                <CardItem>
              <Body>

            <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",flex:1}}>


                    <Button transparent onPress={() => {webSite();}}>
                    <Ionicons name="md-globe" size={22} color="green" />
                      <Text> Site internet</Text>
                    </Button>

                      <Button transparent onPress={() => {share();}}>
                      <Ionicons name="md-share" size={22} color="green" />
                      <Text> Partager</Text>
                    </Button>

                    <Button transparent onPress={() => {mapItineraire();}}> 
                    <Ionicons name="md-navigate" size={22} color="green" />
                      <Text> Aller</Text>
                    </Button>
                </View>
              </Body>
            </CardItem>
          </Card>
        </ScrollView>
      )
    }else { // resultat google place 
       
        let adressPlace = infoPlace.response.candidates[0].formatted_address
        let iconPlace =infoPlace.response.candidates[0].icon
        let namePlace = infoPlace.response.candidates[0].name
        let photoId = infoPlace.response.candidates[0].photos
        let notePlace = infoPlace.response.candidates[0].rating
        let commentPlace = infoPlace.response.candidates[0].reviews
        let websitePlace = infoPlace.responseDetail.website

        let idPlace = infoPlace.response.candidates[0].place_id
        let photoPlace =  <Image source={require('../assets/img-404.png')}  style={{height: 200, width: null, flex: 1}}/>

// custom photo if find 
        if (photoId ){
         let photoIdGet = infoPlace.response.candidates[0].photos[0].photo_reference
        let photoPlaceLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoIdGet}&key=AIzaSyCXI24AWr0Cv2AXnbh29nVA9Ge7SPIvYBo`
        photoPlace= <Image source={{uri: `${photoPlaceLink}`}} style={{height: 200, width: null, flex: 1}}/>
        }

// get comments 
let commentArray =  infoPlace.responseDetail.reviews.map((item,i)=>{

  let name=item.author_name
  let picture =item.profile_photo_url
  let rating = item.rating
  let time = item.relative_time_description
  let comment = item.text

// Add comment to page
  return (
      <List key={i}>
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: `${picture}` }} />
        </Left>
        <Body>
      <Text>{name}</Text>
          <Text note>{comment}</Text>
          <Text note>{time}</Text>
        </Body>
        <Right>
  <Text note> note : {rating}</Text>
        </Right>
      </ListItem>
    </List>
  ) 
});

// --- Badge 
let badgeOpen =   <Badge style={{ backgroundColor: 'red' }}><Text style={{ color: 'white' }}>Fermé</Text></Badge>
let typePlace =  <Badge style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }}>{props.item.naturelibelle}</Text></Badge>
/*
      if (infoPlace.responseDetail.opening_hours.open_now =true){
        badgeOpen =   <Badge style={{ backgroundColor: 'green' }}><Text style={{ color: 'white' }}>Ouvert</Text></Badge>
      }
      else {
        badgeOpen =   <Badge style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }}>Pas d'informations</Text></Badge>
      }

*/
// function share 
const [navWeb,setNavWeb] = useState(null)


//ajout webview
let webSite = async()=>{
  
    let result = await WebBrowser.openBrowserAsync(websitePlace);
    setNavWeb(result)
}

let mapItineraire = async()=>{
  let lat =  props.item.lat
  let lon = props.item.lon
  let name =  props.item.name

  let latitudePlace =infoPlace.response.candidates[0].geometry.location.lat
  let longitudePlace =infoPlace.response.candidates[0].geometry.location.lng

    let encodedName = encodeURI(namePlace)

    let url =`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${encodedName}&destination_place_id=${idPlace}8&travelmode=walking`
    
    let result = await WebBrowser.openBrowserAsync(url);
    setNavWeb(result)

}

// add share option
const share = async () => {
    try {
      const result = await Share.share({
        message:
          `${namePlace} situé à l'adresse : ${adressPlace} `,
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

      return (
      <ScrollView>
        <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: `${iconPlace}`}} />
                    <Body>
                        <Text style={styles.textTitle}>{namePlace}</Text>
                        <Text note>{adressPlace}</Text>
                        <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",margin:5}}> 
                          {badgeOpen}
                          {typePlace}
                        </View>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  {photoPlace}
                </CardItem>
                <CardItem>
              <Body>

            <View style={{display:"flex",flexDirection:"row", justifyContent:"space-around",flex:1}}>
                    <Button transparent  onPress={() => {console.log('You tapped the button!');}}>
                    <Ionicons name="md-star" size={22} color="yellow" />
                      <Text>{notePlace}</Text>
                    </Button>

                    <Button transparent onPress={() => {webSite();}}>
                    <Ionicons name="md-globe" size={22} color="green" />
                      <Text> Site internet</Text>
                    </Button>

                      <Button transparent onPress={() => {share();}}>
                      <Ionicons name="md-share" size={22} color="green" />
                      <Text> Partager</Text>
                    </Button>

                    <Button transparent onPress={() => {mapItineraire();}}> 
                    <Ionicons name="md-navigate" size={22} color="green" />
                      <Text> Aller</Text>
                    </Button>
                </View>
              </Body>
            </CardItem>
          </Card>
           {commentArray}
            </ScrollView>

      )
    }
  }
}


 return (

 <View style={{backgroundColor:"white"}}>
  <Affichage/>
</View>

  );
}

// STYLES
const styles = StyleSheet.create({
  containerAll: {
    flex: 1, 
    backgroundColor: '#fff', 
  },
  searchField:{
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
  },
  adressField:{
    flex:1
  },
  distanceField:{
    flex:1
  },
  textTitle:{
    marginTop:15,
    fontSize:20
  }
})


function mapStateToProps(state) {
  return { position: state.position,item:state.infoPlace }
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