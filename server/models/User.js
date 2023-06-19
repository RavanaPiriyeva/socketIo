const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    socketId: {
        type: String,
        default: ""
      }
})
const User = new mongoose.model('User', userSchema);


module.exports = {
    User
}
