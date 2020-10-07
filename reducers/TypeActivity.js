export default function(typeActivity = [], action) {

    if(action.type == 'changeTypeActivity') {
      let newList = action.listType
  
      return newList;
    
    }else if(action.type == 'addTypeActivity') {
      let newList = action.listType

    
      return newList;
    
    }  else {
      return typeActivity;
    }
}