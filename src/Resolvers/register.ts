import { UserResponse } from "../errors/UserResponse";
import { Arg, Mutation, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { User } from "../Entity/User";
import bcrypt from 'bcryptjs'
import { RegisterInput } from "../utils/userInput";

@Resolver()
export class RegisterResolver {

    @Mutation(() => UserResponse)
    async registerUser(
       @Arg('input') input: RegisterInput
    ): Promise<UserResponse> {
        
        const em = getManager();

        // TODO: remember to add validation with yup or joi

        // check if user exists in the database

        const checkIfUserExists = await em.findOne(User, { email: input.email });

        // if there is a user that exists throw an error

        if(checkIfUserExists) {
            return {
                errors: [
                    {
                        field: 'email',
                        message: 'user already exists'
                    }
                ]
            }
        }

        // if there isnt a user continue to register
        // and hash the user's password

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(input.password, salt);

        const user = em.create(User, { email: input.email, username: input.username, password: hashedPassword });

        await em.save(user);

        return {
            user
        }
    }
}