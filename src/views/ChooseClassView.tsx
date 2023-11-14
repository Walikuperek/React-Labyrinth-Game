import { TypeAnimation } from "react-type-animation";
import Terminal from "../components/Terminal.tsx";
import { Mage, Rogue, Warrior } from "../game/entity.tsx";
import { chip } from "../game/sprites.tsx";


export function ChooseClassView({playerSelected}: { playerSelected: (player: Mage | Rogue | Warrior) => void}) {
    return (
        <Terminal
            screen={<fieldset id="class_choose" className="col">
                <legend>Intro</legend>
                {chip}
                <div className="row anim-zoomIn gap-3 mt-3">
                    <button onClick={() => playerSelected(new Mage())}>Mage</button>
                    <button onClick={() => playerSelected(new Rogue())}>Rogue</button>
                    <button onClick={() => playerSelected(new Warrior())}>Warrior</button>
                </div>
            </fieldset>}
            footer={<TypeAnimation
                sequence={[
                  'Welcome to the Labyrinth...',
                  500,
                  'It\'s a dangerous place...',
                  500,
                  'I am PIP, your frienldly Chip...',
                  500,
                  'Yes i\'m located in your brain...',
                  500,
                  'You have been captured and prisoned in this maze...',
                  500,
                  'Someone removed your memory...',
                  500,
                  'Try to find the exit, I will help you...',
                  500,
                  'We need to unlock skills...',
                  500,
                  'You can choose your class...'
                ]}
                wrapper="span"
                speed={25}
                omitDeletionAnimation={true}
                repeat={0}
              />}
        />
    );
}

export default ChooseClassView;
