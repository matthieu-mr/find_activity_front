export default function(position = "", action) {
  
    if(action.type == 'addPosition') {  
     let newPosition =action.location
      return newPosition;

    }
    else if (action.type== 'addDistance'){
     
      position.distance = action.location
      console.log("result", position)
      return position;
    } 
    
   else if (action.type == 'addManualAdress'){

      let newAdress = action.location
      console.log("manual",newAdress)
     return newAdress
   }
    else {
      return position;
    }
}