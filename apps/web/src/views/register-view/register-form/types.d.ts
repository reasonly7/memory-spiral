import { RegisterParams } from "@/api/auth.api";

export type RegisterFormModel = Omit<RegisterParams, "sessionId">;
