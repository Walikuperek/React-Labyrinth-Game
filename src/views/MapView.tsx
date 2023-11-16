import { TypeAnimation } from "react-type-animation";
import Terminal from "../components/Terminal.tsx";
import { GameEngine } from "../game/game.tsx";
import { map, mapMobile } from "../game/sprites.tsx";

export function MapView({ game, next }: { game: GameEngine, next?: () => void }) {
  return (
    <Terminal
      screen={
        <fieldset id="class_choose">
          <legend>Map</legend>
          {/* {game.board.getHTML(game.map, game.player)} */}
          <div className="hidden md-show">{map()}</div>
          <div className="hidden sm-show">{mapMobile()}</div>
        </fieldset>
      }
      footer={
        <TypeAnimation
          sequence={[
            "It's a World Map...",
            500,
            "Click where you would like to go...",
            5000,
            "Go and try to kill the boss...",
            500,
            "This is the only way to get out...",
            500,
            "Good luck...",
            500,
            "Click on the map...",
          ]}
          wrapper="span"
          speed={25}
          omitDeletionAnimation={true}
          repeat={0}
        />
      }
    />
  );
}

export default MapView;
