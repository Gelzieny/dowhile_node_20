import "reflect-metadata";
import "./utils/conections";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { CartegoryResolver } from "./graphql/category/CategoryResolver";
import { VideoResolver } from "./graphql/videos/VideosResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [CartegoryResolver, VideoResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  server.listen({ port: 4100 }, () => console.log("Running"));
}

bootstrap();
