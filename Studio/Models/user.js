var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: String,

    sprite: String,

    current_room: String,
    pos_x: {type: Number, default:0},
    pox_y: {type:Number, default:0}    


});

userSchema.statics.register = function(username, password, cb){

        var new_user = new User({
            username: username,
            password: password,

            sprite: "spr_Player",

            current_room: maps[config,starting_zone].room,
            pos_x: maps[config.starting_zone].start_x,
            pos_y: maps[config.starting_zone].start_y,
        });

        new_user.save(function(err){
            if(err){
                console.log('Err', err);
                cb(false);
            return;
            }
                cb(true);
        });
};

userSchema.statics.login = function(username, password, cb){

    User.findOne({username: username}, function(err, user){

        if(!err && user){
            if(user.password == password){
                cb(true, user);
            }else{
                cb(false,null);
            }
        }else{
            //error || user doesn't exist
        }
    })

};

module.exports = User = gamedb.model('User', userSchema);
