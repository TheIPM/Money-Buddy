const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    financeData: [FinanceData]
    goals: [Goal]
    billReminders: [BillReminder]
  }

  type Auth {
    token: ID!
    user: User
  }

  type FinanceData {
    _id: ID!
    user: ID!
    month: String!
    year: String!
    expenses: Float!
    income: Float!
    investments: Float!
  }

  type Goal {
    _id: ID!
    user: ID!
    title: String!
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
    userFinanceData(userId: ID!): [FinanceData]
    userGoals: [Goal]
    userBillReminders: [BillReminder]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFinanceData(userId: ID!, month: String!, year: String!, expenses: Float!, income: Float!, investments: Float!): FinanceData
    updateFinanceData(_id: ID!, expenses: Float!, income: Float!, investments: Float!): FinanceData
    addGoal(description: String!, targetAmount: Float!, targetDate: String!): Goal 
    addBillReminder(name: String!, amount: Float!, dueDate: String!): BillReminder
    deleteGoal(goalId: ID!): Goal
  }
`;

module.exports = typeDefs;