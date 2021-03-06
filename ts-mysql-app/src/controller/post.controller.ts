import { Request, Response } from "express";
import { connect } from "../database";
import { Post } from '../interface/post.interface' 

export async function getPosts(req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    const post = await conn.query('SELECT * FROM post');
    return res.json(post[0]);
}

export async function createPost(req: Request, res: Response): Promise<Response> {
    const newPost: Post = req.body;
    const conn = await connect();
    await conn.query('INSERT INTO post SET ?', newPost);
    return res.json({data: newPost, message: 'Post Create'});
}

export async function getPostById(req: Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const conn = await connect();
    const post = await conn.query('SELECT * FROM post WHERE id = ?', [id]);
    return res.json(post[0]);
}

export async function deletePost(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const conn = await connect();
    await conn.query('DELETE FROM post WHERE id = ?', [id]);
    return res.json({ isSuccess: true, message: 'Post Delete' });
}

export async function updatePost(req: Request, res:Response): Promise<Response>{
    const { id } = req.params;
    const post: Post = req.body;
    const conn = await connect();
    await conn.query('UPDATE post SET ? WHERE id = ?', [post, id]);
    return res.json(post);
}