import { Request, Response } from "express";

export function index(req: Request, res: Response): Response {
    return res.json({ isSuccess: true, message: 'Welcome My API'})
}