import { User } from "../Entity/User";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";

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

  @Mutation(() => User)
  async createUser(
      @Arg('email', () => String) email: String,
      @Arg('username', () => String) username: String,
      @Arg('password', () => String) password: String
  ): Promise<User>{
      const em = getManager();

      const user = em.create(User, { email, username, password});

      await em.save(user);

      return user;

  }
}
