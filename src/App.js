import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
 
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import ProtectedRoutes from "./protectedRoutes";
function App() {
  const location = useLocation()
  const [user, setUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("user-details");
    setUser(user);
  }, [location.pathname]);
  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              {" "}
              <Home />{" "}
            </ProtectedRoutes>
          }
        />
        <Route path="/authentication" element={<Auth />} />

        {/* <Route path="/authenticaton" element={<Auth />} /> */}
        <Route path="*" element={user ? <Navigate to="/home"/> : <Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default App;
