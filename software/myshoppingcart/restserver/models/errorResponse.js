/**
 * Created by SB004 on 3/15/2017.
 */
var errorResponse = function (status,message,errors) {
    this.status = status;
    this.error = errors;
    this.message = message;
   }
module.exports = errorResponse;