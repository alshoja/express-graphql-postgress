import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
    @Mutation(() => Boolean)
    async createUser(
        @Arg("firstName") firstName: string,
        @Arg("lastName") lastName: string,
        @Arg("age") age: number) {
        await User.insert({ firstName, lastName, age });
        return true;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

}