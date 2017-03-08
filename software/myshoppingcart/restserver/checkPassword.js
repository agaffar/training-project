/**
 * Created by SB004 on 3/8/2017.
 */
var passwordHash = require('./node_modules/password-hash/lib/password-hash');
var password = "sha1$482c85bb$1$60ea1b71ceb0eef90056a7a9be8cbe1c33b3c17e";
console.log(passwordHash.verify("Ameenu@213",password));