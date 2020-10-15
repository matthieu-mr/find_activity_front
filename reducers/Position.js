export default function(position = "", action) {
    
    if(action.type == 'addPosition') {  
     let newPosition =action.location
      return newPosition;

    }
    else if (action.type=== 'addDistance'){
      let newPosition = {...position}
      newPosition.dist = action.location
      newPosition.typeDist="manuel"
      return newPosition;
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