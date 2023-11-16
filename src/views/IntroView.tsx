import { TypeAnimation } from "react-type-animation";
import Terminal from "../components/Terminal.tsx";
import { Luycki, chip, map, mapMobile } from "../game/sprites.tsx";
import { useState } from "react";

type IntroState = "intro" | "after_back" | "about_island" | "about_Luycki";

export function IntroView({ next }: { next: () => void }) {
  const [introState, setIntroState] = useState("intro" as IntroState);
  return (
    <Terminal
      screen={
        <fieldset id="class_choose" className="col">
          <legend>Intro</legend>
          {(introState === "intro" || introState === "after_back") && <>
            <h2>Chip PIP</h2>
            {chip}
            <div className="col anim-zoomIn gap-3 mt-3">
              <button onClick={() => setIntroState("about_island")}>
                Tell me about Island
              </button>
              <button onClick={() => setIntroState("about_Luycki")}>
                Tell me about Luycki
              </button>
              <hr />
              <button onClick={() => next()}>Choose class</button>
            </div>
          </>}
          {introState === "about_island" && <div className="col align-center anim-zoomIn gap-3 mt-3">
            <div className="hidden sm-hidden md-show lg-show">{map()}</div>
            <div className="hidden lg-hidden sm-show">
                <h2>Witchy Ink Island</h2>
                {mapMobile()}
            </div>
            <button onClick={() => setIntroState("after_back")}>Go back</button>
          </div>}
            {introState === "about_Luycki" && <div className="col align-center anim-zoomIn mt-3">
                <h2 className="m-0">Witch Luycki</h2>
                {Luycki}
                <button className="mt-2" onClick={() => setIntroState("after_back")}>Go back</button>
            </div>}
        </fieldset>
      }
      footer={
        <>
          {introState === "intro" && (
            <TypeAnimation
              sequence={[
                "Wake up! Wake up!...",
                500,
                "Oh finally you are awake...",
                500,
                "Welcome to the Witchy Ink Island...",
                500,
                "It's a dangerous place you know...",
                500,
                "I am PIP, your frienldly Chip...",
                500,
                "Yes i'm located in your brain...",
                500,
                "Luycki, the witch, captured you...",
                500,
                "You were someone important to her...",
                500,
                "This island is ruled by her and 3 other witches...",
                500,
                "They removed your memories...",
                500,
                "But they forgot to disable ME!...",
                500,
                "I'm a regular ClassEnhancer Chip...",
                500,
                "You are lucky to have me...",
                500,
                "Otherwise you would be dead by now...",
                500,
                "But firstly we need to unlock your skills...",
                500,
                "You can choose your class...",
              ]}
              wrapper="span"
              speed={25}
              omitDeletionAnimation={true}
              repeat={0}
            />
          )}
          {introState === "after_back" && (
            <TypeAnimation
              sequence={[
                700,
                "Ask anything or choose class..."
              ]}
              wrapper="span"
              speed={25}
              omitDeletionAnimation={true}
              repeat={0}
            />
          )}
          {introState === "about_island" && (
            <TypeAnimation
              sequence={[
                700,
                "This is Witchy Ink Island...",
                500,
                "This island is ruled by 4 witches...",
                500,
                "They surrounded this Island with a magic field...",
                500,
                "You have only one way to get out...",
                500,
                "...",
                500,
                "Try to kill Witches, then you will rule this Island...",
                500,
                "After taking the leadership, their magic field will be dropped...",
                500,
                "Then you can go, but...",
                800,
                "One does not simply leave this Island...",
              ]}
              wrapper="span"
              speed={25}
              omitDeletionAnimation={true}
              repeat={0}
            />
          )}
          {introState === "about_Luycki" && (
            <TypeAnimation
              sequence={[
                700,
                "This is Witch Luycki...",
                500,
                "She's the Leader of the Coven...",
                500,
                "...",
                500,
                "Coven-sroven...",
                500,
                "I don't like her, she even dropped my memory once...",
                500,
                "But she's the most powerful witch on the Island...",
                500,
                "Find and kill her...",
              ]}
              wrapper="span"
              speed={25}
              omitDeletionAnimation={true}
              repeat={0}
            />
          )}
        </>
      }
    />
  );
}

export default IntroView;
