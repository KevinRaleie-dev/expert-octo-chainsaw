import { UserResponse } from "../errors/UserResponse";
import { User } from '../Entity/User';
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { LoginInput } from '../utils/userInput';
import bcrypt from 'bcryptjs';
import { AppContext } from "../types";

@Resolver()
export class LoginResolver {

    // TODO: return an access token 
    @Mutation(() => UserResponse)
    async loginUser(
        @Arg('input') input: LoginInput,
        @Ctx() { req }: AppContext
    ): Promise<UserResponse> {

        const user = await User.findOne({ where: {email: input.email }});

        if(!user) {
            return {
                errors: [
                    {
                        field: 'Email',
                        message: 'Invalid email or password'
                    }
                ]
            }
        }

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

        // TODO: create a session and store it in redis
        req.session.userId = user.id;
        
        return {
            user
        }
    }
}