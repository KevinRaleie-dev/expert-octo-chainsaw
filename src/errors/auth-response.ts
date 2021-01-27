import { User } from '../entity/User';
import { Field, ObjectType } from 'type-graphql';
import { FieldError } from '../utils/fieldError';

@ObjectType({ description: 'Authentication response on auth resolver' })
export class AuthResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
