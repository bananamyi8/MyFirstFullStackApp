import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setLoading(false);
      });
  }, []);

  // Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) =>
      task.priority === "High" &&
      !task.completed
  ).length;

  // Completion percentage
  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  // Recent tasks
  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  // Upcoming tasks
  const upcomingTasks = [...tasks]
    .filter(
      (task) =>
        !task.completed &&
        task.dueDate
    )
    .sort(
      (a, b) =>
        new Date(a.dueDate) -
        new Date(b.dueDate)
    )
    .slice(0, 5);

  if (loading) {
    return (
      <section className="dashboard">
        <div className="loading">
          Loading dashboard...
        </div>
      </section>
    );
  }

  return (
    <section className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <span className="section-label">
            OVERVIEW
          </span>

          <h1>Dashboard</h1>

          <p>
            Track your productivity and
            stay on top of your tasks.
          </p>
        </div>

        <Link
          to="/tasks"
          className="dashboard-button"
        >
          + Add New Task
        </Link>
      </div>

      {/* STATISTICS */}
      <div className="dashboard-stats">

        <div className="dashboard-card">
          <div className="card-icon purple">
            📋
          </div>

          <div>
            <p>Total Tasks</p>
            <h2>{totalTasks}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon green">
            ✓
          </div>

          <div>
            <p>Completed</p>
            <h2>{completedTasks}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon orange">
            ⏳
          </div>

          <div>
            <p>Pending</p>
            <h2>{pendingTasks}</h2>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-icon red">
            🔥
          </div>

          <div>
            <p>High Priority</p>
            <h2>{highPriorityTasks}</h2>
          </div>
        </div>

      </div>

      {/* MAIN DASHBOARD GRID */}
      <div className="dashboard-grid">

        {/* PROGRESS */}
        <div className="dashboard-panel progress-panel">

          <div className="panel-header">
            <div>
              <h2>Task Progress</h2>
              <p>
                Your overall completion rate
              </p>
            </div>

            <strong>
              {completionPercentage}%
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${completionPercentage}%`
              }}
            ></div>
          </div>

          <div className="progress-info">
            <span>
              {completedTasks} completed
            </span>

            <span>
              {pendingTasks} remaining
            </span>
          </div>

        </div>

        {/* QUICK ACTION */}
        <div className="dashboard-panel quick-panel">

          <div className="quick-icon">
            🚀
          </div>

          <h2>Stay Productive</h2>

          <p>
            Keep your tasks organized and
            complete your priorities.
          </p>

          <Link
            to="/tasks"
            className="quick-button"
          >
            Manage My Tasks →
          </Link>

        </div>

      </div>

      {/* RECENT + UPCOMING */}
      <div className="dashboard-grid bottom-grid">

        {/* RECENT TASKS */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h2>Recent Tasks</h2>
              <p>
                Your latest added tasks
              </p>
            </div>

            <Link to="/tasks">
              View All
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="dashboard-empty">
              <div>📋</div>
              <p>No tasks yet.</p>

              <Link to="/tasks">
                Create your first task
              </Link>
            </div>
          ) : (
            <div className="dashboard-task-list">

              {recentTasks.map((task) => (
                <div
                  className="dashboard-task"
                  key={task._id}
                >
                  <div
                    className={`status-dot ${
                      task.completed
                        ? "completed-dot"
                        : "pending-dot"
                    }`}
                  ></div>

                  <div className="dashboard-task-info">
                    <h3>{task.title}</h3>

                    <p>
                      {task.completed
                        ? "Completed"
                        : "Pending"}
                    </p>
                  </div>

                  <span
                    className={`priority ${
                      task.priority
                        .toLowerCase()
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>

        {/* UPCOMING */}
        <div className="dashboard-panel">

          <div className="panel-header">
            <div>
              <h2>Upcoming Tasks</h2>
              <p>
                Tasks with upcoming deadlines
              </p>
            </div>
          </div>

          {upcomingTasks.length === 0 ? (
            <div className="dashboard-empty">
              <div>🎉</div>

              <p>
                No upcoming deadlines.
              </p>

              <span>
                You're all caught up!
              </span>
            </div>
          ) : (
            <div className="dashboard-task-list">

              {upcomingTasks.map((task) => (
                <div
                  className="dashboard-task"
                  key={task._id}
                >
                  <div className="calendar-icon">
                    📅
                  </div>

                  <div className="dashboard-task-info">
                    <h3>{task.title}</h3>

                    <p>
                      Due:{" "}
                      {new Date(
                        task.dueDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`priority ${
                      task.priority.toLowerCase()
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default Dashboard;