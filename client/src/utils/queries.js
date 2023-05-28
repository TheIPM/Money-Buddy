import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER_GOALS = gql`
  query userGoals($userId: ID!) {
    userGoals(userId: $userId) {
      _id
      description
      targetAmount
      targetDate
    }
  }
`;

export const QUERY_USER_BILL_REMINDERS = gql`
  query userBillReminders($userId: ID!) {
    userBillReminders(userId: $userId) {
      _id
      name
      description
      dueDate
      amount
    }
  }
`;