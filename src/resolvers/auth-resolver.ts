import { AuthResponse } from '../errors/auth-response';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import { AuthInput } from '../utils/authInput';
import { validate } from 'class-validator';
import { AppContext } from '../utils/types';

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthResponse)
  async registerUser(@Arg('input') input: AuthInput): Promise<AuthResponse> {
    const ifExists = await User.findOne({
      where: {
        email: input.email,
      },
    });

    if (ifExists) {
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

    const errors = await validate(user);

    if (errors.length > 0) {
      throw new Error('validation failed.');
    }

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
