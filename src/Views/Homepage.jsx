import { useState } from "react";
import { Button, Alert, Row, Container, Col } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

export const Homepage = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-100 vh-100">
      <Container>
        <Row className="align-items-center d-flex">
          <h1>Playlist</h1>
          <h6>Find all the deets of games in one place!</h6>
        </Row>
      </Container>
      <Container className="h-75 d-flex align-items-center justify-content-center">
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
      </Container>
    </div>
  );
};
