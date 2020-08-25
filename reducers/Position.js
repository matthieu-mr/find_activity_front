export default function(position = "", action) {
  
    if(action.type == 'addPosition') {  
      newPosition =action.location
      console.log("props add position",action.location)

      position = newPosition

      return newPosition;
    
    } else if (action.type == "addDistance"){
      position.distance = action.location
      return position;

    } else {
      position="hello"
      return position;
    }
}