export default function(listActivity = "", action) {

    if(action.type == 'addList') {
      console.log('reducer activity')
      return listActivity;
    
    } else {
      return listActivity;
    }
}