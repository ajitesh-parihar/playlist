import { useEffect, useReducer, useState } from "react";
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { gameDetails } from "../Controllers/igdb";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";

export const GamePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  const [searchInput, setSearchInput] = useState("");
  const [game, setGame] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [expandStory, toggleExpandStory] = useReducer((oldState) => {
    return !oldState;
  }, false);

  useEffect(() => {
    (async () => {
      const response = await gameDetails(searchQuery);
      setGame(response);
    })();
  }, [searchQuery]);

  useEffect(() => {
    setSearchInput("");
    setSearchQuery(query);
  }, [query]);

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Header />
      <Container className="mb-5">
        <Row className="w-100 justify-content-center">
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
                    if (searchInput.length) {
                      setSearchQuery(searchInput);
                      navigate(`/search?q=${searchInput}`);
                    }
                  }
                }}
              />
            </div>
          </Col>
          <Col className="col-1">
            <Button
              onClick={() => {
                if (searchInput === query) return;
                setSearchQuery(searchInput);
                navigate(`/search?q=${searchInput}`);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row>
          {game.artworks && (
            <Carousel className="mb-5">
              {game.artworks.map((art, index) => (
                <Carousel.Item
                  key={index}
                  style={{
                    height: "20em",
                  }}
                >
                  <div className="d-flex justify-content-center">
                    <Image
                      fluid={true}
                      src={`https://images.igdb.com/igdb/image/upload/t_1080p/${art}`}
                    ></Image>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Row>
        <Row className="w-100 d-flex justify-content-center">
          <Col className="col-3">
            <Row>
              {game.cover && (
                <Image
                  src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}`}
                  className="w-100"
                ></Image>
              )}
            </Row>
            <Row>
              {game.first_release_date && (
                <div className="mt-2">
                  <h6>
                    <b>Release Date:</b>
                    {game.first_release_date}
                  </h6>
                </div>
              )}
              {!!game.developers?.length && (
                <div className="mt-2">
                  <h6>
                    <b>Developed by:</b>
                  </h6>
                  <p>{game.developers && game.developers.join(", ")}</p>
                </div>
              )}
              {!!game.publishers?.length && (
                <div className="mt-2">
                  <h6>
                    <b>Published by:</b>
                  </h6>
                  <p>{game.publishers && game.publishers.join(", ")}</p>
                </div>
              )}
            </Row>
          </Col>
          <Col>
            <Row>
              <div className="d-flex justify-content-between align-items-end mb-2">
                <div
                  className="d-flex justify-content-evenly flex-column"
                  style={{ maxWidth: "75%" }}
                >
                  <h1>{game.name}</h1>
                  <div className="mb-3">
                    {game.themes?.map((item, index) => (
                      <Button
                        className="me-2"
                        size="sm"
                        variant="outline-info"
                        key={index}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                  <p>{`Platforms: ${game.platforms?.join(", ")}`}</p>
                </div>
                <div className="h-100 d-flex flex-column justify-content-between py-2">
                  <h3>
                    <b>Ratings: </b>
                    <span
                      style={{
                        color: `hsl(${Number(game.total_rating).toFixed(
                          0
                        )}, 100%, 30%)`,
                      }}
                    >
                      {`${
                        game.total_rating
                          ? Number(game.total_rating).toFixed(0) + "%"
                          : "N/A"
                      }`}
                    </span>
                  </h3>
                  <div>
                    <h6>
                      <b>Parental guidance:</b>
                    </h6>
                    <h6>{game.age_rating}</h6>
                  </div>
                </div>
              </div>
            </Row>
            <Row className="pt-5 border-top border-1">
              <p style={{ textAlign: "justify" }}>{game.summary}</p>
              <p style={{ textAlign: "justify" }} onClick={toggleExpandStory}>
                {(game.storyline &&
                  !expandStory &&
                  ((game.storyline.length > 500 &&
                    `${game.storyline.slice(0, 500)}...`) ||
                    game.storyline)) ||
                  (expandStory && <p>{game.storyline}</p>)}
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
