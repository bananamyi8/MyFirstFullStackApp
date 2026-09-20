function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div
      className={`task-item ${
        task.completed ? "completed" : ""
      }`}
    >
      <div className="task-info">
        <h3>{task.title}</h3>

        <p>{task.description}</p>

        <div className="task-meta">
          <span>
            Priority: {task.priority}
          </span>

          {task.dueDate && (
            <span>
              Due:{" "}
              {new Date(
                task.dueDate
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          onClick={() => onComplete(task)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;