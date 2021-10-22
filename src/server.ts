import { ApolloServer, gql } from "apollo-server";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { users, createUser, updateUser, deleteUser } from "./resolvers/user";
import {
  posts,
  createPost,
  updatePost,
  deletePost,
  createComment,
} from "./resolvers/post";

(async () => {
  const typeDefs: any = await loadSchema("./src/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });

  const resolvers = {
    Query: {
      users,
      posts,
    },
    Mutation: {
      createUser(_: any, payload: any) {
        return createUser(payload);
      },
      updateUser(_: any, payload: any) {
        return updateUser(payload);
      },
      deleteUser(_: any, input: any) {
        return deleteUser(input);
      },
      createPost(_: any, payload: any) {
        return createPost(payload);
      },
      updatePost(_: any, payload: any) {
        return updatePost(payload);
      },
      deletePost(_: any, input: any) {
        return deletePost(input);
      },
      createComment(_: any, payload: any) {
        return createComment(payload);
      },
      updateComment(_: any, payload: any) {
        return updatePost(payload);
      },
      deleteComment(_: any, input: any) {
        return deletePost(input);
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
})();
