var Parser = require('binary-parser').Parser
//gm strings are terminated by 0
var StringOptions = {length: 99, zeroTerminated:true};

module.exports = PacketModels = { 

        header: new Parser().skip(1)
            .string("command", StringOptions),

    login: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions),

    register: new Parser().skip(1)
        .string("command", StringOptions)
        .string("username", StringOptions)
        .string("password", StringOptions)
}