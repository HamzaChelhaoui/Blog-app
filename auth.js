//AUTH.JS


const fs = require('fs');

 function authenticateUser(accountID, pin) {
    const users = JSON.parse(fs.readFileSync("./users.json"));
    const user = users.find(u => u.accountID === accountID && u.pin === pin);
    return user;
    
    
}


module.exports = {authenticateUser};