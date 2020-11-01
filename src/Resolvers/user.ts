import { User } from "../Entity/User";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";
import { UserResponse } from '../errors/UserResponse';
import bcrypt from 'bcryptjs';

@Resolver()
export class UserResolver {
  
  @Query(() => [User])
  users(): Promise<User[]> {

    const em = getManager();
    
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  user(
    @Arg("id", () => Int) id: number
  ): Promise<User | undefined> {
    const em = getManager();
    return em.findOne(User, { id });
  }

  @Mutation(() => UserResponse)
  async createUser(
      @Arg('email', () => String) email: string,
      @Arg('username', () => String) username: string,
      @Arg('password', () => String) password: string
  ): Promise<UserResponse>{
      const em = getManager();

    // TODO: remember to add validation with yup

    //  first check if that user exists in the database

    const checkIfUserExists = await em.findOne(User, { email });

    // if they do throw an error 

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
    

    // if they dont continue to hash the user's password 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = em.create(User, {email, username, password: hashedPassword});
      
    // once thats done, save the user in the database
    await em.save(user);

    // once thats done return the user
    return {
      user
    } 

  }
}
