import logo from "./logo.svg";
import { Homepage } from "./Views/Homepage";
import { SearchPage } from "./Views/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GamePage } from "./Views/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
    // return <Homepage />;
  );
}

export default App;
