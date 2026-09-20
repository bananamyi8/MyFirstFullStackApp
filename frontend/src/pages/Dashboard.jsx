import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTasks = async () => {
        const response = await fetch(
            "http://localhost:5000/api/tasks"
        );

        const data = await response.json();

        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        const response = await fetch(
            "http://localhost:5000/api/tasks",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title
                })
            }
        );

        const newTask = await response.json();

        setTasks([...tasks, newTask]);
        setTitle("");
    };

    const toggleTask = async (task) => {
        const response = await fetch(
            `http://localhost:5000/api/tasks/${task._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    completed: !task.completed
                })
            }
        );

        const updatedTask = await response.json();

        setTasks(
            tasks.map((item) =>
                item._id === updatedTask._id
                    ? updatedTask
                    : item
            )
        );
    };

    const deleteTask = async (id) => {
        await fetch(
            `http://localhost:5000/api/tasks/${id}`,
            {
                method: "DELETE"
            }
        );

        setTasks(
            tasks.filter((task) => task._id !== id)
        );
    };

    return (
        <div className="page">
            <h1>TaskMate Dashboard</h1>

            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button type="submit">
                    Add Task
                </button>
            </form>

            <div className="task-list">
                {tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;