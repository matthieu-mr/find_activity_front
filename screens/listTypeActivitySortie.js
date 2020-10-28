import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

//Style
import HeaderComponent from './component/Header'
import ButtonType from './component/ButtonActivity'
import ButtonValidation from './component/ButtonValidation'


import { ScrollView } from 'react-native-gesture-handler';



function listTypeActivitySortie(props) {
  props.navigation.setOptions({ title:"Sélection sortie" } )
  let gradientSelected = gradient
  let noSelectGradient = ["#e2f1f8","#b0bec5","#808e95","#b0bec5","#e2f1f8"]
  
 // const [nbAdress,setNbAdress] = useState(15)
  const [listActivityGoogleFromBdd,setlistActivityGoogleFromBdd] = useState([])
  const [listTypeGoogleFromBdd,setlistTypeGoogleFromBdd] = useState([])
  const [typeFilter,setTypeFilter] = useState("toutes")
  const [changeFilter,setChangeFilter] = useState(false)
  const [alertSelectActivity, setalertSelectActivity] =useState(<Text></Text>)

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


let goMap =()=>{
  let search=[]
  copyListSortie.map((item,i)=>{
    if(item.setAffichageSortie){
      search.push(item.google_label)
    }
  })


  if(search.length==0){
    setalertSelectActivity(<Text style={{color:"red",alignSelf:'center',fontSize:20}}>Veuillez selectionner une activité</Text>)

  }else{
    let item ={
      typeActivity:"sortie",
      activity:search,
      filteredActivity:"sortie"
    }
    props.addActivity(item)
    props.navigation.navigate("MapActivity")
  }

}



let activeSelection = (selected)=>{ 
  setChangeFilter(!changeFilter)
  setalertSelectActivity(<Text style={{color:"red",alignSelf:'center',fontSize:20}}></Text>)

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

      {alertSelectActivity}
      <View style={{marginBottom:15}}> 
        <TouchableOpacity style={styles.buttonOpacity} onPress={()=>goMap()}>
                <ButtonValidation wordingLabel="Valider participants"/> 
        </TouchableOpacity>
      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:"flex-start",
    backgroundColor: 'white', 
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
  return { listAdress: state.listAdress,rdvPoint:state.rdvPointAdress }
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

