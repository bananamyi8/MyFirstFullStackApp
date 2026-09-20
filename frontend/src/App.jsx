import {
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/NavBar";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;