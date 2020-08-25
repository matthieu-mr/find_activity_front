export default function(position = "", action) {
  
    if(action.type == 'addPosition') {  
      position =action.location
      console.log("props add position",position)
      return position;
    
    } else if (action.type == "addDistance"){
      position.distance = action.location
      return position;

    } else {
      position="hello"
      return position;
    }
}