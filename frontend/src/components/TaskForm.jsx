import { useState } from "react";

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Personal");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter a task title.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    priority,
                    dueDate
                })
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Failed to add task.");
                return;
            }

            onTaskAdded(data);

            setTitle("");
            setDescription("");
            setCategory("Personal");
            setPriority("Medium");
            setDueDate("");
        } catch (error) {
            console.error(error);
            alert("Unable to connect to the backend.");
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2>➕ Add New Task</h2>

            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className="form-row">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Personal</option>
                    <option>School</option>
                    <option>Work</option>
                    <option>Important</option>
                </select>

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

            <label>Due Date</label>

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <button type="submit">
                Add Task
            </button>
        </form>
    );
}

export default TaskForm;