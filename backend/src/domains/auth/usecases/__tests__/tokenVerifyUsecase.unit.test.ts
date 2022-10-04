import { expect } from "chai";
import { InvalidSession, MustBeLoggedIn } from "domains/auth/errors";
import { mockSessionManager } from "domains/auth/__tests__/unitStubs";
import { parameterized } from "__tests__/utils";
import { TokenVerifyUsecase } from "../tokenVerifyUsecase";

describe("TokenVerifyUsecase", () => {
  beforeEach(async () => {
    mockSessionManager.verifyToken.reset();
    mockSessionManager.getSession.reset();
  });

  parameterized(
    "should raise error when the authorization is invalid",
    ["bearer token seven eight", "beaxer token", "", undefined],
    async (authorization?: string) => {
      const usecase = new TokenVerifyUsecase(mockSessionManager);
      try {
        await usecase.execute(authorization);
        expect(true).to.be.false;
      } catch (error) {
        expect(error).to.be.instanceof(MustBeLoggedIn);
      }

      mockSessionManager.verifyToken.should.not.have.been.called;
    }
  );

  it("should raise error if verifyToken fails", async () => {
    const authorization = "Bearer example_token";
    const usecase = new TokenVerifyUsecase(mockSessionManager);
    mockSessionManager.verifyToken.returns(
      Promise.reject(new InvalidSession())
    );
    try {
      await usecase.execute(authorization);
      expect(true).to.be.false;
    } catch (error) {
      expect(error).to.be.instanceof(InvalidSession);
    }

    mockSessionManager.verifyToken.should.have.been.calledOnceWith(
      "example_token"
    );
  });

  it("should return a session if it found one", async () => {
    const authorization = "Bearer example_token";
    const usecase = new TokenVerifyUsecase(mockSessionManager);
    mockSessionManager.verifyToken.returns(
      Promise.resolve({
        id: "mock-id",
        email: "email@email.com",
      })
    );
    mockSessionManager.getSession.returns(
      Promise.resolve({
        id: "mock-session-id",
        email: "email@email.com",
        userId: "mock-user-id",
      })
    );
    const data = await usecase.execute(authorization);

    data.should.be.eql({
      userId: "mock-user-id",
      userEmail: "email@email.com",
    });
    mockSessionManager.verifyToken.should.have.been.calledOnceWith(
      "example_token"
    );
  });
});
