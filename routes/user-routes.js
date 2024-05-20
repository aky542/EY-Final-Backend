import express from "express";

import authMiddleware from "../middlewares/auth.js";
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from "../controllers/user-controller.js";

const userrouter = express.Router();

userrouter.route('/').get(getAllUsers);
userrouter.route('/register').post(registerUser);
userrouter.route('/login').post(loginUser);
userrouter.route('/:id').get(getUserById).patch(authMiddleware,updateUser).delete(deleteUser);


export default userrouter;