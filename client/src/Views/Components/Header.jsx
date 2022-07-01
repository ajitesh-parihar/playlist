import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { genres } from "../../Helpers/enumerators";

export const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Container>
        <Navbar.Brand href="/">PlayList</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Recommended Games</Nav.Link> */}
            <Nav.Link href="/top100">Top 100</Nav.Link>
            <Nav.Link href="/upcoming">Upcoming Games</Nav.Link>
            <NavDropdown
              title="Genres"
              id="collasible-nav-dropdown"
              menuVariant="dark"
            >
              {genres.map((item) => (
                <NavDropdown.Item
                  href={`/search?genre=${item.id}`}
                  key={item.id}
                >
                  {item.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>Find your all favorite games in one place!</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
