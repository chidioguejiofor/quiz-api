import { InvalidSession } from "domains/auth/errors";
import { expect } from "chai";
import { parameterized } from "__tests__/utils";
import { InvalidInputData } from "shared/errors";
import { RefreshTokenUsecase } from "../refreshTokenUsecase";
import { mockSessionManager } from "domains/auth/__tests__/unitStubs";

const MOCK_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const MOCK_REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3RkRTODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.i6ROOPGUYPzkw7t9g7enqo6UolRjCCDl0PV5LNJWZWw";

const usecase = new RefreshTokenUsecase(mockSessionManager);
const mockValidSession = {
  id: "mock-session-id",
  email: "mock@email.com",
  userId: "mock-user-id",
  role: "customer" as const,
};
describe("Refresh Token Usecase", () => {
  beforeEach(() => {
    mockSessionManager.generateAccessToken.reset();
    mockSessionManager.verifyToken.reset();
    mockSessionManager.decode.reset();
    mockSessionManager.getSession.reset();
    mockSessionManager.generateAccessToken.reset();
  });

  parameterized(
    "should validate the user input before using the data",
    [
      [MOCK_ACCESS_TOKEN, ""],
      ["", MOCK_REFRESH_TOKEN],
    ],
    async (accessToken: string, refreshToken: string) => {
      try {
        await usecase.execute(accessToken, refreshToken);
        expect(false).to.be.true;
      } catch (error) {
        expect(error).to.be.instanceof(InvalidInputData);
      }

      mockSessionManager.generateAccessToken.should.not.have.been.called;
    }
  );

  it("should raise an error when verify token fails", async () => {
    const accessToken = MOCK_ACCESS_TOKEN,
      refreshToken = MOCK_REFRESH_TOKEN;

    mockSessionManager.verifyToken.throws(new InvalidSession());
    mockSessionManager.decode.returns(mockValidSession);
    try {
      await usecase.execute(accessToken, refreshToken);
      expect(false).to.be.true;
    } catch (error) {
      expect(error).to.be.instanceof(InvalidSession);
    }
    mockSessionManager.verifyToken.calledOnceWith(refreshToken);

    mockSessionManager.decode.should.not.have.been.called;
  });

  it("should fail if the sesion ids of access and refresh are not the same", async () => {
    const accessToken = MOCK_ACCESS_TOKEN,
      refreshToken = MOCK_REFRESH_TOKEN;

    mockSessionManager.verifyToken.returns({
      id: "different_id",
    });
    mockSessionManager.decode.returns(mockValidSession);
    mockSessionManager.getSession.returns(Promise.resolve(mockValidSession));
    mockSessionManager.generateAccessToken.returns("new_mock_access_token");

    try {
      await usecase.execute(accessToken, refreshToken);
      expect(false).to.be.true;
    } catch (error) {
      expect(error).to.be.instanceof(InvalidSession);
    }

    mockSessionManager.generateAccessToken.should.not.have.been.called;
  });

  it("should generate token if session exists and token is valid", async () => {
    const accessToken = MOCK_ACCESS_TOKEN,
      refreshToken = MOCK_REFRESH_TOKEN;

    mockSessionManager.verifyToken.returns({ id: mockValidSession.id });
    mockSessionManager.decode.returns(mockValidSession);
    mockSessionManager.getSession.returns(Promise.resolve(mockValidSession));
    mockSessionManager.generateAccessToken.returns("new_mock_access_token");

    const newToken = await usecase.execute(accessToken, refreshToken);

    mockSessionManager.verifyToken.should.have.been.calledOnceWith(
      refreshToken
    );
    mockSessionManager.decode.should.have.been.calledOnceWith(accessToken);
    mockSessionManager.getSession.should.have.been.calledOnceWithExactly(
      mockValidSession.id as string
    );
    mockSessionManager.generateAccessToken.should.have.been.calledOnceWith(
      mockValidSession.id
    );
    newToken.should.be.eql("new_mock_access_token");
  });
});
