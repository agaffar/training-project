/**
 * Created by SB004 on 2/28/2017.
 */
/**
 * Created by SB004 on 2/28/2017.
 */
var mongoose = require('mongoose');
require('mongoose-double')(mongoose)
//var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;
var CommentSchema = new Schema({
       /* productId:{
            type:Schema.Types.ObjectId,
            trim:true,
            required: true,
            ref : 'products'
        },*/
        username:{
            type:String,
            trim:true,
            required: true
        },
        rating:{

            type:Schema.Types.Double,
            trim:true,
            required: true
        },
        text:{
            type:String,
            required: true
        },
        commentedOn:{
            type:Date
        }
    },
    {collection:'comments'}
);
/*CommentSchema.plugin(mongoosePaginate);*/
var CommentModel = mongoose.model('Comment', CommentSchema);
module.exports=CommentModel;

