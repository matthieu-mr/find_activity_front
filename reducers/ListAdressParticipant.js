export default function(listAdress = [], action) {
// show particpant adress from form 
    if(action.type == 'addNewParticipantAdress') {
      let newList = [...listAdress]
      let nbAdress = newList.length +1
      let titleWording = `Adresse ${nbAdress}`
      let adressWording = action.info.title1

      console.log(adressWording)
      if(adressWording== undefined){
        adressWording=action.info.adress
      }
      
      if (action.info.screenShow =="addUserActualLocation"){
        titleWording=action.info.name
      }

      let newAdress ={ 
        id:nbAdress,
        name:titleWording,
        adress:adressWording,
        city:action.info.city,
        postcode:action.info.postcode,
        lat:action.info.lat,
        lon:action.info.lon,
        isFavorite:false
      }
      newList.push(newAdress)
      return newList
    }

    else if(action.type == 'addNewAdressContact') {

      let newList = [...listAdress]
      let nbAdress = newList.length +1

      let newAdress ={ 
        id:nbAdress,
        name:action.info.name,
        adress:action.info.adress,
        city:action.info.city,
        postcode:action.info.postcode,
        lat:action.info.lat,
        lon:action.info.lon,
        isFavorite:true,
      }
      newList.push(newAdress)
      
      return newList
    }

    
    else if (action.type == 'deleteAdressParticipant'){
      let newList = [...listAdress]
      let idDelete = action.info.id-1

        newList.splice(idDelete,1)


      return newList
    }
     
    
    else {
      return listAdress;
    }
}