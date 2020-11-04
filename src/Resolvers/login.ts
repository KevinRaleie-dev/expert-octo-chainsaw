import { UserResponse } from "../errors/UserResponse";
import { User } from '../Entity/User';
import { Arg, Mutation, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { LoginInput } from '../utils/userInput';
import bcrypt from 'bcryptjs';

@Resolver()
export class LoginResolver {

    @Mutation(() => UserResponse)
    async loginUser(
        @Arg('input') input: LoginInput
    ): Promise<UserResponse> {
        
        const em = getManager();
        
        // check if the user input, both email and password
        // is the same as in the database...
        // if not, then throw errors

        const user = await em.findOne(User, { email: input.email });

        if(!user) {
            return {
                errors: [
                    {
                        field: 'email',
                        message: 'Invalid email or password'
                    }
                ]
            }
        }
        else if (user) {

            const validatePassword = bcrypt.compareSync(input.password, user.password);

            if(!validatePassword) {
                return {
                    errors: [
                        {
                            field: 'password',
                            message: 'Invalid email or password'
                        }
                    ]
                }
            }
        }

        // here we will issue a token if the user details are correct
        // for now return the user

        return {
            user
        }
    }
}