import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Category {
  @Field()
  name: String;

  @Field()
  description: String;

  @Field()
  _id: String;
}
