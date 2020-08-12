import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage, ScrollView,Text} from 'react-native';
import { List,Item,itemDivider,ListItem } from 'native-base';

import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import {connect} from 'react-redux';



//import module

function ListFirstLetter(props) {


  return (
    <View style={styles.containerAll}>
    <List>
  <ListItem itemDivider>
    <Text>A</Text>
  </ListItem>                    
  <ListItem>
    <Text>Aaron Bennet</Text>
  </ListItem>
  <ListItem>
    <Text>Ali Connors</Text>
  </ListItem>
  <ListItem itemDivider>
    <Text>B</Text>
  </ListItem>  
  <ListItem>
    <Text>Bradley Horowitz</Text>
  </ListItem>
</List>
</View>

  ) 



}

// STYLES
const styles = StyleSheet.create({
  categoryTitle: {
    color:"#383838", 
  },

})


function mapStateToProps(state) {
  return { listActivity: state.listActivity }
}

function mapDispatchToProps(dispatch) {
  return {
    position: function(location) {
        dispatch( {type: 'addPosition',location:location} )
    },

  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ListFirstLetter);





//export default ListType