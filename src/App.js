import "./App.css";
import Dashboard from "./Screens/Dashboard.tsx";
import Feedbacks from "./Screens/Feedbacks.tsx";
import Feedback from "./Screens/Feedback.tsx";
import Homepage from "./Screens/Homepage.tsx";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="relative min-h-screen">
      {/* <Homepage /> */}
      {/* <Dashboard /> */}
      <div className="pb-16">
        <Router>
          <div>
            {/* <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/admin">admin</Link>
                </li>
                <li>
                  <Link to="/feedback">feedback</Link>
                </li>
              </ul>
            </nav> */}
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/feedbacks" element={<Feedbacks />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
