import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCover,
  getTop,
  getUpcoming,
  searchGames,
} from "../Controllers/igdb";
import { CardBox } from "./Components/CardBox";
import { Footer } from "./Components/Footer";
import { GameCard } from "./Components/GameCard";
import { Header } from "./Components/Header";

export const UpcomingGamesPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState();
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getUpcoming();
      setGameList(response);
    })();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Header />
      <Container className="mb-5">
        <Row className="w-100">
          <Col className="col-10">
            <div className="active-cyan-4 mb-4">
              <input
                className="form-control"
                type="text"
                placeholder="Search for a game..."
                aria-label="Search"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    if (searchInput.length === 0) return;
                    navigate(`/search?q=${searchInput}`);
                  }
                }}
              />
            </div>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (searchInput.length === 0) return;
                navigate(`/search?q=${searchInput}`);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row>
          <h3>Most anticipated upcoming games:</h3>
        </Row>
        <Row className="align-items-center d-flex">
          <CardBox gameList={gameList} />
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
