import { User } from '../entity/User';
import { Query, Resolver } from 'type-graphql';

@Resolver()
export class UserResolver {
  // TODO: add some pagination soon soon
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await User.find({});

    return users;
  }
}
