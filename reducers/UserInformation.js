export default function(userInformation = "", action) {
    if(action.type == 'informationUser') {
      let infoUser = action.item
      return infoUser;
    
    } else {
      return userInformation;
    }
}