export default function(position = [], action) {
  
    if(action.type == 'addPosition') {
      
      let newPosition = action.location
      return newPosition;
    
    } else {
      return position;
    }
}