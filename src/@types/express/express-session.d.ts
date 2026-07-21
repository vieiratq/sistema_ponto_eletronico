import "express-session";

declare module "express-session" {
  interface SessionData {
    empresa?: {
      id?: number;
      email?: string;
      cnpj?: string;
      nome?: string;
    };
  }
}
