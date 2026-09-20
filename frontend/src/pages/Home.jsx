import { useEffect, useState } from "react";

function Home() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error(error));
    }, []);

    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;

    const progress =
        total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="page">
            <div className="welcome">
                <div>
                    <p className="small-title">WELCOME TO TASKMATE</p>
                    <h1>Stay organized.<br />Get things done.</h1>
                    <p>
                        Manage your tasks, track your progress,
                        and make every day productive.
                    </p>
                </div>

                <div className="welcome-icon">
                    📝
                </div>
            </div>

            <div className="stats">
                <div className="stat-card">
                    <span>📋</span>
                    <h2>{total}</h2>
                    <p>Total Tasks</p>
                </div>

                <div className="stat-card">
                    <span>⏳</span>
                    <h2>{active}</h2>
                    <p>Active Tasks</p>
                </div>

                <div className="stat-card">
                    <span>✅</span>
                    <h2>{completed}</h2>
                    <p>Completed</p>
                </div>
            </div>

            <div className="progress-card">
                <div className="progress-header">
                    <div>
                        <h2>Today's Progress</h2>
                        <p>
                            {completed} of {total} tasks completed
                        </p>
                    </div>

                    <strong>{progress}%</strong>
                </div>

                <div className="progress-bar">
                    <div
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="recent-card">
                <h2>Recent Tasks</h2>

                {tasks.slice(0, 5).map((task) => (
                    <div className="recent-task" key={task._id}>
                        <span>
                            {task.completed ? "✅" : "⬜"}
                        </span>

                        <div>
                            <strong>{task.title}</strong>
                            <small>{task.category}</small>
                        </div>
                    </div>
                ))}

                {tasks.length === 0 && (
                    <p className="no-data">
                        You don't have any tasks yet.
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;