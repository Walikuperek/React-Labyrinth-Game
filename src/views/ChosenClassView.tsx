import Terminal from "../components/Terminal.tsx";
import { chip } from "../game/sprites.tsx";

export function ChosenClassView() {
    return (
        <Terminal
            screen={<fieldset id="class_choose">
                <legend>Chosen class</legend>
                {chip}
            </fieldset>}
            footer={<>
                <button>Mage</button>
                <button>Rogue</button>
                <button>Warrior</button>
            </>}
        />
    );
}

export default ChosenClassView;
