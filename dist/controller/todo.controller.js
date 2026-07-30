import { prisma } from '../lib/prisma.js';
import z from 'zod';
const noteSchema = z.object({
    title: z.string().min(3),
    description: z.string(),
    done: z.boolean()
});
export const addTodo = async (req, res) => {
    try {
        const result = noteSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            });
        }
        const { title, description, done } = result.data;
        await prisma.todo.create({
            data: {
                title,
                description,
                done,
                userId: req.userId
            }
        });
        res.status(200).json({
            msg: "Note added successfully!"
        });
    }
    catch (error) {
        console.log(`Error in addContent controller ${error}`);
    }
};
export const editTodo = async (req, res) => {
    try {
        const result = noteSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            });
        }
        const { title, description, done } = result.data;
        const todoId = Number(req.params.id);
        const todo = await prisma.todo.findUnique({
            where: {
                id: todoId
            }
        });
        if (!todo) {
            return res.status(411).json({
                msg: "No todo found with this id"
            });
        }
        if (todo.userId !== req.userId) {
            return res.status(404).json({
                msg: "You are not allowed to edit this todo"
            });
        }
        await prisma.todo.update({
            where: {
                id: todoId
            },
            data: {
                title,
                description,
                done
            }
        });
        res.status(200).json({
            msg: 'Todo edited successfully!'
        });
    }
    catch (error) {
        console.log(`Error in editContent controller ${error}`);
    }
};
export const getAllTodo = async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId: req.userId
            }
        });
        if (!todos) {
            return res.status(411).json({
                msg: "Error while fetching todos"
            });
        }
        res.status(200).json({
            todos
        });
    }
    catch (error) {
        console.log(`Error in editContent controller ${error}`);
    }
};
export const deleteTodo = async (req, res) => {
    try {
        const todoId = Number(req.params.id);
        const todo = await prisma.todo.findUnique({
            where: {
                id: todoId
            }
        });
        if (!todo) {
            return res.status(404).json({
                msg: "No todo found with this id"
            });
        }
        if (todo.userId !== req.userId) {
            return res.status(404).json({
                msg: "You are not allowed to delete this post"
            });
        }
        await prisma.todo.delete({
            where: {
                id: todoId
            }
        });
        res.status(200).json({
            msg: "Todo deleted successfully!"
        });
    }
    catch (error) {
        console.log(`Error in deleteTodo controller ${error}`);
    }
};
//# sourceMappingURL=todo.controller.js.map