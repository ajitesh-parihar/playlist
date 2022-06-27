import { useEffect, useState } from "react";
import { Button, Alert, Row, Container, Col, Card } from "react-bootstrap";
import { getCover, searchGames } from "../Controllers/igdb";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { GameCard } from "./Components/GameCard";

export const SearchPage = () => {
  const coverUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big/";

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchInput, setSearchInput] = useState(query);
  const [gameList, setGameList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  // useEffect(() => {
  //   (async () => {
  //     const response = await searchGames(query);
  //     response.map((item) => {
  //       getCover(item.id).then((data) => {
  //         setGameList((old) => [
  //           ...old,
  //           {
  //             id: item.id,
  //             name: item.name,
  //             summary: item.summary,
  //             cover: `${coverUrl}${data}`,
  //           },
  //         ]);
  //       });
  //       // console.log("not over yet");
  //     });
  //     // console.log(list);
  //     // setGameList(list);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      setGameList([]);
      const response = await searchGames(searchInput);
      response.map((item) => {
        getCover(item.id).then((data) => {
          setGameList((old) => [
            ...old,
            {
              id: item.id,
              name: item.name,
              summary: item.summary,
              cover: `${coverUrl}${data}`,
            },
          ]);
        });
        // console.log("not over yet");
      });
      // console.log(list);
      // setGameList(list);
    })();
  }, [searchQuery]);

  useEffect(() => {
    setSearchInput(query);
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
                setSearchQuery(searchInput);
                navigate(`/search?q=${searchInput}`);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row className="align-items-center d-flex">
          {gameList.length > 0 &&
            gameList.map((item) => (
              <GameCard
                key={item.id}
                cover={item.cover}
                name={item.name}
                summary={item.summary}
              />
            ))}
          {/* <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={gameList?.at(0)?.cover} />
            <Card.Body>
              <Card.Title>{gameList?.at(0)?.name}</Card.Title>
              <Card.Text>{gameList?.at(0)?.summary}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card> */}
        </Row>
      </Container>
    </div>
  );
};
