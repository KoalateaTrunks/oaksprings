var now = require('performance-now');
var _ = require('underscore');

module.exports = function(){
    //objects will be added at runtime (wont exist till then)
    //this.socket = {}
    //this.user = {}
    var client = this;


    //initialise
    this.initiate = function(){


        //send connection handshake packet to client
        client.socket.write(packet.build(["HELLO", now().toString()]))

        console.log('client initiated')
        }
    };
    //client methods
    this.enterrom = function(selected_room){

        maps[selected_room].clients.forEach(function(otherClient){
            otherClient.socket.write(packet.build(["ENTER", client.user.username, client.user.pos_x, client.user.pos_y]))

        maps[selected_room].clients.push(client);
        })

    }


    //socket stuff
    this.data = function(data){
        console.log("client data" + data.toString());
        packet.parse(client, data);
     };
     this.error = function(err){
     console.log("client error" + err.toString());
     };
     this.end = function(){
      console.log("client closed:");
     };




