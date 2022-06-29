import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCover, searchGames } from "../Controllers/igdb";
import { CardBox } from "./Components/CardBox";
import { GameCard } from "./Components/GameCard";

export const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchInput, setSearchInput] = useState(query);
  const [gameList, setGameList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    (async () => {
      setGameList([]);
      const response = await searchGames(searchQuery);
      console.log(response);
      setGameList(response);
      // response.forEach((item) => {
      //   getCover(item.id).then((data) => {
      //     setGameList((old) => [
      //       ...old,
      //       {
      //         id: item.id,
      //         name: item.name,
      //         summary: item.summary,
      //         cover: `${coverUrl}${data}`,
      //       },
      //     ]);
      //   });
      // });
    })();
  }, [searchQuery]);

  useEffect(() => {
    setGameList([]);
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
        <Row className="align-items-center d-flex">
          <CardBox gameList={gameList} />
        </Row>
      </Container>
    </div>
  );
};
