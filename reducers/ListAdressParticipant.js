export default function(listAdresse = [], action) {
// show particpant adress from form 
    if(action.type == 'addNewParticipantAdress') {
      
      let newList = [...listAdresse]
     
      let nbAdress = newList.length +1

      let newAdress ={ 
        id:nbAdress,
        name:`Adresse ${nbAdress}`,
        adress:action.info.title1,
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
      let newList = [...listAdresse]
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
      let newList = [...listAdresse]

      let idDelete = action.info.id-1

        newList.splice(idDelete,1)
        newList.map((item,i)=>{

          if (item.isFavorite){
            item.id=i
          }else{
            item.name=`Adresse ${i}`
            item.id=i
          }
         
        })

      return newList
    }
     
    
    else {
      return listAdresse;
    }
}