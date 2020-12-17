import { User } from "../Entity/User";
import { Ctx, Query, Resolver } from "type-graphql";
import { AppContext } from "../types";

@Resolver()
export class MeResolver {

    @Query(() => User, {nullable: true})
    async me(
        @Ctx() { req }: AppContext
    ) {
        // check if the user is logged in
        if(!req.session.userId) {
            return null;
        }

        // if user is logged in display info
        const user = await User.findOne({ where: {
            id: req.session.userId
        }});

        return user;
    }
}