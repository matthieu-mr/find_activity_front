export default function(position = "", action) {
  
    if(action.type == 'addPosition') {  
     let newPosition =action.location
     console.log("add position",newPosition)
      return newPosition;

    }
    else if (action.type== 'addDistance'){
     
      position.distance = action.location
      position.type="manuel"
      console.log("add distance",position)
      return position;
    } 
    
   else if (action.type == 'addManualAdress'){
      let newAdress = action.location
      console.log("add adress",newAdress)
     return newAdress
   }
    else {
      return position;
    }
}