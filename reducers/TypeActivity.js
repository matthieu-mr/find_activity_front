export default function(typeActivity = "Toutes", action) {
    if(action.type == 'changeTypeActivity') {
      console.log('reducer activity',action)
      return typeActivity;
    
    } else {
      return typeActivity;
    }
}