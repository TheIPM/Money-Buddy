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

export const CREATE_BILL_REMINDER = gql`
  mutation createBillReminder($userId: ID!, $title: String!, $description: String!, $dueDate: String!, $amount: Float!) {
    addBillReminder(userId: $userId, title: $title, description: $description, dueDate: $dueDate, amount: $amount) {
      _id
      title
      description
      dueDate
      amount
    }
  }
`;