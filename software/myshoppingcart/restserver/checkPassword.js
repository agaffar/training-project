/**
 * Created by SB004 on 3/8/2017.
 */
var passwordHash = require('./node_modules/password-hash/lib/password-hash');
var password = "sha1$702042d1$1$cb60a5a9ee88ade6f13557f373ddca4af037ebbb";
console.log(passwordHash.verify("Arif@786",password));
var num1 = 98765432123456780;
var num2 = 12313342131;

console.log(num1+num2);