import { useState } from "react";
import { GameEngine, GameState } from "./game/game.tsx";
import { Mage, Rogue, Warrior } from "./game/entity.tsx";
import * as views from "./views";

const engine = new GameEngine();
export function Game() {
  const [state, setState] = useState("intro" as GameState);
  const [game, _] = useState(engine);
  const onPlayerSelected = (player: Mage | Rogue | Warrior) => {
    game.chooseClass(player);
    setState("chosen_class");
  };
  const view = {
    intro: <>{game.board.getHTML(game.map)}</>,
    choose_class: <views.ChooseClassView playerSelected={onPlayerSelected} />,
    chosen_class: <views.ChosenClassView />,
    choose_room: <></>,
    entered_room: <></>,
    fight: <></>,
    fight_boss: <></>,
    open_chest: <></>,
    learn_ability: <></>,
    won: <></>,
    lost: <></>,
  };
  return view[state];
}

export default Game;
