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
      title
      description
      targetAmount
    }
  }
`;

export const QUERY_USER_BILL_REMINDERS = gql`
  query userBillReminders($userId: ID!) {
    userBillReminders(userId: $userId) {
      _id
      title
      description
      dueDate
      amount
    }
  }
`;
