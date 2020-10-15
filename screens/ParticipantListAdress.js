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

function AdressListParticipant(props) {

  let gradient = ["#80d6ff","#42a5f5","#0077c2","#42a5f5","#80d6ff"]
  const [nbAdress,setNbAdress] = useState(15)


let AffichageAdress

AffichageAdress =props.listAdress.map((item,i)=>{
  let id = item.id
  return (
  <View style={{marginTop:15,borderRadius:500,width:"80%"}}>
    <LinearGradient
    colors={gradient}
    start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
    >    
          <Card style={{display:"flex",flexDirection:"column"}}>
            <CardItem bordered style={{display:"flex",flexDirection:"column",alignContent:"flex-start",alignItems:"space-between"}}>
              <View style={styles.contentCard}> 
                <Text style={{fontSize:26,color:"#546e7a"}}>
                   {item.name}
                </Text>
                <TouchableOpacity onPress={() => alert("save")}>
                  <FontAwesome name="star" size={28} color="#0077c2" />
                </TouchableOpacity>
              </View>
            </CardItem>
            <CardItem >
              <View style={styles.contentCard}> 
                  <View> 
                    <Text style={styles.contentTextCard}>
                      {item.adress}
                    </Text>
                    <Text style={styles.contentTextCard}>
                      {item.postcode} - {item.city}
                    </Text>
                  </View>
                <TouchableOpacity onPress={() => props.deleteAdress({id})}>

                <FontAwesome name="remove" size={24} color="red" />
              </TouchableOpacity>
              </View>
            </CardItem>
          </Card>

    </LinearGradient>

  </View>

  )
})



  return (
  <View style={styles.container}>
    <ScrollView>

    <View style={styles.constainerList}> 
      
          {AffichageAdress}

        <LinearGradient
        colors={gradient}
          start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
          style={{ height: 48, width: 200, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
        >

          <TouchableOpacity style={styles.buttonContainer} onPress={()=>props.navigation.navigate('findadress')}>
            <Text style={styles.buttonText}>
              Ajouter une adresse
            </Text>
          </TouchableOpacity>
        </LinearGradient>
  

        </View>

    </ScrollView>
      <View style={{marginBottom:15}}> 
        <LinearGradient
          colors={gradient}
            start={{x: 0.0, y: 1.0}} end={{x: 2.0, y: 2.0}}
            style={{ height: 48, width: 400, alignItems: 'center', justifyContent: 'center', borderRadius:50,marginTop:20}}
          >
            <TouchableOpacity style={styles.buttonContainer} onPress={()=>alert('findadress')}>
              <Text style={styles.buttonText}>
                Valider
              </Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  constainerList:{
    alignItems:"center",
    flex:1,
  },

  content:{
   width:"90%",

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
},
  buttonText: {
    textAlign: 'center',
    color: 'white',
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
)(AdressListParticipant);

