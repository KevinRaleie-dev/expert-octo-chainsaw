import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class RegisterInput {

    @Field()
    email: string;

    @Field()
    firstName: string

    @Field()
    lastName: string;

    @Field()
    password: string;
}