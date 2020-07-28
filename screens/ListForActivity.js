import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, AsyncStorage} from 'react-native';

// import * as Font from 'expo-font';


function Home(props) {

  return (
    <View>
          <Text style={styles.categoryTitle}>List for activity</Text>
          <Text >List activity</Text>
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