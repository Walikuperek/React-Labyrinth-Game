import { useState } from "react";
import { GameEngine, GameState } from "./game/game.tsx";
import { Duck, Mage, Rogue, Warrior } from "./game/entity.tsx";
import * as views from "./views";

const engine = new GameEngine();
export function Game() {
  const [state, setState] = useState("intro" as GameState);
  const [game, _] = useState(engine);
  const onPlayerSelected = (player: Mage | Rogue | Warrior | Duck) => {
    game.chooseClass(player);
    setState("chosen_class");
  };
  const view = {
    // Intro
    intro: <views.IntroView next={() => setState("choose_class")} />,
    choose_class: <views.ChooseClassView back={() => setState("intro")} playerSelected={onPlayerSelected} />,
    chosen_class: <views.ChosenClassView chosenClass={game.player.name} next={() => setState("world_map_intro")} />,
    choose_room: <views.MapView game={game} />,
    world_map_intro: <views.MapIntroView game={game} next={(moveToCity: GameState) => setState(moveToCity)} />,
    // Cities
    Strut_inn: <>Put nice anim here, Visited Strut Inn</>,
    Labuk: <>Visited Labuk City</>,    
    visited: <views.MapView game={game} />,
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
