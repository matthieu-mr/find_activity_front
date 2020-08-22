export default function(typeActivity = "Toutes", action) {
    if(action.type == 'changeTypeActivity') {
      let newList = action.listType
      return newList;
    
    } else {
      return typeActivity;
    }
}