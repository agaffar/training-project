/**
 * Created by SB004 on 3/16/2017.
 */
var marshalUser = function(user){
    console.log("in marshal");
    console.log(user);
    this.user = {};
    this.user._id = user._id;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.isActive = user.isActive;
    this.user.email = user.email;
    this.user.phoneNumber = user.phoneNumber;

}
module.exports = marshalUser;