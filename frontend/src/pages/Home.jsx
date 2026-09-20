import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="badge">
          ✨ Smart Task Management
        </span>

        <h1>
          Stay Organized with
          <span> TaskMate</span>
        </h1>

        <p>
          Manage your tasks, track your progress,
          and get things done.
        </p>

        <Link
          to="/tasks"
          className="hero-button"
        >
          Get Started →
        </Link>
      </div>
    </section>
  );
}

export default Home;