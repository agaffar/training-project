/**
 * Created by SB004 on 3/6/2017.
 */
/**
 * Created by SB004 on 3/6/2017.
 */
//type{AUTH/REGISTRATION/OTP}, email, startDate, updatedDate, id
/**
 * Created by SB004 on 2/28/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var tokenSchema = new Schema({
        type:{
            type:String
        },
        email:{
            type:String,
            trim:true,
            required: true
        },
        startDate:{
            type:Date
        },
        updatedDate:{
            type:Date
        }

    },
    {collection:'tokens'}
);
/*productSchema.plugin(mongoosePaginate);*/
var tokenModel = mongoose.model('Token', tokenSchema);
module.exports=tokenModel;

