import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Video } from "./Videos";
import VideoSchema from "../../model/VideoSchema";

@InputType()
class VideosInput {
  @Field()
  description: string;

  @Field()
  name: string;

  @Field()
  category: string;
}

@Resolver(Video)
export class VideoResolver {
  @Query(() => [Video])
  async videos() {
    const videos = await VideoSchema.find();
    return videos;
  }

  @Mutation(() => Video)
  async createVideos(@Arg("videoInput") videoInput: VideosInput) {
    const videos = await VideoSchema.create(videoInput);

    return videos;
  }
}
