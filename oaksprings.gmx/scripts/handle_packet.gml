//argument 0: data buffer

var command = buffer_read(argument0, buffer_string);
show_debug_message("Networking Event: " + string(command))

switch(command){

    case "HELLO":
        server_time = buffer_read(argument0, buffer_string);
        room_goto_next();
        show_debug_message("Welcome @ " + server_time);
        break;
    case "LOGIN":
        status = buffer_read(argument0, buffer_string)
        if(status == "TRUE"){
            
            target_room = buffer_read(argument0, buffer_string);
            target_x = buffer_read(argument0, buffer_u16);            
            target_y = buffer_read(argument0, buffer_u16);
            name = buffer_read(argument0, buffer_string);            
            
            goto_room = asset_get_index(target_room);
            room_goto(goto_room);
            
            //initiate a plyr object on this room
            
                }else{
                    show_message("Login Failed: Username Doesn't Exist or Password Incorrect.")
                    }
        break;
        
    case "REGISTER":
        status = buffer_read(argument0, buffer_string)
        if(status == "TRUE"){
            show_message("Succesfully Registered: Please Login.")
                }else{
                    show_message("Register Failed: Username Taken.")
                    }
        break;
}
