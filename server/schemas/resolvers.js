const { AuthenticationError } = require('apollo-server-express');
const { User, FinanceData, Goal, BillReminder } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('financeData');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('financeData');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('financeData');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    userFinanceData: async (parent, { userId }) => {
      return FinanceData.find({ user: userId });
    },
    userGoals: async (parent, { userId }) => {
      return Goal.find({ user: userId });
    },
    userBillReminders: async (parent, { userId }) => {
      return BillReminder.find({ user: userId });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addFinanceData: async (parent, { userId, month, year, expenses, income, investments }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new AuthenticationError('No user found with this id');
      }
      const financeData = await FinanceData.create({ user: userId, month: month, year: year, expenses: expenses, income: income, investments: investments });
      user.financeData.push(financeData);
      await user.save();
      return financeData;
    },
    updateFinanceData: async (parent, { _id, expenses, income, investments }) => {
      const updatedFinanceData = await FinanceData.findByIdAndUpdate(_id, { expenses, income, investments }, { new: true });
      return updatedFinanceData;
    },
    addGoal: async (parent, { description, targetAmount, targetDate }, context) => {
      const user = await User.findById(context.user._id);
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a goal');
      }
      // Include targetDate when creating a new goal
      const goal = await Goal.create({ user: user._id, description, targetAmount, targetDate });
      console.log(JSON.stringify(user, null, 2));
      user.goals.push(goal);
      await user.save();
      return goal;
    },
    addBillReminder: async (parent, { name, description, amount, dueDate }, context) => {
      const user = await User.findById(context.user._id);
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a bill reminder');
      }
    
      const billReminder = await BillReminder.create({ user: user._id, name, description, amount, dueDate });
    
      user.billReminders.push(billReminder);
      await user.save();
    
      return billReminder;
    },
    deleteGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await Goal.findById(goalId);
    
        // Check if goal exists
        if (!goal) {
          throw new Error('No goal found with this id');
        }
    
        // Check if logged-in user is the owner of the goal
        if (goal.user.toString() !== context.user._id) {
          throw new AuthenticationError('Action not allowed');
        }
    
        await Goal.findByIdAndDelete(goalId);
        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  User: {
    financeData: async (parent, { month, year }) => {
      return FinanceData.findOne({ user: parent._id, month: month, year: year });
    },
    goals: async (parent, args, context) => {
      return Goal.find({ user: parent._id });
    },
    billReminders: async (parent, args, context) => {
      return BillReminder.find({ user: parent._id });
    }
  }
};

module.exports = resolvers;