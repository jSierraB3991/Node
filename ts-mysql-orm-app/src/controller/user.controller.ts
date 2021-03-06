import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import {  getRepository } from "typeorm";

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    const users = await getRepository(User).find();
    return res.json(users);
}

export const getUserById = async (req: Request, res: Response): Promise<Response> =>{
    const id = req.params;
    const user = await getRepository(User).findOne(id);
    if(user) return res.json(user);
    return res.status(404).json({isSuccess: false, message: 'The user not exists'});
}

export const createUser = async (req: Request, res: Response): Promise<Response> =>{
    const newUser = getRepository(User).create(req.body);
    const userSave = await getRepository(User).save(newUser);
    return res.json(userSave);
}

export const updateUser = async (req: Request, res: Response): Promise<Response> =>{
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).merge(user, req.body);
        const result = getRepository(User).save(user);
        return res.json(user);
    }
    return res.status(404).json({isSuccess: false, message: 'The user not exists'});
}

export const deleteUserById = async (req: Request, res: Response): Promise<Response> =>{
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        getRepository(User).delete(req.params.id);
        return res.json({isSuccess: true, message: 'The user delete successfull'});
    }
    return res.status(404).json({isSuccess: false, message: 'The user not exists'});
}