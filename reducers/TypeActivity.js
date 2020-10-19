export default function(typeActivity = [], action) {

    if(action.type == 'changeTypeActivity') {
      let newList = action.listType
  
      return newList;
    
    }
    else if(action.type == 'selectedActivity'){
      var typeActivite = action.item
      console.log("reducer",typeActivite.item)

      return typeActivite
    }

    else if(action.type == 'addActivity'){
      var typeActivite = action.item
      console.log("reducer",typeActivite.item)

      return typeActivite
    }
    else if(action.type == 'deleteActivity'){
      var typeActivite = action.item
      console.log("reducer",typeActivite.item)

      return typeActivite
    }



     else {
      return typeActivity;
    }

}