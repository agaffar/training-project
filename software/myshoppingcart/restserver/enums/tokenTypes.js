/**
 * Created by SB004 on 3/6/2017.
 */
var tokenTypeEnum  = {
    "AUTHENTICATION": {code:"AUTHENTICATION", value: "Authentication"},
    "REGISTRATION": {code:"REGISTRATION", value: "Registration"},
    "OTP": {code:"OTP", value: "Otp"},
};


var tokenTypeEnumObj  = {
    values: Object.keys(tokenTypeEnum ),
    value: function (code) {
        return tokenTypeEnum[code].code;
    }
};
tokenTypeEnumObj = Object.assign(tokenTypeEnum , tokenTypeEnumObj);
module.exports = tokenTypeEnumObj;