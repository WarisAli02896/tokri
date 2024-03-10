exports.create_user_id = (user, reqData) => {
    if (user.length != 0) {
        let user_id = user[0].user_id.split('-');
        id = `${reqData.firstname.substring(0, 3)}-${reqData.lastname.substring(0, 3)}-${(parseInt(user_id[user_id.length - 1]) + 1).toString()}`;
        return id;
    } else if (user.length == 0) {
        id = `${reqData.firstname.substring(0, 3)}-${reqData.lastname.substring(0, 3)}-${(0).toString()}`;
        return id;
    }
}

exports.merge_objects = (obj1, obj2) => {
    for(const key in obj1){
        if(obj2.hasOwnProperty(key)){
            obj1[key] = obj2[key];
        }
    }
    return obj1;
}