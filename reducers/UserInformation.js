export default function(userInformation = "", action) {
    if(action.type == 'informationUser') {
      let userInformation = action.item
      return userInformation;
    
    } else {
      return userInformation;
    }
}