import { AuthResponse } from '../errors/auth-response';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import { AuthInput } from '../utils/authInput';
import { AppContext } from '../utils/types';
import { authSchema } from '../utils/validation/auth-validation-schema';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async registerUser(@Arg('input') input: AuthInput): Promise<AuthResponse> {
    try {
      await authSchema.validate({
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        password: input.password,
      });
    } catch (error) {
      if (
        error.message.includes('email') ||
        error.message.includes('password') ||
        error.message.includes('firstName') ||
        error.message.includes('lastName')
      ) {
        return {
          errors: [
            {
              field: error.path,
              message: error.message,
            },
          ],
        };
      }
    }

    const ifUserAlreadyExists = await User.findOne({
      where: {
        email: input.email,
      },
    });

    if (ifUserAlreadyExists) {
      return {
        errors: [
          {
            field: 'email',
            message: 'Account already exists. Try again.',
          },
        ],
      };
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(input.password, salt);

    const user = User.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: hashedPassword,
    });

    await User.save(user);

    return {
      user,
    };
  }

  @Mutation(() => AuthResponse)
  async loginUser(@Arg('input') input: AuthInput, @Ctx() { req }: AppContext): Promise<AuthResponse> {
    const user = await User.findOne({ where: { email: input.email } });

    if (!user) {
      return {
        errors: [
          {
            field: 'Email',
            message: 'Invalid email or password',
          },
        ],
      };
    }

    const validatePassword = bcrypt.compareSync(input.password, user.password);

    if (!validatePassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Invalid email or password',
          },
        ],
      };
    }

    // TODO: create a session and store it in redis
    req.session.userId = user.id;

    return {
      user,
    };
  }
}
