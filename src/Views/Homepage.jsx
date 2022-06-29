import { useEffect, useState } from "react";
import {
  Button,
  Alert,
  Row,
  Container,
  Col,
  Carousel,
  CarouselItem,
  Image,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { popularGames } from "../Controllers/igdb";

export const Homepage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response = await popularGames();
      setPopular(response);
    })();
  }, []);

  return (
    <div className="w-100 vh-100">
      <Container>
        <Row className="align-items-center d-flex">
          <h1>Playlist</h1>
          <h6>Find your all favorite games in one place!</h6>
        </Row>
      </Container>
      <Container className="h-75 d-flex align-items-center justify-content-center flex-column">
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
                    navigate(`/search?q=${searchInput}`);
                  }
                }}
              />
            </div>
          </Col>
          <Col>
            <Button
              onClick={() => {
                navigate(`/search?q=${searchInput}`);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row className="w-100 mb-5">
          <h4>New popular releases:</h4>
        </Row>
        <Row className="w-100 mb-5">
          {/* {popular.map((item) => item.name)} */}
          <Carousel>
            {popular.map((game) => (
              <Carousel.Item
                key={game.id}
                style={{
                  height: "20em",
                  paddingInline: "10%",
                }}
                onClick={() => navigate(`/game?id=${game.id}`)}
              >
                <div className="d-flex justify-content-between">
                  <div className="my-5 d-flex flex-column justify-content-between">
                    <h2>{game.name}</h2>
                    <h5>
                      {game.summary.length > 500
                        ? `${game.summary.slice(0, 500)}...`
                        : game.summary}
                    </h5>
                  </div>
                  <Image fluid={true} src={game.cover}></Image>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Row>
      </Container>
    </div>
  );
};
