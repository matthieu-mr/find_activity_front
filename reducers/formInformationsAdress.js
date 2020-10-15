export default function(infoPlaceForm = "", action) {
    if(action.type == 'infoFormAdress') {
      let infoPlace = action.info
      let newplace ={...infoPlace}
      newplace.showListSearch = false
      
      return newplace;

    } else if(action.type == 'changeAdressFromFormSaved') {
      let infoPlace = action.info

      let newPlaceInfo = {...infoPlaceForm}
      newPlaceInfo.adress = infoPlace.properties.name
      newPlaceInfo.postcode = infoPlace.properties.postcode
      newPlaceInfo.city=infoPlace.properties.city
      newPlaceInfo.lat = infoPlace.geometry.coordinates[0]
      newPlaceInfo.lon = infoPlace.geometry.coordinates[1]
      newPlaceInfo.showListSearch = false
      
      return newPlaceInfo;
      
    }
    else if(action.type == 'showListSearchAdress') {

      let newPlaceInfo = {...infoPlaceForm}
      newPlaceInfo.showListSearch = true
      
      console.log(newPlaceInfo)

      return newPlaceInfo;
    }
    else if(action.type == 'EmptyFormAdress') {
      let emptyForm={
        name:"Veuillez saisir une adresse",
        showListSearch:true,
        action:"new",
        type:"contact"
      }
      

      return emptyForm;
    }else {
      return infoPlaceForm;
    }
}