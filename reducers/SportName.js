export default function(sportName = "", action) {

    if(action.type == 'addName') {
      let newList = action.name
      return newList;
    
    } else {
      return sportName;
    }
}