
let users = [];

function addUsers(id, socketid) {
    if(users.filter(user=> user.user_id  == id).length == 0 && id !== null) {
        users.push(
            {
                'user_id': id,
                'socket_id': socketid
            }
        );
    }

    return users;
}

const getUsers = ()=> {
    return users;
}


const removeUsers = (socketid) => {
    users = users.filter(user=> user.socket_id !== socketid);
    return users
}


module.exports = {addUsers, getUsers, removeUsers};