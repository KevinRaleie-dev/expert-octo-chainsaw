import { Response, Request } from 'express';
export interface AppContext {
  res: Response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  req: Request & { session: any };
}
