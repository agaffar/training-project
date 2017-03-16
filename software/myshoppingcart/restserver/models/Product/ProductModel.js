/**
 * Created by SB004 on 2/28/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var productSchema = new Schema({
        productId:{
            type:String,
            trim:true,
            required: true
        },
        productName:{
            type:String,
            trim:true,
            required: true
        },
        productPrice:{
            type:SchemaTypes.Double ,
            trim:true,
            required: true
        },
        description:{
            type:String
        },
        type:{
            type:String
        },
        brand:{
            type:String
        },
        subType:{
            type:String
        },
        ram: {
            type : String
        },
        productModelName :{
            type : String
        } ,
        color :{
            type : String
        } ,
        battery: {
            type : String
        },
        camera: {
           type : Object
        },
        author:{
            type:String
        },
        rating:{
            type:SchemaTypes.Double
        },
        comments:[{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        offers:[{
         type: Schema.Types.ObjectId,
         ref: 'Offer'
         }],
        features :{
            type : Object
        }
    },
    {collection:'products'}
);
/*productSchema.plugin(mongoosePaginate);*/
var productModel = mongoose.model('Product', productSchema);
module.exports=productModel;

