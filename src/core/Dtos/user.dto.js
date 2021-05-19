
module.exports.userTolist  = function ({name, lastName, email, id}) {
    
    let user = { 
        name: `${name} ${lastName}`,
        userName: email,
        id
    }
    
    return user
}