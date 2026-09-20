function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className="task-item">
            <span className={task.completed ? "completed" : ""}>
                {task.title}
            </span>

            <div>
                <button onClick={() => onToggle(task)}>
                    {task.completed ? "Undo" : "Done"}
                </button>

                <button onClick={() => onDelete(task._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;