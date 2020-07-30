import React,{useState,useEffect,Component} from 'react';
import { StyleSheet, View, AsyncStorage} from 'react-native';
import { Container, Header,Text, Item, Input, Icon, Content, Card, CardItem, Right } from 'native-base';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import * as Location from 'expo-location';


//import module

function ListType(props) {


  return (
    <View>
          <Card>
            <CardItem  onPress={() => {alert('You tapped the button!');}}>
              <Icon active name="logo-googleplus" />
              <Text>Indoor qui tue</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>

    </View>
  
  );
}

// STYLES
const styles = StyleSheet.create({
  categoryTitle: {
    color:"#383838", 
  },

})

export default ListType