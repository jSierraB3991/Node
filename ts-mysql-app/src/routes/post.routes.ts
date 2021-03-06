import { json, Router } from "express";
import { getPosts, createPost, getPostById, deletePost, updatePost} from '../controller/post.controller'

const route = Router();

route.route('/post')
    .get(getPosts)
    .post(createPost);

    route.route('/post/:id')
    .get(getPostById)
    .put(updatePost)
    .delete(deletePost);


export default route;