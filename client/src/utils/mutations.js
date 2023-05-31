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

export const ADD_INCOME = gql`
  mutation addIncome($amount: Float!, $date: String!, $description: String!) {
    addIncome(amount: $amount, date: $date, description: $description) {
      income {
        
        amount
        date
        description
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation addExpense($amount: Float!, $date: String!, $description: String!) {
    addExpense(amount: $amount, date: $date, description: $description) {
      expenses {
        
        amount
        date
        description
      }
    }
  }
`;

export const RESET_INCOME = gql`
  mutation resetIncome {
    resetIncome {
      income {
        amount
        date
        description
      }
    }
  }
`;

export const RESET_EXPENSE = gql`
  mutation resetExpense {
    resetExpense {
      expenses {
        amount
        date
        description
      }
    }
  }
`;

export const DELETE_INCOME = gql`
  mutation deleteIncome($incomeId: ID!) {
    deleteIncome(incomeId: $incomeId) {
      income {
        _id
        amount
        date
        description
      }
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($expenseId: ID!) {
    deleteExpense(expenseId: $expenseId) {
      expenses {
        _id
        amount
        date
        description
      }
    }
  }
`;