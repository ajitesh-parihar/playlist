import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCover, searchGames } from "../Controllers/igdb";
import { CardBox } from "./Components/CardBox";
import { Footer } from "./Components/Footer";
import { GameCard } from "./Components/GameCard";
import { Header } from "./Components/Header";
import { genres } from "../Helpers/enumerators";

export const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchName = searchParams.get("q");
  const genre = searchParams.get("genre");
  const [searchQuery, setSearchQuery] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    (async () => {
      if (!searchQuery) return;
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
    setSearchInput(`${searchName ? searchName : ""}`);
    setSearchQuery({
      searchName,
      genre,
    });
  }, [genre, searchName]);

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
                    if (searchInput === searchQuery.searchName) return;
                    if (searchInput.length === 0) return;
                    navigate(
                      `/search?q=${searchInput}&${
                        searchQuery.genre && `genre=${searchQuery.genre}`
                      }`
                    );
                  }
                }}
              />
            </div>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (searchInput === searchQuery.searchName) return;
                if (searchInput.length === 0) return;
                navigate(
                  `/search?q=${searchInput}&${
                    searchQuery.genre && `genre=${searchQuery.genre}`
                  }`
                );
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
        <Row>
          {searchQuery?.genre && (
            <h3>{`${
              genres.find((item) => item.id == searchQuery.genre).name
            } games:`}</h3>
          )}
        </Row>
        <Row className="align-items-center d-flex">
          <CardBox gameList={gameList} />
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
