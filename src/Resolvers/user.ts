import { User } from "../Entity/User";
import { Arg, Int, Query, Resolver } from "type-graphql";
import { getManager } from "typeorm";

@Resolver()
export class UserResolver {

  // TODO: add some pagination soon soon
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

  
}
