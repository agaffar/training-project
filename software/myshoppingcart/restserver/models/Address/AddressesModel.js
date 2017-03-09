/**
 * Created by SB004 on 3/9/2017.
 */
/**
 * Created by SB004 on 3/2/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var addressSchema = new Schema({

        type:{
            type:String,
            required : true
        },
        addressLine1:{
            type:String
        },
        addressLine2:{
            type:String
        },
        streetVillage:{
            type:String
        },
        townCity:{
            type:String
        },
        district:{
            type:String
        },
        state:{
            type:String
        },
        country:{
            type:String
        },
        zipCode:{
            type:Number
        }

    },
    {collection:'addresses'}
);
/*productSchema.plugin(mongoosePaginate);*/
var addressModel = mongoose.model('Address', addressSchema);
module.exports = addressModel;

