export default function(radioId = "", action) {
    if(action.type == 'sendRadioId') {
      return action.radioId;
    } else {
      return radioId;
    }
}