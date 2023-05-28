const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]
    billReminders: [BillReminder]
  }

  type Auth {
    token: ID!
    user: User
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

    addGoal(description: String!, targetAmount: Float!, targetDate: String!): Goal 
    addBillReminder(name: String!, amount: Float!, dueDate: String!): BillReminder
    deleteGoal(goalId: ID!): Goal
    deleteBillReminder(billReminderId: ID!): BillReminder 
  }
`;

module.exports = typeDefs;