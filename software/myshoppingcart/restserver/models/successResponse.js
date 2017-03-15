/**
 * Created by SB004 on 3/15/2017.
 */
var successResponse = function (status,data,pagination,message) {
    this.status = status;
    this.data = data;
    this.message = message;
    console.log(pagination)
    if(pagination){
        this.pagination = {};
        this.pagination.total = pagination.total;
    }
}

module.exports = successResponse;