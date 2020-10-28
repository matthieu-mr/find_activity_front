import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Button,Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content } from 'native-base';

import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';


import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';
import ListAdress from '../component/ListCardAdress'

import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import ButtonValidation from '../component/ButtonValidation'


function AdressListParticipant(props) {

props.navigation.setOptions({ title:"Liste des participants" })

let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
const [nbAdress,setNbAdress] = useState(15)

let AffichageAdress = []

AffichageAdress =props.listAdress.map((item,i)=>{
    return <ListAdress key={i} name={item.name} adress={item.adress} postcode={item.postcode} city={item.city} id={item.id} lat={item.lat} lon={item.lon} type="contact" action="delParticipant" screenShow="listParticipantAdress" isFavorite={item.isFavorite}/>;
})

const [button, setButton] = useState(0)

const [listButton,setListButton] = useState([
  {name:"Sortie" , isSelected : false, icon :<AntDesign name="isv" size={24} color="white" /> },
  {name:"Sport" , isSelected : false,  icon :<MaterialCommunityIcons name="run" size={24} color="white" />},
 
])


let ButtonCustomActivity = listButton.map((item,i)=>{

let SelectedGradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
if (i != button){ SelectedGradient = ["#c1d5e0","#90a4ae","#62757f","#90a4ae","#c1d5e0"]  }

  return(
    <TouchableOpacity style={{flex:1,alignItems:"center"}} onPress={()=>setButton(i)}>

    <LinearGradient
    colors={SelectedGradient}
    start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
    style={{ height: 48, width:"90%", alignItems: 'center', justifyContent: 'center', borderRadius:50}}
    >

        <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
        {item.icon}
            <Text style={styles.buttonText}>
                {item.name}
            </Text>
          
        </View>
    </LinearGradient>
  </TouchableOpacity>
  )
})


let validateAction = () => { 
  let nbAdress = props.listAdress.length
  let activity = listButton[0].name
  let adress = JSON.stringify(props.listAdress)
 // props.navigation.navigate("ListActivityType")

 getRdvPoint(adress)

  if(nbAdress==0){
    alert("merci d'ajouter une adresse",activity)
  }
  if(button==0){
  props.navigation.navigate("ListActivitySortie")
   }else if(button==1){
  props.navigation.navigate("ListActivitySport")
  }
  /*
  else{
    props.SelectedActivity(activity)
  }
 */
}



let getRdvPoint=async (adress)=>{
  var requestBDD = await fetch(`${ip}adress/getrdvpoint`,{
    method:"POST",
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body:`info=${adress}`
  })
  var listTypeRaw = await requestBDD.json()
  console.log(listTypeRaw)
  props.AddRdvPoint(listTypeRaw)
}



  return (
  <View style={styles.container}>
<View style={{backgroundColor:"white",width:"95%",alignSelf:"center",padding:5,marginTop:10,borderRadius:20}}> 
    <Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,alignSelf:"center"}}> Type d'activité</Text>
    <View style={{display:"flex",flexDirection:"row",marginBottom:20 }}> 
    {ButtonCustomActivity}
    </View>
</View>


<View style={styles.contentScreenList}>  
<ScrollView>

<Text style={{fontFamily:"Sansita-Bold", color:"#0077c2",fontSize:28,marginBottom:20,marginTop:20,alignSelf:"center"}}> Adresses </Text>

    <View style={styles.constainerList}> 
          {AffichageAdress}  
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>props.navigation.navigate('SearchAdressParticipant')}>

        <LinearGradient
        colors={gradient}
          start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
          style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
        >

            <Text style={styles.buttonText}>
              Ajouter une adresse
            </Text>
        </LinearGradient>
      </TouchableOpacity>
        </View>

    </ScrollView>
      <View style={{marginBottom:15,}}> 
        <TouchableOpacity style={styles.buttonOpacity} onPress={()=>validateAction()}>
                <ButtonValidation wordingLabel="Valider participants"/>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white', 
  },
  contentScreenList:{
    backgroundColor:"white",
    flex:1,
    width:'95%',
    alignSelf:"center",



  },
  constainerList:{
    alignItems:"center",
    flex:1,
  },

  contentTextCard:{
    fontSize:16,
    color:"#819ca9",

  },
  
  contentCard:{
    display:"flex",
    flexDirection:"row",
    width:"80%",
    justifyContent:"space-between",
    alignItems:"center",

},


  buttonInput:{
    textAlign: 'center',
    color: '#4C64FF',
    padding: 15,
    marginLeft: 1,
    marginRight: 1,
    width: 198,
    alignItems: 'center',
    },
    
  buttonContainer: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
},
  buttonText: {
    display:"flex",
    textAlign: 'center',
    color: 'white',
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
    alignSelf:"center"

}

});


function mapStateToProps(state) {
  return { listAdress: state.listAdress }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteAdress: function(item) {
        dispatch( {type: 'deleteAdress',item} )
    },
    SelectedActivity: function(item) {
      dispatch( {type: 'selectedActivity',item} )
  },
  AddRdvPoint: function(item) {
    dispatch( {type: 'addRdvPointAdress',item} )
},
  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AdressListParticipant);

