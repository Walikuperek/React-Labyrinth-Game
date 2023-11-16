import { TypeAnimation } from "react-type-animation";
import Terminal from "../components/Terminal.tsx";
import { labyrinth, chip } from "../game/sprites.tsx";

export function ChosenClassView({next, chosenClass}: {next: () => void, chosenClass: string}) {
    return (
        <Terminal
            screen={<fieldset id="class_choose" className="col">
                <legend>Chosen class</legend>
                {chip}
                <em>Chip: "{chosenClass} I choose you!"</em>
                <button onClick={next} className="mt-3">Go to the world map</button>
            </fieldset>}
            footer={<TypeAnimation
                
                sequence={[
                    `You have chosen the ${chosenClass} class...`,
                    500,
                    "You are ready to go...",
                    500,
                    "Go to the World Map...",
                ]}
                wrapper="span"
                speed={25}
                omitDeletionAnimation={true}
                repeat={0}
            />}
        />
    );
}

export default ChosenClassView;
