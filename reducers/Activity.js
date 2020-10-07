export default function(listActivity = [], action) {

    if(action.type == 'addList') {
      let newList = action.list
      return newList;
    
    } else {
      return listActivity;
    }
}