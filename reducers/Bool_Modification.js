export default function(listSavedAdress =false, action) {
  //new code : used list adresssaved refresh when modify information listSavedAdress <---> form adress
    if(action.type == 'actionOnSavedChange') {
      let newaction =!listSavedAdress
      return newaction;
    
    } else {
      return listSavedAdress;
    }
}