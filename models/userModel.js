const mongoose = require('mongoose');
const UsersSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:  [true, "Name is required"],
    },
    username: {
        type: String,
        required: true,
        unique: [true, "Username already in use"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Provide an email"],
        unique: true,
    }
})

const Users = mongoose.model('BudgetUsers', UsersSchema);
module.exports = Users;