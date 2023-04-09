import Navbar from "./components/Navbar";
import "./styles/style.css";
import Home from "./Pages/Home";
import ControlPage from "./Pages/ControlPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/:type" element={<ControlPage />} />
      </Routes>
    </div>
  );
}

export default App;
