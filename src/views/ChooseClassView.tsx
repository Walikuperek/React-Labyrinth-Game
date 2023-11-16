import { TypeAnimation } from "react-type-animation";
import Terminal from "../components/Terminal.tsx";
import { Duck, Mage, Rogue, Warrior } from "../game/entity.tsx";


export function ChooseClassView({back, playerSelected}: { back: () => void; playerSelected: (player: Mage | Rogue | Warrior | Duck) => void}) {
    return (
        <Terminal
            screen={<fieldset id="class_choose" className="col">
                <legend>Class</legend>
                <div className="col anim-zoomIn gap-3 mt-3">
                    <h3>Choose your class</h3>
                    <button onClick={() => playerSelected(new Mage())}>Mage</button>
                    <button onClick={() => playerSelected(new Rogue())}>Rogue</button>
                    <button onClick={() => playerSelected(new Warrior())}>Warrior</button>
                    <hr />
                    <button onClick={() => back()}>Go back</button>
                    {/* <button onClick={() => playerSelected(new Duck())}>Duck</button> */}
                </div>
            </fieldset>}
            footer={<TypeAnimation
                sequence={[
                  'Choose your class...',
                  500,
                  'It\'ll change how we gonna kick their asses...',
                  2500,
                  'C\'mon B****, choose your class...'
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
