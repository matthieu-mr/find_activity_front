export default function(position = "", action) {
    
    if(action.type == 'addPosition') {  
     let newPosition =action.location
  
      return newPosition;

    }
    else if (action.type=== 'addDistance'){
      position.dist = action.location
      position.typeDist="manuel"
      return position;
    } 
    
   else if (action.type == 'addManualAdress'){
      let newAdress = action.location
     return newAdress
   }

   else if (action.type === "changeTypeActivityPosition"){
     
     position.activityType = action.typeActivityToProps
      return position
   }


    else {
      return position;
    }
}