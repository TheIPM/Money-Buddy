const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]
    billReminders: [BillReminder]
    income: [Income]
    expenses: [Expense]
  }

  type Auth {
    token: ID!
    user: User
  }

type Income {
    amount: Float
    date: String
    description: String
  }
  type Expense {
    amount: Float
    date: String
    description: String
  }

  type Goal {
    _id: ID!
    user: ID!
    description: String!
    targetAmount: Float!
    targetDate: String!
  }

  type BillReminder {
    _id: ID!
    name: String!
    description: String
    amount: Float
    dueDate: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    userGoals(userId: ID!): [Goal]
    userBillReminders(userId: ID!): [BillReminder]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addIncome(amount: Float!, date: String, description: String): User
    addExpense(amount: Float!, date: String, description: String): User
    addGoal(description: String!, targetAmount: Float!, targetDate: String!): Goal 
    addBillReminder(name: String!, amount: Float!, dueDate: String!): BillReminder
    deleteGoal(goalId: ID!): Goal
    deleteBillReminder(billReminderId: ID!): BillReminder 
  }
`;

module.exports = typeDefs;