import { Item } from "native-base";

export default function(listAdresse = [], action) {

    if(action.type == 'addNewAdress') {
      let newList = [...listAdresse]
      let nbAdress = newList.length +1

      let newAdress ={ 
        id:nbAdress,
        name:`Adresse ${nbAdress}`,
        adress:action.location.properties.name,
        city:action.location.properties.city,
        postcode:action.location.properties.postcode,
        coords:action.location.geometry.coordinates,
        isFavorite:"false"
      }

      newList.push(newAdress)
      return newList
    }
    
    else if (action.type == 'deleteAdress'){
      let newList = [...listAdresse]
      let idDelete = action.item.id-1

     newList.splice(idDelete,1)

     newList.map((item,i)=>{
       item.name=`Adresse ${i + 1}`
     })

      return newList
    }
     
    
    else {
      return listAdresse;
    }
}