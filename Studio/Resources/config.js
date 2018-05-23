/** 5/22/2018 */
//import lie berries
var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');

//store enviro variable
var environment = args.env || "test";

//common config 
var common_conf = {
    name: "oak springs",
    version: "0.0.1",
    environment: environment,
    max_player: 100,
    data_paths: {
        items: __dirname + "\\Game Data\\" + "Items\\",
        maps: __dirname + "\\Game Data\\" + "Maps\\"
    },
    starting_zone: "rm_map_home"
};

/** --env="production" --ip=127.0.0.1 */
//enviro specific config
var conf = {
    production: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8081,
        database: "mongodb://127.0.0.1/oaksprings_prod"
    },
    test: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8082,
        database: "mongodb://127.0.0.1/oaksprings_test"
    },
}

extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

module.exports = config = conf[environment];

