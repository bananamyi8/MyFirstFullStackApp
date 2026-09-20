function TaskCard({ task, onToggle, onDelete, onEdit }) {
    const isOverdue =
        task.dueDate &&
        !task.completed &&
        new Date(task.dueDate) < new Date();

    return (
        <div className={`task-card ${task.completed ? "completed" : ""}`}>
            <div className="task-info">
                <div className="task-top">
                    <h3>{task.title}</h3>

                    <span className={`priority ${task.priority.toLowerCase()}`}>
                        {task.priority}
                    </span>
                </div>

                {task.description && (
                    <p>{task.description}</p>
                )}

                <div className="task-meta">
                    <span>📁 {task.category}</span>

                    {task.dueDate && (
                        <span className={isOverdue ? "overdue" : ""}>
                            📅 {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <button onClick={() => onToggle(task)}>
                    {task.completed ? "↩ Undo" : "✓ Complete"}
                </button>

                <button onClick={() => onEdit(task)}>
                    ✏️ Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(task._id)}
                >
                    🗑 Delete
                </button>
            </div>
        </div>
    );
}

export default TaskCard;