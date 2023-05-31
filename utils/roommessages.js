const messages = [];

const sendMessage = (id, userid, message, type, roomid)=> {
    const data = {
        'id' : id,
        'user_id': userid,
        'message': message,
        'type': type,
        'room_id': roomid
    }

    messages.push(data);

    return messages;
}

const getMessages = ()=> {
    return messages;
}


module.exports = {sendMessage, getMessages};

