export default function(sportName = "", action) {

    if(action.type == 'addName') {
      let newList = action
      return newList;
    
    } else {
      return sportName;
    }
}