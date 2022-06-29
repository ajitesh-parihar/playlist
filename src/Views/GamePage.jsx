import { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { gameDetails } from "../Controllers/igdb";

export const GamePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  const [searchInput, setSearchInput] = useState("");
  const [game, setGame] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

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
    <div className="w-100 vh-100">
      <Container>
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
                    if (searchInput === query) return;
                    setSearchQuery(searchInput);
                    navigate(`/search?q=${searchInput}`);
                  }
                }}
              />
            </div>
          </Col>
          <Col>
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
            <Carousel>
              {game.artworks.map((art) => (
                <Carousel.Item
                  key={art}
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
        <Row className="w-100">
          <Col>
            <Row>
              <Image
                src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover}`}
                className="w-50"
              ></Image>
            </Row>
            <Row>{game.themes?.join(", ")}</Row>
            <Row>
              <p>{`Ratings: ${
                game.aggregated_rating
                  ? Number(game.aggregated_rating).toFixed(0) + "%"
                  : "No ratings found"
              }`}</p>
            </Row>
          </Col>
          <Col>
            <Row>
              <h1>{game.name}</h1>
            </Row>
            <Row>
              <p>{game.summary}</p>
              <p>
                {game.storyline && game.storyline.length > 500
                  ? `${game.storyline.slice(0, 500)}...`
                  : game.storyline}
              </p>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
