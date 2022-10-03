import chai, { expect } from "chai";
import app from "infrastructure/app";
import sinon, { SinonFakeTimers } from "sinon";
import { loginUser } from "__tests__/helpers";
import { REFRESH_TOKEN_EXPIRY_TIME } from "__tests__/testEnvVars";
import { UserEntity } from "../entities";
import { User } from "../models";

const user1 = {
  firstName: "some",
  lastName: "random",
  email: "user1@test.com",
  password: "1234567",
  role: "customer" as const,
};

const user2 = {
  firstName: "some",
  lastName: "random",
  email: "user2@test.com",
  password: "1234567",
  role: "customer" as const,
};

let clock: SinonFakeTimers;
const hashUserPass = (user: UserEntity) => ({
  ...user,
  password: User.generateHash(user.password),
});

describe("Refresh Token Tests", () => {
  before(async () => {
    await User.destroy({ where: {} });
    await User.bulkCreate([hashUserPass(user1), hashUserPass(user2)]);
  });

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(function () {
    clock.restore();
  });

  after(async () => {
    await User.destroy({ where: {} });
  });
  it("should return a new access token when refresh and access tokens are valid", async () => {
    const { accessToken, refreshToken } = await loginUser(
      user1.email,
      user1.password
    );

    const response = await chai
      .request(app)
      .post("/api/auth/refresh-token")
      .send({
        accessToken,
        refreshToken,
      });

    response.status.should.be.eql(201);
    const newAccessToken = response.body.accessToken;

    expect(newAccessToken).to.be.a.string;
  });

  it("should fail when accessToken  doesn't belong to the user", async () => {
    const { accessToken } = await loginUser(user1.email, user1.password);
    const { refreshToken } = await loginUser(user2.email, user2.password);

    const response = await chai
      .request(app)
      .post("/api/auth/refresh-token")
      .send({
        accessToken,
        refreshToken,
      });

    response.status.should.be.eql(400);
    response.body.should.eql({ message: "Invalid tokens" });
  });

  it("should fail when refresh token has expired", async () => {
    const { accessToken } = await loginUser(user1.email, user1.password);
    const { refreshToken } = await loginUser(user2.email, user2.password);

    clock.tick(REFRESH_TOKEN_EXPIRY_TIME * 1000 + 1);

    const response = await chai
      .request(app)
      .post("/api/auth/refresh-token")
      .send({
        accessToken,
        refreshToken,
      });

    response.status.should.be.eql(403);
    response.body.should.eql({
      message: "Expired session. Please login again",
    });
  });
});
