import { expect } from "chai";
import { UserNotFound } from "domains/auth/errors";
import { InvalidInputData } from "shared/errors";
import {
  mockAuthRepo,
  mockSessionManager,
} from "domains/auth/__tests__/unitStubs";
import { parameterized } from "__tests__/utils";
import { LoginUsecase } from "../loginUsecase";

const mockUser = {
  email: "email@email.com",
  firstName: "john",
  lastName: "dough",
  password: "some-jiberish",
  id: "my-id",
};

const mockSession = {
  id: "session-id",
  email: "email@email.com",
  userId: "some-user-id",
};

const testSuccessfulLogin = async (
  inputEmail: string,
  expectedEmailSearch: string,
  inputPassword: string
) => {
  mockAuthRepo.getUserWithCredentials.returns(Promise.resolve(mockUser));
  mockSessionManager.createSession.returns(Promise.resolve(mockSession));
  mockSessionManager.generateTokens.returns({
    accessToken: "some-random-access-token",
    refreshToken: "some-random-refresh-token",
  });

  const usecase = new LoginUsecase(mockAuthRepo, mockSessionManager);

  const output = await usecase.execute(inputEmail, inputPassword);

  mockAuthRepo.getUserWithCredentials.should.have.been.calledOnceWith(
    expectedEmailSearch,
    inputPassword
  );

  return output;
};

const assertFailureWithError = async (
  email: string,
  password: string,
  ErrorToCheck: any
) => {
  try {
    const usecase = new LoginUsecase(mockAuthRepo, mockSessionManager);
    await usecase.execute(email, password);
    expect(true).to.be.false;
  } catch (error) {
    expect(error).to.be.instanceof(ErrorToCheck);
  }
};

describe("LoginUsecase", () => {
  beforeEach(async () => {
    mockAuthRepo.getUserWithCredentials.reset();
  });
  it("should raise error when the credentials is invalid", async () => {
    mockAuthRepo.getUserWithCredentials.returns(
      Promise.reject(new UserNotFound())
    );

    assertFailureWithError("email@email.com", "some-password", UserNotFound);
    mockAuthRepo.getUserWithCredentials.should.have.been.calledOnceWith(
      "email@email.com",
      "some-password"
    );
  });

  it("should generate tokens for user when user is valid", async () => {
    const { data, accessToken, refreshToken } = await testSuccessfulLogin(
      "email@email.com",
      "email@email.com",
      "some-password"
    );

    data.email.should.equal(mockUser.email);

    accessToken.should.equal("some-random-access-token");
    refreshToken.should.equal("some-random-refresh-token");
  });

  parameterized(
    "should properly transform inputs",
    [
      ["emai@email.com", "emai@email.com", "PasSwOrd^%"],
      ["   emai@email.com   ", "emai@email.com", "PasSwOrd^%"],
      ["   eMaI@emaiL.coM   ", "emai@email.com", "   PasSwOrd^%  "],
      ["   EMAI@EMAIL.COM   ", "emai@email.com", "Pas Sw Ord^%"],
    ],
    async (inputEmail: string, expectedEmail: string, password: string) => {
      await testSuccessfulLogin(inputEmail, expectedEmail, password);
    }
  );

  parameterized(
    "should throw invalid input error when data is invalid",
    [
      ["invalidemail", "validPasSwOrd^%"],
      ["email@email.com", "invalidPass"],
    ],
    async (inputEmail: string, expectedEmail: string, password: string) => {
      mockAuthRepo.getUserWithCredentials.returns(Promise.resolve(mockUser));
      mockSessionManager.createSession.returns(Promise.resolve(mockSession));

      assertFailureWithError(inputEmail, password, InvalidInputData);
      mockAuthRepo.getUserWithCredentials.should.have.not.been.called;
    }
  );
});
