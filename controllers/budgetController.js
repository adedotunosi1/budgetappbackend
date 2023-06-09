const BudgetUsers = require("../models/userModel");
const UserBudgets = require("../models/budgetModel");
const userExpenses = require("../models/expensesModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userBudget = require("../models/budgetModel");
const userExpense = require("../models/expensesModel");
const JWT_SECRET = "iubdfunvuiyd87368792y3rgybnia";

const budget_signup = async (req, res) => {
    const {fullname, username, password, email} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(req.body); 
    try {
      const oldUser = await BudgetUsers.findOne({ username });
      if(oldUser){
        return res.json({error: "Username is taken"});
      } 
      await BudgetUsers.create({
        fullname,
        username,
        password: encryptedPassword,
        email,
      });
      res.send({status: "ok"})
    } catch (error) {
      console.log(error)
    }
}

const budget_login = async (req, res, next) => {
    const {username, password} = req.body;
  
    const user = await BudgetUsers.findOne({ username});
    if(!user){ 
      return res.json({error: "User does not exist"});
    }
    if ( await bcrypt.compare(password, user.password)){
      const token = jwt.sign({username: user.username}, JWT_SECRET);
      if(res.status(201)){
        return res.json({status: "ok", data: token});
      } else {
        return res.json({error: "error"});
      }
    }
    res.json({status: "error", error: "Invalid Password"});
}

const new_budget = async (req, res, next) => {
    const {name, amount, userid, createdAt} = req.body;
    console.log(req.body)
    const user = await BudgetUsers.findOne({ userid });
    console.log(user);
    try {
      const oldBudget = await userBudget.findOne({ name });
      if(oldBudget){
        throw new Error("there is a budget with that name");
      } 
      await userBudget.create({
        name,
        amount,
        userid,
        createdAt,
      }); 
      res.send({status: "ok"})
    } catch (error) {
      console.log(error)
    }
}

const newbudget_expenses = async (req, res, next) => {
    const {name, amount, userid, createdAt, budgetid} = req.body;
    const user = await BudgetUsers.findOne({ userid });
    
    try {
      const oldBudget = await userExpenses.findOne({ name });
      if(oldBudget){
        throw new Error("That expense already exists");
      } 
      await userExpenses.create({
        name,
        amount,
        userid,
        createdAt,
        budgetid,
      }); 
      res.send({status: "ok"})
    } catch (error) {
      console.log(error)
    }
}

const user_budgets = async (req, res, next) => {
    const {id} = req.params;
    console.log(id);
    try {
      const budgets = await UserBudgets.find({}); 
      console.log(budgets);
      const lastbudget = await UserBudgets.findOne().sort({createdAt: -1});
      console.log('This is the last budget created below')
      console.log(lastbudget);
      if(!budgets){
        return res.status(404).json({
          success: false,
          message: "No budget found"
        })
      } else{
        res.send({ status: "ok", budget: budgets})
      }
    } catch (error) {
      console.log(error)
    }
}

const lastuser_budget = async (req, res, next) => {
    const userId = req.userId;
    console.log('lastuser', userId);
    try {
      const lastbudget = await UserBudgets.findOne().sort({createdAt: -1});
      console.log('This is the last budget created below')
      console.log(lastbudget);
      if(!lastbudget){
        return res.status(404).json({
          success: false,
          message: "No last budget found"
        })
      } else{
        res.send({ budget: lastbudget})
      }
    } catch (error) {
      console.log(error)
    }
}

module.exports = {
    budget_signup,
    budget_login,
    new_budget,
    newbudget_expenses,
    user_budgets,
    lastuser_budget,

}