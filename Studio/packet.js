
var zeroBuffer = new Buffer('00', 'hex');

module.exports = packet = {

    //params: array of js objects to become buffers
    build: function(params){

        var packetParts = [];
        var packetSize = 0;

        params.forEach(function(param){
            var buffer;

            if(typeof param === 'string'){
                //do this
                    buffer = new Buffer(param, 'utf8');
                    buffer = Buffer.concat([buffer, zeroBuffer], buffer.length + 1)
//bc this is a security issue we can change new Buffer, and use Buffer.from(param, 'utf8') instead later
            }
            else if (typeof param === 'number'){
                buffer = new Buffer(2);
                buffer.writeUInt16LE(param, 0);

            }
            else {
                console.log('WARNING: Unknown data type in packet builder!');
            }

            packetSize +=buffer.length;
            packetParts.push(buffer);
        })

        var dataBuffer = Buffer.concat(packetParts, packetSize);

        //SIZE -> DATA if the packets r jumbled then seperate packets unstuck together

        var size = new Buffer(1);
        size.writeUInt8(dataBuffer.length + 1, 0);

        var finalPacket = Buffer.concat([size, dataBuffer], size.length + dataBuffer.length)

        return finalPacket;
    },
//parse packet to be handled for client
    parse: function(c, data){
        
        var idx = 0;

        while( ix < data.length ){

            var_packetSize - data.readUInt8(idx);
            var extractedPacket = new Buffer(packetSize);
            data.copy(extractedPacket, 0, idx, idx + packetSize)
            //im spo sleeby 

            this.interpret(c, extractedPacket);

            idx += packetSize; 

        }
    },

    interpret: function(c, datapacket){
        var header = PacketModels.header.parse(datapacket);
        console.log("Interpret: " + header.command);

        switch (header.command.toUpperCase()){

            case "LOGIN":
                var data = PacketModels.login.parse(datapacket);
                User.login(data.username, data.password, function(result, user){
                    if(result){
                        c.user = user;
                        c.enterroom(c.user.current_room);
                        c.socket.write(packet.build(["LOGIN", "TRUE", c.user.current_room, c.user.pos_x, c.user.pos_y, c.user.username]))
                    }else{
                        c.socket.write(packet.build(["LOGIN", "FALSE"]))
                    }
                })
            break;

            case "REGISTER":
                var data = PacketModels.register.parse(data);
                User.register(data.username, data.password, function(result, user){
                    if(result){
                        c.socket.write(packet.build(["REGISTER", "TRUE"]))
                    }else{
                        c.socket.write(packet.build(["REGISTER", "FALSE"]))
                    }
                })

            break;

        }
    }

}