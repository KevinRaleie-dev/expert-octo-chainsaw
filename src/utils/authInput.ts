import { Field, InputType } from 'type-graphql';

@InputType({ description: 'Authentication input for register and login' })
export class AuthInput {
  @Field()
  email: string;

  @Field()
  firstName?: string;

  @Field()
  lastName?: string;

  @Field()
  password: string;
}
