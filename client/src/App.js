import { Homepage } from "./Views/Homepage";
import { SearchPage } from "./Views/SearchPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GamePage } from "./Views/GamePage";
import { TopGamesPage } from "./Views/TopGamesPage";
import { UpcomingGamesPage } from "./Views/UpcomingGamesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/top100" element={<TopGamesPage />} />
        <Route path="/upcoming" element={<UpcomingGamesPage />} />
      </Routes>
    </BrowserRouter>
    // return <Homepage />;
  );
}

export default App;
