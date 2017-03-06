/**
 * Created by SB004 on 3/6/2017.
 */
var tokenTypeEnums  = {
    "AUTHENTICATION": {code:"AUTHENTICATION", value: "Authentication"},
    "REGISTRATION": {code:"REGISTRATION", value: "Registration"},
    "OTP": {code:"OTP", value: "Otp"},
};


var tokenTypeEnumObj  = {
    values: Object.keys(tokenTypeEnums ),
    value: function (code) {
        return tokenTypeEnums[code].code;
    }
};
tokenTypeEnumObj = Object.assign(tokenTypeEnums , tokenTypeEnumObj);
module.exports = tokenTypeEnumObj;