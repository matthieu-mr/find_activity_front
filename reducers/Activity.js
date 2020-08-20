export default function(listActivity = "", action) {

    if(action.type == 'addList') {
      let newList = action
      return newList;
    
    } else {
      return listActivity;
    }
}