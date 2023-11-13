import {useState} from "react"
import "./App.css"
import Menu from "./Menu.tsx";
import Game from "./Game.tsx";

function App() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const audio = new Audio("./80s_vibe.mp3");
    return (
        <div className="col align-center justify-center w-full">
            {!isPlaying && <Menu onPlayClicked={() => {
                setIsPlaying(true);
                audio.volume = 0.1;
                audio.muted = muted;
                audio.loop = true;
                audio.play();
            }}/>}
            {!isPlaying && <section className="row gap-3 mt-2 transition-05">
                <button
                    className="transform-scale-07"
                    onClick={() => {
                        setMuted(!muted);
                    }}
                    data-playing={muted}
                    role="switch"
                    aria-checked={muted}
                >
                    {muted ? "🔊 Turn ON music" : "🔇 Turn OFF music"} in game<br />
                    <small>(music by <a target="_blank" href="https://www.foolboymedia.co.uk/">FoolBoyMedia</a>)</small>
                </button>
            </section>}
            {isPlaying && <Game/>}
        </div>
    );
}

export default App;
