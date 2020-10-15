import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Paper,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
import { Button,Form,Item, Input, Label, Card, CardItem, Body,Container,Header,Content } from 'native-base';

import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

//Style
import HeaderComponent from './component/header'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';

function listTypeActivitySortie(props) {

  let gradientSelected = ["#80d6ff","#42a5f5","#42a5f5","#80d6ff"]
  let noSelectGradient = ["#e2f1f8","#b0bec5","#808e95","#b0bec5","#e2f1f8"]
  const [nbAdress,setNbAdress] = useState(15)
  const [listTypeFromBdd,setlistTypeFromBdd] = useState([])

// get list of type 
// List type part 
    useEffect(()=>{
      async function recupDonnée(){
        var requestBDD = await fetch(`${ip}googleinfo/typegoogle`)
        var listTypeRaw = await requestBDD.json()
        let result = listTypeRaw.filteredCatagoryList
        setlistTypeFromBdd(result)
      }
      recupDonnée()
      
    },[])




let list = (
  <View style={{alignSelf:"center", width:"50%"}}> 
  <TouchableOpacity style={styles.buttonContainer} onPress={()=>alert('findadress')}>
        <LinearGradient
        colors={gradient}
        start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
        style={{ height: 48, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
        >
          <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
            <Text style={styles.buttonText}>
            Infos
            </Text>
            <MaterialCommunityIcons name="bookmark-check" size={24} color="white" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
  </View>
)
let copyList = [...listTypeFromBdd]
const [changeGilter,setChangeFilter] = useState(false)

let setValidated =(id)=>{
  setChangeFilter(!changeGilter)
  copyList.map((item,i)=>{
    if(id==i){item.setAffichageSortie = !item.setAffichageSortie}
  })

}

const [ckeckAll,setCheckAll] = useState(false)

let resetFilter = ()=>{
  setCheckAll(!ckeckAll)

  copyList.map((item)=>{
    item.setAffichageSortie = !ckeckAll
  })
}

let AffichageReset =()=> {
  let gradient = ckeckAll ?gradientSelected:noSelectGradient
  return (
      <View style={styles.constainerList}>  
      <View style={{marginBottom:15,alignSelf:"center"}}> 
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>resetFilter()}>
              <LinearGradient
              colors={gradient}
              start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
              style={{ height: 48, width: 400, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
              >
                <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                  <Text style={styles.buttonText}>
                  Toutes
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
        </View>
      </View>
    )
  }



let affichage = copyList.map((item,i)=>{

  let width = item.setAffichageSortie ?"98%":"85%" 
  let color = item.setAffichageSortie ?"white%":"black" 
  let fontSize = item.setAffichageSortie ?17:15
  let gradient = item.setAffichageSortie ?gradientSelected:noSelectGradient

    return (
      <View style={{alignSelf:"center",width:"50%"}} key={i}>
      <TouchableOpacity onPress={()=>{setValidated(i)}}>
            <LinearGradient
            colors={gradient}
            start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            style={{ height: 60, width:width,alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20,padding:15,alignSelf:"center"}}
            >
              <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                <Text style={{ textAlign: 'center',fontSize:fontSize,color:color, fontFamily: 'Baskerville-Black'}}>
                  {item}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
      </View>
    )
  
})



  return (
  <View style={styles.container}>
    <HeaderComponent/>
    <ScrollView>

    <AffichageReset />
    
    <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}> 
    {affichage}

    </View>

    
    </ScrollView>
      <View style={{marginBottom:15,alignSelf:"center"}}> 
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>alert('findadress')}>
            <LinearGradient
            colors={gradient}
            start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            style={{ height: 48, width: 400, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
            >
              <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                <Text style={styles.buttonText}>
                type activite
                </Text>
                <MaterialCommunityIcons name="send" size={28} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

    
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize:15,
    fontFamily: 'Baskerville-Black',
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

  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(listTypeActivitySortie);

