import chai, { expect } from "chai";
import app from "infrastructure/app";
import { User } from "../models";

const registerRequest = {
  firstName: "some",
  lastName: "random",
  email: "random@test.com",
  password: "1234567",
};

describe("Register User Integration Test", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });
  it("should throw an error when user exists", async () => {
    const registerRequest = {
      firstName: "some",
      lastName: "random",
      email: "random@test.com",
      password: "1234567",
    };
    await User.create(registerRequest);
    const response = await chai
      .request(app)
      .post("/api/auth/register")
      .send(registerRequest);

    expect(response.status).to.be.eql(409);
    expect(response.body.message).to.equal(
      "User with email random@test.com exists"
    );
  });
  it("should successfully add user to the database", async () => {
    const response = await chai
      .request(app)
      .post("/api/auth/register")
      .send(registerRequest);

    const dbUser = await User.findOne({
      where: { email: registerRequest.email },
    });

    expect(response.status).to.be.eql(200);
    expect(response.body.message).to.equal("Registered successfully");
    expect(dbUser).to.not.be.null;
  });
  it("should hash user password", async () => {
    await chai.request(app).post("/api/auth/register").send(registerRequest);

    const dbUser = (await User.scope("withPassword").findOne({
      where: { email: registerRequest.email },
    })) as User;

    expect(dbUser.password).to.not.eql("1234567");
  });
  it("should throw an error if input validation fails", async () => {
    const registerRequest = {
      firstName: "some",
      password: "1234567",
    };
    const response = await chai
      .request(app)
      .post("/api/auth/register")
      .send(registerRequest);

    expect(response.status).to.be.eql(400);
  });
});
