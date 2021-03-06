import { json, Router } from "express";
import { index } from "../controller/index.controller";

const route = Router();

route.route('/')
    .get(index);

export default route;