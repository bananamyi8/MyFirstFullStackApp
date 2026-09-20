function About() {
  return (
    <section className="about">
      <span className="section-label">
        ABOUT THE PROJECT
      </span>

      <h1>About TaskMate</h1>

      <p>
        TaskMate is a full-stack task
        management application created
        for Integrative Programming II.
      </p>

      <div className="tech-grid">
        <div>
          ⚛️
          <h3>React</h3>
          <p>Frontend interface</p>
        </div>

        <div>
          🟢
          <h3>Node.js</h3>
          <p>Backend runtime</p>
        </div>

        <div>
          🚂
          <h3>Express</h3>
          <p>REST API</p>
        </div>

        <div>
          🍃
          <h3>MongoDB</h3>
          <p>Database</p>
        </div>
      </div>
    </section>
  );
}

export default About;