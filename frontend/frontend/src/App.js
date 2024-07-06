import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
