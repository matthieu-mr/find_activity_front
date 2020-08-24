export default function(infoPlace = "", action) {
    if(action.type == 'callPlace') {
        console.log("reducer place",action)

      let newList = action.listType
      return infoPlace;
    
    } else {
      return infoPlace;
    }
}