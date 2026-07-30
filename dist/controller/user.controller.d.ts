import type { Request, Response } from 'express';
export declare const signUp: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const signIn: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logOut: (res: Response, req: Request) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=user.controller.d.ts.map