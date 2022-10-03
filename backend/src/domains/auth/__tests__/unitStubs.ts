import sinon from "sinon";
import { AuthRepository, SessionManager } from "../repositories";

export const mockAuthRepo = sinon.stub(AuthRepository);
export const mockSessionManager = sinon.stub(SessionManager);
