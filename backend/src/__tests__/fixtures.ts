import chai from "chai";
import chaiHttp from "chai-http";
import sinonChai from "sinon-chai";
import chaiSubset from "chai-subset";

export const mochaGlobalSetup = function () {
  chai.should();
  chai.use(chaiHttp);
  chai.use(sinonChai);
  chai.use(chaiSubset);
};
