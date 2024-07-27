import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Ratings from "./pages/Ratings";
import Search from "./pages/Search";
import Course from "./pages/Course";
import Dashboard from "./pages/Dashboard";
import WriteRating from "./pages/WriteRating";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("/auth/login/success", {
        method: "GET",
        credentials: "include",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Failed Authentication");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, []);

  return (
    <Router>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/search" element={<Search />} />
        <Route path="/ratings/:id" element={<Course user={user} />} />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/ratings/write/:id"
          element={user ? <WriteRating user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/ratings/update/:id"
          element={
            user ? (
              <WriteRating user={user} update={true} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
