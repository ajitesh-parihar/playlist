import { Button, Card, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./card.css";

export const GameCard = ({ id, cover, name, summary }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="hover-shadow"
      style={{
        width: "18rem",
        height: "29rem",
        backgroundColor: "#00121a",
        margin: "1rem",
        borderRadius: 10,
        boxShadow: "0 4px 6px 0 rgba(22, 22, 26, 0.38)",
      }}
    >
      {cover && (
        <Card.Img variant="top" src={cover} style={{ height: "21rem" }} />
      )}
      <Card.Body className="d-flex align-items-start flex-row justify-content-between">
        <Card.Title>
          {name.length > 40 ? `${name.slice(0, 40)}...` : name}
        </Card.Title>
        <Button
          variant="primary"
          className="align-self-end"
          onClick={() => navigate(`/game?id=${id}`)}
        >
          Details
        </Button>
        {/* <Card.Text>{summary?.slice(0, 100)}</Card.Text>
        <div className="d-flex h-100 justify-content-end align-items-end bg-danger">
        </div> */}
      </Card.Body>
    </Card>
  );
};
