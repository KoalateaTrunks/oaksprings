var now = require('performance-now');
var _ = require('underscore');

module.exports = function(){
    //objects will be added at runtime (wont exist till then)
    //this.socket = {}
    //this.user = {}

    this.initiate = function(){
        console.log("client error" + err.toString());
    }

    this.data = function(data){
        console.log("client closed:");
    }
    this.error = function(err){
        console.log("client data" + data.toString());
    }
    this.end = function(){

    }


}