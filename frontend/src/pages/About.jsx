function About() {
    return (
        <div className="page">
            <div className="about-card">
                <div className="about-icon">
                    📝
                </div>

                <h1>About TaskMate</h1>

                <p>
                    TaskMate is a simple productivity application
                    designed to help users organize their daily
                    tasks and stay on top of their responsibilities.
                </p>

                <div className="tech-list">
                    <div>
                        <strong>Frontend</strong>
                        <span>React + Vite</span>
                    </div>

                    <div>
                        <strong>Backend</strong>
                        <span>Node.js + Express</span>
                    </div>

                    <div>
                        <strong>Database</strong>
                        <span>MongoDB Atlas + Mongoose</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;