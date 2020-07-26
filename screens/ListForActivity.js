import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage} from 'react-native';
import { Avatar, Badge, Icon, withBadge,Card,List,ListItem, Image, Header,Overlay } from 'react-native-elements'

// import * as Font from 'expo-font';


function Home(props) {

  return (
    <View>
          <Text style={styles.categoryTitle}>List for activity</Text>
          <Text >See all</Text>
        </View>
  
  );
}

// STYLES
const styles = StyleSheet.create({
  categoryTitle: {
    color:"#383838", 
  },

})

export default Home