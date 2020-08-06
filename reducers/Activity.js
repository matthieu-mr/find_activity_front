export default function(listActivity = "", action) {

    if(action.type == 'addList') {
      //console.log('reducer activity',action)
      let newList = action
      return newList;
    
    } else {
      return listActivity;
    }
}