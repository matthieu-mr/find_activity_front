export default function(listSavedAdress =false, action) {
    if(action.type == 'actionOnSavedChange') {
      let newaction =!listSavedAdress
      return newaction;
    
    } else {
      return listSavedAdress;
    }
}