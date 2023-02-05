import supertest from "supertest";
import createServer from "../utils/server";
import { PrismaClient } from "@prisma/client";
import { addUser } from "../services/userServices/addUser";
import { addBlog } from "../services/blogServices/addBlog";
import { getToken } from "../services/userServices/getToken";
const app = createServer();

const userPayload = {
  name: "john doe",
  email: "johndoe@test.com",
};
const blogPayload = {
  name: "john doe",
  email: "johndoe@test.com",
  title: "test title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
};
const prisma = new PrismaClient();
describe("blog", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });
  afterAll(async () => {
    await prisma.$disconnect();
  });
  describe("get blogs", () => {
    describe("blogs does not exist", () => {
      it("should return 404", async () => {
        const { body, statusCode } = await supertest(app).get(`/api/blog`);
        expect(statusCode).toBe(404);
        expect(body.success).toBe(true);
        expect(body.message).toBe("no blogs found");
      });
    });
    describe("blogs exist", () => {
      it("should return 200 status and blogs", async () => {
        const user = await addUser(userPayload);
        const blog = await addBlog(blogPayload);
        const { body, statusCode } = await supertest(app).get(`/api/blog`);
        expect(statusCode).toBe(200);
        expect(user.id).toBe(body.createdBy);
      });
    });
  });
  describe("add blog", () => {
    describe("user not logged in", () => {
      it("should return 401 status code and error message", async () => {
        const { body, statusCode } = await supertest(app)
          .post("/api/blog")
          .send(blogPayload);
        expect(statusCode).toBe(401);
      });
    });
    describe("user logged in", () => {
      it("should return 201 status code and blog info", async () => {
        const token = getToken(userPayload);
        const { body, statusCode } = await supertest(app)
          .post("/api/blog")
          .set("Authorization", `Bearer ${token}`)
          .send(blogPayload);
        expect(statusCode).toBe(201);
      });
    });
  });
  describe("edit blog", () => {
    describe("user not logged in", () => {
      it("should return 401 status code and error message", async () => {
        const blog=await addBlog(blogPayload);
        const { body, statusCode } = await supertest(app)
          .put(`/api/blog/${blog.id}`)
          .send(blogPayload);
        expect(statusCode).toBe(401);
      });
    });
    describe("user logged in", () => {
      it("should return 201 status code and blog info", async () => {
        const token = getToken(userPayload);
        const blog=await addBlog(blogPayload);
        blogPayload.title="edited title";
        blogPayload.description="edited description";
        const { body, statusCode } = await supertest(app)
          .put(`/api/blog/${blog.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send(blogPayload);
        expect(statusCode).toBe(201);
      });
    });
  });
  describe("delete blog", () => {
    describe("user not logged in", () => {
      it("should return 401 status code and error message", async () => {
        const blog=await addBlog(blogPayload);
        const { body, statusCode } = await supertest(app)
          .delete(`/api/blog/${blog.id}`)
        expect(statusCode).toBe(401);
      });
    });
    describe("user logged in", () => {
      it("should return 201 status code and blog info", async () => {
        const token = getToken(userPayload);
        const blog=await addBlog(blogPayload);
        const { body, statusCode } = await supertest(app)
          .delete(`/api/blog/${blog.id}`)
          .set("Authorization", `Bearer ${token}`)
          .send(blogPayload);
        expect(statusCode).toBe(201);
      });
    });
  });
});
