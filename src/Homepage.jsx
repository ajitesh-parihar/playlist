import { useState } from "react";
import { Button, Alert, Row, Container, Col } from "react-bootstrap";
import { searchGames } from "./api/igdb";

export const Homepage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="w-100 vh-100">
      <Container>
        <Row className="align-items-center d-flex">
          <h1>Playlist</h1>
          <h6>Get all the deets of you games in one place!</h6>
        </Row>
      </Container>
      <Container className="h-75 d-flex align-items-center justify-content-center">
        <Row className="w-100">
          <Col className="col-10">
            <div class="active-cyan-4 mb-4">
              <input
                class="form-control"
                type="text"
                placeholder="Search for a game..."
                aria-label="Search"
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    searchGames(searchInput);
                  }
                }}
              />
            </div>
          </Col>
          <Col>
            <Button
              onClick={() => {
                searchGames(searchInput);
              }}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
