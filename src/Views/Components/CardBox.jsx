import "./card.css";
import { GameCard } from "./GameCard";

export const CardBox = ({ gameList }) => {
  return (
    <>
      {gameList?.length > 0 &&
        gameList.map((item) => (
          <GameCard
            key={item.id}
            id={item.id}
            cover={item.cover}
            name={item.name}
            summary={item.summary}
          />
        ))}
      {(gameList?.length === 0 || !gameList) && (
        <h3 style={{ textAlign: "center", marginTop: "20%" }}>
          No results found, please check your search term.
        </h3>
      )}
    </>
  );
};
