const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            priority: req.body.priority,
            dueDate: req.body.dueDate || null
        });

        const savedTask = await task.save();

        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;