const express = require('express');
const budgetRouter = express.Router();
const budgetController = require('../controllers/budgetController');

budgetRouter.post("/register", budgetController.budget_signup);
budgetRouter.post("/login", budgetController.budget_login);
budgetRouter.post("/addbudget", budgetController.new_budget);
budgetRouter.post("/addexpenses", budgetController.newbudget_expenses);
budgetRouter.get("/user-budgets", budgetController.user_budgets);
budgetRouter.get("/last-user-budget", budgetController.lastuser_budget);


module.exports = budgetRouter;