export default function(infoPlace = "", action) {
    if(action.type == 'addplace') {
        console.log("reducer place")
      let newList = action.listType
      return newList;
    
    } else {
      return infoPlace;
    }
}