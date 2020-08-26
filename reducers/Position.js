export default function(position = "", action) {
  
    if(action.type == 'addPosition') {  

     // console.log("add position",action)

     let newPosition =action.location
      return newPosition;

    } else {
      
      return position;
    }
}