import express from "express";
import authMiddleware from "../middlewares/auth.js";
import { createBlog, deleteBlog, eidtBlog, getAllblogs, getBlog } from "../controllers/blog-controller.js";

const blogrouter = express.Router();

blogrouter.route('/').get(getAllblogs).post(authMiddleware,createBlog);
blogrouter.route('/:id').get(authMiddleware,getBlog).patch(authMiddleware,eidtBlog).delete(authMiddleware,deleteBlog);


export default blogrouter;