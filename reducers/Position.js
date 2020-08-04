export default function(position = [], action) {
  
    if(action.type == 'addPosition') {
      console.log('reducer Position',action.location)
      let newPosition = action.location
      return newPosition;
    
    } else {
      return position;
    }
}