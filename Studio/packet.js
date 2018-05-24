
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
    }

}