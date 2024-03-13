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
    for (const key in obj1) {
        if (obj2.hasOwnProperty(key)) {
            if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
                // If both values are arrays, merge them
                obj1[key] = obj1[key].concat(obj2[key]);
            } else {
                // Otherwise, directly assign the value
                obj1[key] = obj2[key];
            }
        }
    }
    return obj1;
}


// exports.merge_objects_with_nested = (obj1, obj2) => {
//     for (const key in obj1) {
//         // Check if the key exists in obj2 and is an object
//         if (typeof obj1[key] === 'object' && obj2.hasOwnProperty(key) && typeof obj2[key] === 'object') {
//             // Recursively copy values from nested objects
//             copyValues(obj1[key], obj2[key]);
//         } else if (obj2.hasOwnProperty(key)) {
//             // Copy the value from obj1 to obj2
//             obj2[key] = obj1[key];
//         }
//     }

//     return obj2
// }