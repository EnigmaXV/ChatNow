import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./pages/HomeLayout";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={!isAuthenticated ? <Login /> : <HomeLayout />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={isAuthenticated ? <HomeLayout /> : <Login />}
        >
          <Route path="chat" element={<h1>Chat Page</h1>} />
          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Login />}
          />
        </Route>
        //TODO implement a 404 page
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
