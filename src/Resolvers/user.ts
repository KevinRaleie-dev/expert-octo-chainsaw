import { User } from '../Entity/User';
import { Arg, ID, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';

@Resolver()
export class UserResolver {
  // TODO: add some pagination soon soon
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = await User.find({});

    return users;
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('id', () => Int) id: number): Promise<User | undefined> {
    const user = await User.findOne({ id });

    return user;
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => ID) id: number) {
    const user = await User.findOne({ id });

    if (!user) {
      return false;
    } else {
      await getConnection().createQueryBuilder().delete().from(User).where('id = :id', { id }).execute();

      return true;
    }
  }
}
