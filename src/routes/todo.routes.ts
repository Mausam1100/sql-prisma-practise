import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addTodo, deleteTodo, editTodo, getAllTodo } from "../controller/todo.controller.js";

const router = Router()

router.post('/add-todo', authMiddleware, addTodo)
router.put('/edit-todo/:id', authMiddleware, editTodo)
router.get('/get-todos', authMiddleware, getAllTodo)
router.delete('/delete/:id', authMiddleware, deleteTodo)

export default router