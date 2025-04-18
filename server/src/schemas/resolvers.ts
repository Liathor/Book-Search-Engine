import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';

interface UserArgs {
    username: string;
  }

interface CreateUserArgs {
    input:{
      username: string;
      email: string;
      password: string;
    }
  }

interface LoginUserArgs {
    email: string;
    password: string;
}
  
interface SaveBookArgs {
    bookId: number,
}

interface DeleteBookArgs {
    bookId: number,
}

const resolvers = {
    Query: {
        user: async (_parent: any, { username }: UserArgs) => {
            return User.findOne({ username });
        }, 
        me: async (_parent: any, _args: unknown, context: any) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('thoughts');
            }
            throw new AuthenticationError('Could not authenticate user.');
        },       
    },

    Mutation: {
        createUser: async (_parent: any, { input }: CreateUserArgs) => {
            const user = await User.create({ ...input });
          
            const token = signToken(user.username, user.email, user._id);
          
            return { token, user };
        },

        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Could not authenticate user.');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Could not authenticate user.');
            }
      
            const token = signToken(user.username, user.email, user._id);
      
            return { token, user };
          },

        saveBook: async (_parent: any, { bookId }: SaveBookArgs, context: any) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { savedBooks: bookId }, }, },
                    { new: true, runValidators: true, }
                );
            }
            throw AuthenticationError;
        },
        deleteBook: async (_parent: any, { bookId }: DeleteBookArgs, context: any) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { savedBooks: bookId }, }, },
                    { new: true, }
                );
            }
            throw AuthenticationError;
        },
    },
};

export default resolvers;