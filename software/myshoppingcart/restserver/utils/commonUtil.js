/**
 * Created by SB004 on 3/14/2017.
 */
var commonUtil = {
    getServerAddress : getServerAddress
}
function getServerAddress(reqObject){
    var serverAddress = reqObject.protocol + '://' + reqObject.get('host');
    return serverAddress;
}

module.exports = commonUtil;

