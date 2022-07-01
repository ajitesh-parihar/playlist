import { Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";

export const Footer = () => {
  return (
    <footer className="mt-auto bg-dark">
      <Container
        className="d-flex justify-content-between align-items-end"
        style={{ height: "5em" }}
      >
        <Row>
          <p style={{ fontSize: "10px" }}>
            <b>Disclaimer: </b>All games, artworks, and covers belong to their
            respective owners
          </p>
        </Row>
        <Row>
          <h6>©2022</h6>
        </Row>
      </Container>
    </footer>
  );
};
