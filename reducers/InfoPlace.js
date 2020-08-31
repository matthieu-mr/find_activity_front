export default function(infoPlace = "", action) {
    if(action.type == 'callPlace') {
      let newList = action.info

      return newList;
    
    } else {
      return infoPlace;
    }
}