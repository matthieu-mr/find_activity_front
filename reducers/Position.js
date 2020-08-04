export default function(position = [], action) {
  
    if(action.type == 'addPosition') {
      console.log('reducer Position',action)
      return position;
    
    } else {
      return position;
    }
}