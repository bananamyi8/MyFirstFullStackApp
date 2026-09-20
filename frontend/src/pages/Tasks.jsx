import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    const fetchTasks = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/tasks");
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = (task) => {
        setTasks((current) => [task, ...current]);
    };

    const toggleTask = async (task) => {
        try {
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

            setTasks((current) =>
                current.map((item) =>
                    item._id === updatedTask._id
                        ? updatedTask
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm("Delete this task?")) {
            return;
        }

        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE"
            });

            setTasks((current) =>
                current.filter((task) => task._id !== id)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const editTask = async (task) => {
        const newTitle = window.prompt(
            "Edit task title:",
            task.title
        );

        if (!newTitle || newTitle.trim() === "") {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/api/tasks/${task._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: newTitle
                    })
                }
            );

            const updatedTask = await response.json();

            setTasks((current) =>
                current.map((item) =>
                    item._id === updatedTask._id
                        ? updatedTask
                        : item
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesFilter =
            filter === "All" ||
            (filter === "Active" && !task.completed) ||
            (filter === "Completed" && task.completed);

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>My Tasks</h1>
                    <p>Organize your work and stay productive.</p>
                </div>
            </div>

            <TaskForm onTaskAdded={addTask} />

            <div className="task-controls">
                <input
                    type="text"
                    placeholder="🔎 Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>Completed</option>
                </select>
            </div>

            <div className="tasks-list">
                {filteredTasks.length === 0 ? (
                    <div className="empty">
                        <div>📋</div>
                        <h2>No tasks found</h2>
                        <p>Add a task to get started.</p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default Tasks;