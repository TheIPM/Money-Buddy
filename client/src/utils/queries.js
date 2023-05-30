import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      income {
        _id
        amount
        date
        description
      }
      expenses {
        _id
        amount
        date
        description
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      income {
        amount
        date
        description
      }
      expenses {
        amount
        date
        description
      }
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