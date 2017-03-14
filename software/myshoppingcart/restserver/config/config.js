/**
 * Created by SB004 on 2/28/2017.
 */
'use strict';

module.exports = function(){
    console.log(process.env.NODE_ENV);
    switch(process.env.NODE_ENV){
        case 'local':

            return {
                db:{

                    url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/myshoppingcart'
                }
            };

        case 'test':

            return {
                db:{
                    url: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/node-myshoppingcart-test'
                }
            };

        default:
            return {};
    }


};
