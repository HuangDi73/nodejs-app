import { NextFunction, Request, Response, Router } from 'express';

export interface IControllerRoutes {
	method: keyof Pick<Router, 'get' | 'post' | 'post' | 'delete'>;
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
}

export type ExpressReturnType = Response<any, Record<string, any>>;
