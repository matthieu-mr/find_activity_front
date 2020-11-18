export default function(typeActivity = [], action) {
     if(action.type == 'addActivity'){
      var typeActivite = action.item
      return typeActivite
    }

     else {
      return typeActivity;
    }

}