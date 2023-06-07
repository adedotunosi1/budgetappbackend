const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: [true, "budget already exists"]
    },
    amount: {
        type: Number,
    },
    userid: {
        type: String,
        required: true,
      },
      createdAt: {
        type: String,
      }
})

const userExpense = mongoose.model('expenses', expenseSchema);
module.exports = userExpense;