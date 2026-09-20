function TaskStats({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.completed
  ).length;

  const pending = tasks.filter(
    (task) => !task.completed
  ).length;

  const highPriority = tasks.filter(
    (task) =>
      task.priority === "High" &&
      !task.completed
  ).length;

  return (
    <div className="stats">
      <div className="stat-card">
        <h3>{total}</h3>
        <p>Total Tasks</p>
      </div>

      <div className="stat-card">
        <h3>{completed}</h3>
        <p>Completed</p>
      </div>

      <div className="stat-card">
        <h3>{pending}</h3>
        <p>Pending</p>
      </div>

      <div className="stat-card">
        <h3>{highPriority}</h3>
        <p>High Priority</p>
      </div>
    </div>
  );
}

export default TaskStats;