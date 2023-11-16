import { TypeAnimation } from "react-type-animation";
import Terminal from "../components/Terminal.tsx";
import { GameEngine, GameState } from "../game/game.tsx";
import { map, mapMobile } from "../game/sprites.tsx";
import { useEffect, useState } from "react";

export function MapIntroView({ game, next }: { game: GameEngine, next: (moveToCity: GameState) => void }) {
  const [showButtons, setShowButtons] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 18_500);
    return () => clearTimeout(timer);
  });
  return (
    <Terminal
      screen={
        <fieldset id="class_choose">
          <legend>Map</legend>
          <div className="hidden sm-hidden md-show lg-show">{map()}</div>
          <div className="hidden lg-hidden sm-show">{mapMobile()}</div>
        </fieldset>
      }
      footer={<>
        {showButtons && <span className="row gap-3">
          <button onClick={() => next("Strut_inn")}>Go to Inn</button>
          <button onClick={() => next("Labuk")}>Visit Labuk</button>
        </span>}
        {!showButtons && <TypeAnimation
          sequence={[
            "It's a World Map...",
            500,
            "You are in the Strut, capital city...",
            500,
            "You need to find witches, remember?...",
            500,
            "This is the only way to get out...",
            500,
            "Go around the Island and ask where they are...",
            500,
            "Choose where to go...",
          ]}
          wrapper="span"
          speed={25}
          omitDeletionAnimation={true}
          repeat={0}
        />}
      </>}
    />
  );
}

export default MapIntroView;
