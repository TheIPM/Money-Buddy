import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_GOAL = gql`
  mutation createGoal($description: String!, $targetAmount: Float!, $targetDate: String!) {
    addGoal(description: $description, targetAmount: $targetAmount, targetDate: $targetDate) {
      _id
      description
      targetAmount
      targetDate
    }
  }
`;

export const DELETE_GOAL = gql`
  mutation deleteGoal($goalId: ID!) {
    deleteGoal(goalId: $goalId) {
      _id
    }
  }
`;

export const CREATE_BILL_REMINDER = gql`
  mutation AddBillReminder($name: String!, $amount: Float!, $dueDate: String!) {
    addBillReminder(name: $name, amount: $amount, dueDate: $dueDate) {
      _id
      name
      amount
      dueDate
    }
  }
`;

export const DELETE_BILL_REMINDER = gql`
  mutation deleteBillReminder($billReminderId: ID!) {
    deleteBillReminder(billReminderId: $billReminderId) {
      _id
    }
  }
`;