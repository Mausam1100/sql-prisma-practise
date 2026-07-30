import type { Request, Response } from 'express';
export declare const addTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const editTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTodo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=todo.controller.d.ts.map