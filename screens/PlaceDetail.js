import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View,Dimensions,Text,Image,Share  } from 'react-native';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';

import {connect} from 'react-redux';
import {Spinner,Card,CardItem,Left,Thumbnail,Body,Button,Icon,Right,List,ListItem,Badge} from 'native-base';



import * as Location from 'expo-location';


//import components
import { ScrollView } from 'react-native-gesture-handler';



function  PlaceDetail(props) {


const [infoPlacesOld,setInfoPlaceOld]= useState ({
    "responseDetail": {
        "html_attributions": [],
        "result": {
            "address_components": [
                {
                    "long_name": "23",
                    "short_name": "23",
                    "types": [
                        "street_number"
                    ]
                },
                {
                    "long_name": "Avenue Junot",
                    "short_name": "Avenue Junot",
                    "types": [
                        "route"
                    ]
                },
                {
                    "long_name": "Paris",
                    "short_name": "Paris",
                    "types": [
                        "locality",
                        "political"
                    ]
                },
                {
                    "long_name": "Arrondissement de Paris",
                    "short_name": "Arrondissement de Paris",
                    "types": [
                        "administrative_area_level_2",
                        "political"
                    ]
                },
                {
                    "long_name": "Île-de-France",
                    "short_name": "IDF",
                    "types": [
                        "administrative_area_level_1",
                        "political"
                    ]
                },
                {
                    "long_name": "France",
                    "short_name": "FR",
                    "types": [
                        "country",
                        "political"
                    ]
                },
                {
                    "long_name": "75018",
                    "short_name": "75018",
                    "types": [
                        "postal_code"
                    ]
                }
            ],
            "adr_address": "<span class=\"street-address\">23 Avenue Junot</span>, <span class=\"postal-code\">75018</span> <span class=\"locality\">Paris</span>, <span class=\"country-name\">France</span>",
            "business_status": "OPERATIONAL",
            "formatted_address": "23 Avenue Junot, 75018 Paris, France",
            "geometry": {
                "location": {
                    "lat": 48.8882439,
                    "lng": 2.3354995
                },
                "viewport": {
                    "northeast": {
                        "lat": 48.8896215302915,
                        "lng": 2.336916980291502
                    },
                    "southwest": {
                        "lat": 48.8869235697085,
                        "lng": 2.334219019708498
                    }
                }
            },
            "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
            "name": "CLAP - Club Lepic Abbesses Pétanque",
            "photos": [
                {
                    "height": 2448,
                    "html_attributions": [
                        "<a href=\"https://maps.google.com/maps/contrib/107892677513730583522\">Nicolas Jammes</a>"
                    ],
                    "photo_reference": "CmRaAAAAJmTKnGcwBRBtQJ-dfInOUzjIRi9ASOmcX95Jr-Kt3MEeSD-U9sgbaZMyVdSRe7rEzpWNUjZCCtkcCHTuyr2HM_Qc0_eyHkecxMCxiRx7EpBYeheF4r0q_y0dhPlHSafIEhDYC6UMf8n7vTJXYDHw0N5mGhTHyPNIYRBeHjkouTdA97Es743DAg",
                    "width": 3264
                }
            ],
            "place_id": "ChIJf6TA2W5v5kcRw7ro2f93sm4",
            "rating": 4.7,
            "reviews": [
                {
                    "author_name": "Santos D-S-G",
                    "author_url": "https://www.google.com/maps/contrib/103085080435343602135/reviews",
                    "language": "fr",
                    "profile_photo_url": "https://lh4.ggpht.com/-emIRX2KB3Z0/AAAAAAAAAAI/AAAAAAAAAAA/OiMXIq7A3tg/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                    "rating": 4,
                    "relative_time_description": "9 months ago",
                    "text": "J'y vais entant qu'invité par des amis membre du Clap. Un pur dépaysement en plein Paris. Lieu très convivial . Vive la commune de Montmartre.",
                    "time": 1572974914
                },
                {
                    "author_name": "Jérôme Del Toso",
                    "author_url": "https://www.google.com/maps/contrib/114053926856878612270/reviews",
                    "profile_photo_url": "https://lh3.ggpht.com/-zJ8hR7OjPk4/AAAAAAAAAAI/AAAAAAAAAAA/Gy0MYzHV4s8/s128-c0x00000000-cc-rp-mo/photo.jpg",
                    "rating": 5,
                    "relative_time_description": "6 months ago",
                    "text": "",
                    "time": 1579475175
                },
                {
                    "author_name": "Deep Sounddj",
                    "author_url": "https://www.google.com/maps/contrib/113629236454484232931/reviews",
                    "profile_photo_url": "https://lh5.ggpht.com/-yXIzXYxJtGk/AAAAAAAAAAI/AAAAAAAAAAA/jZJTAAtw_zI/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                    "rating": 5,
                    "relative_time_description": "a year ago",
                    "text": "",
                    "time": 1564687922
                }
            ],
            "user_ratings_total": 3,
            "website": "http://www.clap-montmartre.fr/"
        },
        "status": "OK"
    }
})

const [infoPlace,setInfoPlace] = useState()


// recuperation des POI 
useEffect(()=>{


  let lat =  props.detailProps.lat
  let lon = props.detailProps.long
  let name =  props.detailProps.name

  async function recupDonnée(){
    var requestBDD = await fetch(`${ip}pointinformation`,{
      method:"POST",
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body:`lat=${lat}&long=${lon}&name=${name}`
    })
    var placeRaw = await requestBDD.json()
   setInfoPlace(placeRaw)
  }
  recupDonnée()
  
},[])


let Affichage = () => {
  if (infoPlace == undefined){
    return (
      <View style={{display:"flex",flex:1,backgroundColor:"red"}}>
          <Spinner color='green' />
      </View>
     
    )

  }else {
  
    if (infoPlace.existe == false){ // pas de resultat google place
      console.log("return ",props.detailProps.item.fields)
      let startInfo = props.detailProps.item.fields
      let namePlace = startInfo.insnom
      let adressPlace = startInfo.inslibellevoie + ", "+startInfo.inscodepostal + "," + startInfo.comlib
      let typePlace =  <Badge style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }}>{props.detailProps.item.fields.naturelibelle}</Text></Badge>
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
              let lat =  props.detailProps.lat
              let lon = props.detailProps.long
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

console.log("props type",props.responseDetail)


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
let typePlace =  <Badge style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }}>{props.detailProps.item.fields.naturelibelle}</Text></Badge>

      if (infoPlace.responseDetail.opening_hours.open_now =true){
        badgeOpen =   <Badge style={{ backgroundColor: 'green' }}><Text style={{ color: 'white' }}>Ouvert</Text></Badge>
      }
      else {
        badgeOpen =   <Badge style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }}>Pas d'informations</Text></Badge>
      }


// function share 
const [navWeb,setNavWeb] = useState(null)


//ajout webview
let webSite = async()=>{
  
    let result = await WebBrowser.openBrowserAsync(websitePlace);
    setNavWeb(result)
}

let mapItineraire = async()=>{
  let lat =  props.detailProps.lat
  let lon = props.detailProps.long
  let name =  props.detailProps.name

  let latitudePlace =infoPlace.response.candidates[0].geometry.location.lat
  let longitudePlace =infoPlace.response.candidates[0].geometry.location.lng

    let encodedName = encodeURI(namePlace)
    let test="https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJISz8NjyuEmsRFTQ9Iw7Ear8&travelmode=walking"
    
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
  return { position: state.position,detailProps:state.infoPlace }
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