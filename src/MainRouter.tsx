import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import App from "./App";
import PrivateRoute from "./utils/PrivateRoute";
import Room from "./pages/room";
import { Game } from "./pages/game";
import { InGame } from "./pages/game/InGame";

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<PrivateRoute />}>
            <Route path="/" element={<App />}></Route>
            <Route path="/room/:roomid" element={<Room />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/game/:id" element={<InGame />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
