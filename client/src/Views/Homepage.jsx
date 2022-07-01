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
import { gameDetails, popularGames } from "../Controllers/igdb";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";

const monthlySetup = {
  id: 7360,
  artIndex: 8,
};

export const Homepage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [popular, setPopular] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const monthlyDetails = await gameDetails(monthlySetup.id);
      setMonthly(monthlyDetails);
      const response = await popularGames();
      setPopular(response);
    })();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 w-100">
      <Header />
      {/* <Container style={{ marginTop: -16 }}>
        <Row className="align-items-center d-flex">
          <h6>Find your all favorite games in one place!</h6>
        </Row>
      </Container> */}
      {monthly?.artworks && (
        <div
          onClick={() => navigate(`/game?id=${monthly.id}`)}
          style={{
            height: "20em",
            width: "100%",
            marginTop: -16,
            paddingTop: "1%",
            paddingLeft: "1%",
            // overflow: "hidden",
            backgroundImage: `url("https://images.igdb.com/igdb/image/upload/t_1080p/${monthly.artworks.at(
              // Math.floor(Math.random() * monthly.artworks.length)
              monthlySetup.artIndex
            )}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 style={{ textShadow: "1px 1px #000" }}>
            Monthly Recommendation:
          </h3>
          <h2 style={{ textShadow: "1px 1px #000" }}>{monthly.name}</h2>
        </div>
      )}
      <Container className="h-75 d-flex align-items-center justify-content-center flex-column">
        <Row className="w-100 py-5 mt-5">
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
                    if (searchInput.length)
                      navigate(`/search?q=${searchInput}`);
                  }
                }}
              />
            </div>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (searchInput.length) navigate(`/search?q=${searchInput}`);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row className="w-100 my-5">
          <h4>New popular releases:</h4>
        </Row>
        {popular && (
          <Row className="w-100 mb-5">
            <Carousel>
              {popular.map((game) => (
                <Carousel.Item
                  key={game.id}
                  style={{
                    height: "20em",
                    paddingInline: "10%",
                    background:
                      "linear-gradient(90deg, rgba(40,44,52,1) 0%, rgba(40,44,52,1) 20%, rgba(57,63,75,1) 66%, rgba(40,44,52,1) 100%)",
                  }}
                  onClick={() => navigate(`/game?id=${game.id}`)}
                >
                  <div className="d-flex justify-content-between">
                    <div className="my-5 pb-5 d-flex flex-column justify-content-between">
                      <h2>{game.name}</h2>
                      <h5>
                        {game.summary.length > 500
                          ? `${game.summary.slice(0, 500)}...`
                          : game.summary}
                      </h5>
                    </div>
                    <Image
                      style={{ maxWidth: "30%" }}
                      fluid={true}
                      src={game.cover}
                    ></Image>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
};
