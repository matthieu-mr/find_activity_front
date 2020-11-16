export default function(userInformation = "", action) {
    if(action.type == 'informationUser') {
      let userInformation = action.item
      console.log("info in props", userInformation)
      return userInformation;
    
    } else {
      return userInformation;
    }
}