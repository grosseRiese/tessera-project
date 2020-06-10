const bcrypt = require('bcrypt');
const saltRound = 10;

module.exports = {
// hash user password
    async hashPassword(passwordToHash){
      return await bcrypt.hash(passwordToHash, saltRound);
    },

    async matchPassword(userPassword, hash){ 
        const match = await bcrypt.compare(userPassword, hash);
      return match;
    },
    async genereteTicket(){
        const ticketNum = Math.random().toString(36).substring(5).toUpperCase();
      return ticketNum;
    }
}