import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

import { Ionicons } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

//Style
import HeaderComponent from './component/Header'
import ButtonType from './component/ButtonActivity'

import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { ScrollView } from 'react-native-gesture-handler';



function listTypeActivitySortie(props) {

  let gradientSelected = ["#80d6ff","#42a5f5","#42a5f5","#80d6ff"]
  let noSelectGradient = ["#e2f1f8","#b0bec5","#808e95","#b0bec5","#e2f1f8"]
  
  const [nbAdress,setNbAdress] = useState(15)
  const [listActivityGoogleFromBdd,setlistActivityGoogleFromBdd] = useState([])
  const [listTypeGoogleFromBdd,setlistTypeGoogleFromBdd] = useState([])
  const [typeFilter,setTypeFilter] = useState("Entre amis")


  let typeActitySelected = "sport"

  let [copyListSortie,setListCopie] = useState([])
  //let copyListTypeSortie = [...listTypeGoogleFromBdd]

// get list of type 
// List type part 
    useEffect(()=>{
      async function recupDonnée(){
        var requestBDD = await fetch(`${ip}googleinfo/typegoogle`)
        var listTypeRaw = await requestBDD.json()
        let resultSortie = listTypeRaw.showCatergory
        let resultTypeSortie = listTypeRaw.categoryList

        setlistActivityGoogleFromBdd(resultSortie)
        setlistTypeGoogleFromBdd(resultTypeSortie)
      }
      recupDonnée()
      
    },[])

    useEffect(()=>{
    
        let array = []

        switch(typeFilter){
          case"toutes" : 
            listActivityGoogleFromBdd.map((item)=>{
              array.push(item)
              setListCopie(array)
          })
          break 

          default:
          listActivityGoogleFromBdd.map((item,i)=>{  
            if(item.category_fr == typeFilter){
              array.push(item)
              setListCopie(array)
            }
          })
        }

    },[listActivityGoogleFromBdd,typeFilter])


    
    let affichageFiltre=listTypeGoogleFromBdd.map((item,i)=>{
      let gradient = typeFilter==item.category_fr ?gradientSelected:noSelectGradient
      return (
        <View style={{marginBottom:15,alignSelf:"center"}}> 
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>setTypeFilter(item.category_fr)}>
                <LinearGradient
                colors={gradient}
                start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
                style={styles.buttonFilter}
                >
                    <Text style={styles.buttonText}>
                    {item.category_fr}
                    </Text>
                 
                </LinearGradient>
              </TouchableOpacity>
          </View>
      )
    })
    
    let AffichageReset =()=> {
      let gradient = typeFilter=="toutes" ?gradientSelected:noSelectGradient
      return (
  

          <View style={{marginBottom:15,alignSelf:"center"}}> 
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>setTypeFilter("toutes")}>
                  <LinearGradient
                  colors={gradient}
                  start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
                  style={styles.buttonFilter}
                  >
                    <View style={{flex:1,width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                      <Text style={styles.buttonText}>
                      Toutes
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
           
          </View>
        )
      }    
const [changeFilter,setChangeFilter] = useState(false)

let activeSelection = (selected)=>{ 
  setChangeFilter(!changeFilter)

  copyListSortie.map((item,i)=>{
   item.wording_fr == selected ? item.setAffichageSortie =!item.setAffichageSortie  : item.setAffichageSortie =item.setAffichageSortie 

  })

  }

      let affichageResult = copyListSortie.map((item,i)=>{
  
        let width = item.setAffichageSortie ?"98%":"85%" 
        let color = item.setAffichageSortie ?"white":"black" 
        let fontSize = item.setAffichageSortie ?17:15
        let gradient = item.setAffichageSortie ?gradientSelected:noSelectGradient

          return (
            <View style={{alignSelf:"center",width:"50%"}} key={i}>
            <TouchableOpacity onPress={()=>{activeSelection(item.wording_fr)}}>
                    <ButtonType key={i} width={width} color={color}  fontSize={fontSize} gradient={gradient} wording_fr={item.wording_fr}/>
                </TouchableOpacity>
            </View>
          )
        
      })
      
      
  return (
    <View style={styles.container}>
    <HeaderComponent/>
 
      <View style={styles.constainerFilterList}> 
        <ScrollView  horizontal={true}>
          <AffichageReset />{affichageFiltre}
        </ScrollView>
      </View>

      <View style={{display:"flex",flex:5,flexDirection:"row",alignContent:"flex-start"}}> 
        <ScrollView>
          <View style={{display:"flex",flex:5,flexDirection:"row",flexWrap:"wrap",alignContent:"flex-start"}}> 
          {affichageResult}
          </View>
          </ScrollView>
      </View>


      <View style={{marginBottom:15,alignSelf:"flex-start"}}> 
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>alert('findadress')}>
            <LinearGradient
            colors={gradient}
            start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            style={{ height: 48, width: 400, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
            >
              <View style={{width:"80%",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}}>
                <Text style={styles.buttonText}>
                Valider
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
    alignContent:"flex-start"
  },
  constainerFilterList:{
  
    display:"flex",
    flexDirection :"row",
    flex:1,
    height: 10,
  },
  buttonFilter:{
    height: 60,
     width: 150, 
     alignItems: 'center', 
     justifyContent: 'center',
      borderRadius:50,
      marginTop:20,
      marginLeft:15,
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
    addActivity: function(item) {
      dispatch( {type: 'addActivity',item} )
  },
  deleteActivity: function(item) {
    dispatch( {type: 'deleteAdress',item} )
},

  }
}


export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(listTypeActivitySortie);

