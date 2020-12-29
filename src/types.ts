import { Response, Request } from 'express';
export interface AppContext {
  res: Response;
  req: Request & { session: any };
}
