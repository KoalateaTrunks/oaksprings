/** 5/22/2018 */
//import req libraries

var config = require(__dirname + '/Resources/config.js');
var fs = require('fs');
//fs = file system
var net = require('net');
//net = gives access to creating servers, listening to events, etc
require ('./packet.js')
//load initialisers
var init_files = fs.readdirSync(__dirname + "/Initializer"); // code will not move on before this piece
init_files.forEach(function(initFile)
/**for every item in array call this func */ {
    console.log('Loading Initializer: ' + initFile);
    require(__dirname + "/Initializers/" + initFile);
});

//load models
var model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function(modelFile)
// for every item in array call this func
 {
    console.log('Loading Model: ' + modelFile);
    require(__dirname + "/Models/" + modelFile);
});

//load model_files maps
maps = {};
var map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function(mapFile)
{
    console.log('Loading Map: ' + mapFile);
    require(config.data_paths.maps + mapFile);
    var map = require(config.data_paths.maps + mapFile);
    maps[map.room] = map
});

net.createServer(function(socket) {

    console.log("socket connected");
    var c_inst = new require ('./client.js');
    var thisClient = new c_inst();

    thisClient.socket = socket;
    thisClient.initiate();

    socket.on('error', thisclient.error);

    socket.on('end', thisClient.end);

    socket.on('data', thisclient.data);

}).listen(config.port);

console.log("initialize completed, server running on port:" +config.port + " for environment: " + config.environment);
