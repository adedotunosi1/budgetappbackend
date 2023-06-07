const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
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

const userBudget = mongoose.model('budgets', budgetSchema);
module.exports = userBudget;