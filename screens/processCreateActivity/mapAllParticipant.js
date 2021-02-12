import React,{useEffect} from 'react';
import { StyleSheet, View, Dimensions,} from 'react-native';
import {Marker} from 'react-native-maps';


import {connect} from 'react-redux';
import MapView, {Callout} from 'react-native-maps';

//import module

function mapComponent(props) {

    useEffect(()=>{
        props.navigation.setOptions({ title:"Point de RDV" } )
      },[])
      

let RdvPointAdress =()=>{
    return (
        <Marker
        key={"800"}
        coordinate=
        {{
            latitude: props.rdvPointAdress.lat,
            longitude:  props.rdvPointAdress.lon
    }}
        title={"Point de RDV"}
        description={""}
        pinColor="red"
        style={{width: 26, height: 28}}
        >
        </Marker>
    )
}

let ListParticipant =props.listAdress.map((item,i)=>{
    return (
        <Marker
        key={i}
        coordinate=
        {{
            latitude: item.lat,
            longitude:  item.lon
    }}
            title={item.name}
            description={`${item.adress},${item.city}`}
            pinColor="blue"
        >
        </Marker>
    )
})

  return (
    <View>
        <MapView style={styles.mapStyle} 
            initialRegion={{
            latitude: props.rdvPointAdress.lat,
            longitude:  props.rdvPointAdress.lon,
            latitudeDelta: 0.10,
            longitudeDelta: 0.10,
            }}
            moveOnMarkerPress={true}
            >

            {ListParticipant}
            <RdvPointAdress />
          
    </MapView>  
</View>
  
  );
}

// STYLES
const styles = StyleSheet.create({
  containerMap: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }, 
})


function mapStateToProps(state) {
  return { listAdress: state.listAdress,rdvPointAdress:state.rdvPointAdress}
}

function mapDispatchToProps(dispatch) {
  return {
    infoPlace: function(info) {
      dispatch( {type: 'callPlace',info:info} )
  },


  }
}



export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(mapComponent);





//export default ListType