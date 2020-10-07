export default function(typeActivity = [], action) {

    if(action.type == 'changeTypeActivity') {
      let newList = action.listType
  
      return newList;
    
    } else {
      return typeActivity;
    }
}