export default function(position = "", action) {
  
    if(action.type == 'addPosition') {  
     let newPosition =action.location
     console.log("add position",newPosition)
      return newPosition;

    }
    else if (action.type=== 'addDistance'){
     
      position.distance = action.location
      position.type="manuel"
      return position;
    } 
    
   else if (action.type == 'addManualAdress'){
      let newAdress = action.location
      console.log("add adress",newAdress)
     return newAdress
   }

   else if (action.type === "changeTypeActivityPosition"){
    //  position.activityType = action

      console.log("change type activite",action)
      return position
   }
    else {
      return position;
    }
}