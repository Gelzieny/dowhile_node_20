import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { CartegoryResolver } from "../src/graphql/category/CategoryResolver";
import CategorySchema from "../src/model/CategorySchema";

jest.mock("../src/model/CategorySchema");

describe("CategoryResolver", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    const schema = await buildSchema({
      resolvers: [CartegoryResolver],
    });
    server = new ApolloServer({ schema });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return all categories", async () => {
    const mockCategories = [
      { id: "1", name: "Drama", description: "Categoria de Drama" },
      { id: "2", name: "Comedy", description: "Categoria de Comedy" },
    ];

    (CategorySchema.find as jest.Mock).mockResolvedValue(mockCategories);

    const result = await server.executeOperation({
      query: `query {
        categories {
          id
          name
          description
        }
      }`,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.categories).toEqual(mockCategories);
  });

  it("should create a new category", async () => {
    const categoryInput = { name: "Drama", description: "Categoria de Drama" };
    const mockCategory = { id: "1", ...categoryInput };

    (CategorySchema.create as jest.Mock).mockResolvedValue(mockCategory);

    const result = await server.executeOperation({
      query: `mutation($categoryInput: CategoryInput!) {
        createCategory(categoryInput: $categoryInput) {
          id
          name
          description
        }
      }`,
      variables: { categoryInput },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.createCategory).toEqual(mockCategory);
  });
});
