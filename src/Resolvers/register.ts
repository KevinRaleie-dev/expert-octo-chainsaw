import { UserResponse } from '../errors/UserResponse';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../Entity/User';
import bcrypt from 'bcryptjs';
import { RegisterInput } from '../utils/userInput';
import { validate } from 'class-validator';

@Resolver()
export class RegisterResolver {
  @Mutation(() => UserResponse)
  async registerUser(@Arg('input') input: RegisterInput): Promise<UserResponse> {
    const ifExists = await User.findOne({
      where: {
        email: input.email,
      },
    });

    if (ifExists) {
      return {
        errors: [
          {
            field: 'Email',
            message: 'User already exists. Try again.',
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
}
