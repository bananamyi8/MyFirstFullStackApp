const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            default: "Personal"
        },

        priority: {
            type: String,
            default: "Medium"
        },

        dueDate: {
            type: Date
        },

        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);