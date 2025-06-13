import "./App.css";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./pages/HomeLayout";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/chat" element={<h1>Chat Page</h1>} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
