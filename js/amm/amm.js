/********************
 ** Amm JS library **
 ********************/
// Library singleton definition
if (typeof Amm == 'undefined') {
  var Amm = {};
  Amm.Util = {
    log: function(tag, msg) {
      if (arguments.length == 2) {
        msg = tag + ': ' + msg;
      } else {
        msg = tag;
      }
      var currentTime = Date();
      console.log(currentTime + " '" + msg + "'");
    }
  }
}