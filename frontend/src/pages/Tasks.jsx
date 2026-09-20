import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/tasks"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.error(
        "Failed to fetch tasks:",
        error
      );
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task) => {
    setTasks((current) => [
      task,
      ...current
    ]);
  };

  const completeTask = async (task) => {
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

      const updatedTask =
        await response.json();

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
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((current) =>
        current.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter(
    (task) => {
      const matchesSearch =
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" &&
          task.completed) ||
        (filter === "Pending" &&
          !task.completed);

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  return (
    <section className="tasks-page">
      <div className="page-heading">
        <div>
          <span className="section-label">
            TASK MANAGEMENT
          </span>

          <h1>My Tasks</h1>

          <p>
            Organize your work and stay
            productive.
          </p>
        </div>
      </div>

      <TaskForm
        onTaskAdded={addTask}
      />

      <div className="task-controls">
        <input
          type="text"
          placeholder="🔎 Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value)
          }
        >
          <option value="All">
            All Tasks
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div>📋</div>
            <h3>No tasks found</h3>
            <p>
              Add your first task to get
              started.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onComplete={
                completeTask
              }
              onDelete={
                deleteTask
              }
            />
          ))
        )}
      </div>
    </section>
  );
}

export default Tasks;