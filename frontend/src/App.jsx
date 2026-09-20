import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import About from "./pages/About";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;