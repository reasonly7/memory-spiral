import { LoginParams } from "@/api/auth.api";

export type LoginFormModel = Omit<LoginParams, "sessionId">;
