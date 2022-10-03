import { mockAuthRepo } from "domains/auth/__tests__/unitStubs";
import { RegisterUsecase } from "../registerUsecase";
import { expect } from "chai";
import { UserExists } from "domains/auth/errors";

const registerInput = {
  firstName: "Some",
  lastName: "Random",
  email: "random@test.com",
  password: "1234567",
};

const mockRegisterUsecase = new RegisterUsecase(mockAuthRepo);

describe("Register user usecase", () => {
  beforeEach(async () => {
    mockAuthRepo.getUserByEmail.reset();
    mockAuthRepo.createUser.reset();
    mockAuthRepo.createUser.reset();
    mockAuthRepo.getUserByEmail.reset();
    mockAuthRepo.createUser.returns(Promise.resolve(registerInput));
  });
  it("should throw an error if the email exists in the database", async () => {
    mockAuthRepo.getUserByEmail.returns(Promise.resolve(registerInput as any));
    try {
      await mockRegisterUsecase.execute(registerInput);
    } catch (error) {
      expect(error).to.be.instanceof(UserExists);
    }
  });
  it("Should correctly transform user input", async () => {
    const input = {
      firstName: "some",
      lastName: "raNdom",
      email: "randOM2R@test.test",
      password: "1234567",
    };

    await mockRegisterUsecase.execute(input);

    mockAuthRepo.createUser.should.have.been.calledOnceWith({
      firstName: "Some",
      lastName: "Random",
      email: "random2r@test.test",
      password: "1234567",
    });
  });
  it("should successfully create a user", async () => {
    await mockRegisterUsecase.execute(registerInput);

    mockAuthRepo.getUserByEmail.should.have.been.calledOnceWith(
      registerInput.email
    );

    mockAuthRepo.createUser.should.have.been.calledOnceWith(registerInput);
  });
});
