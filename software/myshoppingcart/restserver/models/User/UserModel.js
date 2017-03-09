/**
 * Created by SB004 on 3/6/2017.
 */
//email, password, phoneNumber, firstName, lastName, startDate, updatedDate, id, isActive(true/fals
/**
 * Created by SB004 on 2/28/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

var userSchema = new Schema({
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        email:{
            type:String,
            trim:true,
            required: true
        },
        password:{
            type:String,
            trim:true,
            required: true
        },
        phoneNumber:{
            type:Number ,
            trim:true,
            required: true
        },

        startDate:{
            type:Date
        },
        updatedDate:{
            type:Date
        },
        isActive: {
            type : Boolean
        },
        address :[{
            type: Schema.Types.ObjectId,
            ref: 'Address'
        }]

    },
    {collection:'users'}
);
/*productSchema.plugin(mongoosePaginate);*/
var userModel = mongoose.model('User', userSchema);
module.exports=userModel;

