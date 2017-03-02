/**
 * Created by SB004 on 3/2/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var offerSchema = new Schema({

        type:{
            type:String
        },
        amount:{
            type:SchemaTypes.Double
        },
        percentage:{
            type:SchemaTypes.Double
        }

    },
    {collection:'offers'}
);
/*productSchema.plugin(mongoosePaginate);*/
var productModel = mongoose.model('Offer', offerSchema);
module.exports=productModel;

