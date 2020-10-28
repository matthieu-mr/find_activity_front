export default function(rdvPoint ="", action) {
    // show particpant adress from form 
        if(action.type == 'addRdvPointAdress') {
            let rdvPoint = action.item
          return rdvPoint
        }
        else {
          return rdvPoint;
        }
    }