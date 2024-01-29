import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import App from "./App";
import PrivateRoute from "./utils/PrivateRoute";
import Room from "./pages/room";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<PrivateRoute />}>
            <Route path="/" element={<App />}></Route>
            <Route path="/room/:roomid" element={<Room />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
