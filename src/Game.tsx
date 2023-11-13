import {book, guide, labyrinth, playerAttack} from "./components/sprites.tsx";
import {useEffect, useState} from "react";
import {TypeAnimation} from "react-type-animation";
import {Mage, Rogue, Warrior} from "./components/player.tsx";
import {GameEngine} from "./components/game.tsx";
import {Ability} from "./components/skills.tsx";

`
@Game Labirynth
@Author Quak
@Version 1.0.0
@Description
    Game where player goes through the maze and fight enemies in rooms.
    Player can use items and spells to defeat enemies.
    Player can be rouge, warrior or mage.
    Player firstly choose class and then goes through the maze.
    Player can find items and spells in rooms.
    Player after defeating enemy can go to next room.
    First room is always empty.
    Last room is boss room.
    Levels design:
        1. Empty room
        2. Room with item or spell
        3. Room with enemy
        4. Room with enemy and item or spell
        5. Room with boss
    Player firstly enters first room, then can choose between 2 doors.
    If Player defeats enemy in room, he can go to next room, but now Player can choose between 3 doors.
    Next room has 4 doors and so on. 
    After entering room player can't go back.
    Player can use items and spells in fight.  
`

const engine = new GameEngine();

export function Game() {
    const [process, setProcess] = useState<{
        isIntroSpriteShown: boolean,
        isPLayerChosen: boolean,
        currentRoomLevel: number,
        canPlayerAttack: boolean,
        isPlayingPlayerAttackAnim: boolean,
        isPlayingEnemyAttackAnim: boolean,
        currentlyLearnedAbility?: Ability
    }>({
        isIntroSpriteShown: true,
        isPLayerChosen: false,
        currentRoomLevel: 1,
        canPlayerAttack: true,
        isPlayingPlayerAttackAnim: false,
        isPlayingEnemyAttackAnim: false,
        currentlyLearnedAbility: undefined
    });
    useEffect(() => {
        const timeout = setTimeout(() => setProcess({...process, isIntroSpriteShown: false}), 17_500); // after sequence texts
        // selectPlayer(new Warrior());
        return () => clearTimeout(timeout);
    }, []);

    const selectPlayer = (player: Rogue | Warrior | Mage) => {
        engine.chooseClass(player);
        engine.state = "chosen_class";
        setProcess({...process, isPLayerChosen: true});
    }

    const getHTMLCurrentRoomChoose = (onEnterRoom: (room: string) => void) => {
        const {currentLevel, roomsPerLevel} = engine.map.levelMetadata();
        const buttons = [];
        for (let i = 1; i < roomsPerLevel[String(currentLevel)]; i++) {
            const room = `Room ${i}`;
            const roomKey = currentLevel === '1' ? currentLevel : `${currentLevel}_${i - 1}`;
            buttons.push(<button key={room} onClick={() => onEnterRoom(roomKey)}>{room}</button>);
        }
        return (
            <div className="map anim-zoomIn">
                <section className="row gap-3">
                    {buttons}
                </section>
            </div>
        );
    }

    const startAfterIntro = () => {
        engine.state = "choose_room";
        // engine.state = "open_chest";
        setProcess({...process, currentRoomLevel: 1});
    }

    return (
        <main className="game">
            <fieldset id="terminal">
                <legend>Terminal</legend>
                <article id="screen">
                    {engine.state === "choose_class" && !process.isPLayerChosen && <fieldset id="class_choose">
                        <legend>Intro</legend>
                        {process.isIntroSpriteShown && guide}
                        {!process.isIntroSpriteShown && !process.isPLayerChosen && <div className="row anim-zoomIn gap-3">
                            <button onClick={() => selectPlayer(new Mage())}>Mage</button>
                            <button onClick={() => selectPlayer(new Rogue())}>Rogue</button>
                            <button onClick={() => selectPlayer(new Warrior())}>Warrior</button>
                        </div>}
                    </fieldset>}
                    {engine.state === "chosen_class" && <fieldset id="class_choose" className="col gap-3"><legend>Class Summary</legend>
                        {guide}
                        <button onClick={() => startAfterIntro()}>Start</button>
                    </fieldset>}
                    {engine.state === "choose_room" && <fieldset id="class_choose" className="col gap-3">
                        <legend>Choose Room</legend>
                        <small>Current room: {engine.map.currentRoom}</small>
                        {engine.map.getHTMLMap()}<br />
                        {getHTMLCurrentRoomChoose((room) => {
                            engine.move(room);
                            engine.state = "entered_room";
                            setProcess({...process, currentRoomLevel: engine.map.currentRoom.length > 1 ? Number(engine.map.currentRoom.split('_')[0]) : Number(engine.map.currentRoom)});
                        })}
                    </fieldset>}
                    {engine.state === "entered_room" && <fieldset id="class_choose" className="col gap-3 p-3">
                        <legend>Room</legend>
                        <small>Currently visited room: {engine.map.currentRoom}</small>
                        <ul className="flex-row gap-3">
                            {engine.map.getEnemies().map((enemy, index) => <li key={enemy.name + '_' + index}>
                                {enemy.name} ({enemy.health} HP)
                            </li>)}
                        </ul>
                        {labyrinth}
                        {engine.map.isBossRoom && <button onClick={() => {
                            engine.state = "fight_boss";
                        }}>Fight Boss</button>}
                        {!engine.map.isBossRoom && <button onClick={() => {
                            engine.state = "fight";
                            setProcess({...process});
                        }}>Fight</button>}
                    </fieldset>}
                    {engine.state === "fight" && <fieldset id="class_choose" className="col gap-3 p-3">
                        <legend>Room</legend>
                        {process.isPlayingPlayerAttackAnim && <section className="attack-anim-section flex align-center justify-center">
                            <fieldset className="anim-bounceInUp bg-terminal p-3">
                                <legend>Player attack</legend>
                                {playerAttack}
                            </fieldset>
                        </section>}
                        {process.isPlayingEnemyAttackAnim && <section className="attack-anim-section flex align-center justify-center">
                            <fieldset className="anim-bounceInLeft bg-terminal p-3">
                                <legend>Enemy attack</legend>
                                {playerAttack}
                            </fieldset>
                        </section>}

                        <section className="row w-full h-full">
                            <fieldset className={process.isPlayingPlayerAttackAnim ? "w-67 anim-headShake" : "w-67"}>
                                <legend>{engine.fightMetadata?.currentEnemy?.name} 1/{engine.fightMetadata?.levelEnemies?.length}</legend>
                                <small>Health {engine.fightMetadata?.currentEnemy?.health}/{engine.fightMetadata?.currentEnemy?.maxHealth}</small><br />
                                {engine.fightMetadata?.currentEnemy?.sprite}
                            </fieldset>
                            {/*<fieldset id="map" className="w-30">*/}
                            {/*    <legend>Map</legend>*/}
                            {/*    <small>Current room: {engine.map.currentRoom}</small><br />*/}
                            {/*    {engine.map.getHTMLMap()}*/}
                            {/*</fieldset>*/}
                        </section>

                        <section className="row w-full sm-flex-col-reverse sm-align-center">
                            <fieldset className="w-67">
                                <legend>Abilities</legend>
                                <ul className="grid gap-1 w-full">
                                    {engine.player!.abilities.map(ability => <li className="box" key={ability.name}>
                                        <button
                                            onClick={() => {
                                                const killCurrentEnemy = () => {
                                                    engine.killCurrentEnemy();
                                                    setProcess({...process, canPlayerAttack: true});
                                                    if (!engine.fightMetadata.inFight) {
                                                        engine.state = "open_chest";
                                                        setProcess({...process});
                                                    }
                                                }
                                                const playerAttacksResolver = () => {
                                                        return new Promise(resolve => {
                                                            for (let i = 0; i < ability.dmgTimes; i++) {
                                                                const timeout = setTimeout(() => {
                                                                    if (engine.fightMetadata.currentEnemy) {
                                                                        const noCost = i !== 0;
                                                                        engine.player!.attack(engine.fightMetadata.currentEnemy, ability, noCost);
                                                                        setProcess({
                                                                            ...process,
                                                                            canPlayerAttack: false,
                                                                            isPlayingPlayerAttackAnim: true
                                                                        });
                                                                        const timeout2 = setTimeout(() => {
                                                                            setProcess({
                                                                                ...process,
                                                                                isPlayingPlayerAttackAnim: false
                                                                            });
                                                                            resolve(true);
                                                                            clearTimeout(timeout2);
                                                                        }, 500 * i + 500);
                                                                    }
                                                                    clearTimeout(timeout);
                                                                }, 500 * i);
                                                            }
                                                        })
                                                    }

                                                if (process.canPlayerAttack) {
                                                    setProcess({...process, canPlayerAttack: false});
                                                    if (engine.fightMetadata.currentEnemy?.isAlive) {
                                                        playerAttacksResolver().then(() => {
                                                            if (engine.fightMetadata.currentEnemy!.isAlive) {
                                                                setProcess({...process, isPlayingEnemyAttackAnim: true});
                                                                const timeout = setTimeout(() => {
                                                                    if (engine.fightMetadata.currentEnemy) {
                                                                        engine.fightMetadata.currentEnemy.attack(engine.player!);
                                                                        if (engine.player!.health <= 0) {
                                                                            const timeoutLostGame = setTimeout(() => {
                                                                                engine.state = "lost";
                                                                                setProcess({...process});
                                                                                clearTimeout(timeoutLostGame);
                                                                            }, 1000);
                                                                        }
                                                                        const timeout2 = setTimeout(() => {
                                                                            setProcess({...process, isPlayingEnemyAttackAnim: false, canPlayerAttack: true});
                                                                            clearTimeout(timeout2);
                                                                        }, 1000);
                                                                    }
                                                                    clearTimeout(timeout);
                                                                }, 0);
                                                            } else {
                                                                killCurrentEnemy();
                                                            }
                                                        });
                                                    } else {
                                                        killCurrentEnemy();
                                                    }
                                                }
                                            }}
                                            disabled={!ability.active || !engine.fightMetadata.currentEnemy || !engine.player || !process.canPlayerAttack || process.isPlayingPlayerAttackAnim || process.isPlayingEnemyAttackAnim}
                                            className="tooltip wrap-none transform-scale-07"
                                        >
                                            {ability.name}
                                            <span className="tooltiptext">dmg: {ability.damage}, cost: {ability.cost}, {ability.description}</span>
                                        </button>
                                    </li>)}
                                </ul>
                            </fieldset>
                            <fieldset  className={process.isPlayingEnemyAttackAnim ? "w-30 anim-headShake" : "w-30"}>
                                <legend>Player</legend>
                                <small>Health {engine.player!.health}</small><br />
                                <progress value={engine.player!.health} max={100} /><br />
                                {engine.player!.name === "Mage" && <><small>Mana {engine.player! instanceof Mage ? engine.player!.mana : 100}/{engine.player! instanceof Mage ? engine.player!.maxMana : 100}</small><br /><span className="mana"><progress value={engine.player! instanceof Mage ? engine.player!.mana : 100} max={engine.player! instanceof Mage ? engine.player!.maxMana : 100} /></span></>}
                                {engine.player!.name === "Rogue" && <><small>Energy {engine.player! instanceof Rogue ? engine.player!.energy : 100}/{engine.player! instanceof Rogue ? engine.player!.maxEnergy : 100}</small><br /><span className="energy"><progress value={engine.player! instanceof Rogue ? engine.player!.energy : 100} max={engine.player! instanceof Rogue ? engine.player!.maxEnergy : 100} /></span></>}
                                {engine.player!.name === "Warrior" && <><small>Rage {engine.player! instanceof Warrior ? engine.player!.rage : 100}/{engine.player! instanceof Warrior ? engine.player!.maxRage : 100}</small><br /><span className="rage"><progress value={engine.player! instanceof Warrior ? engine.player!.rage : 100} max={engine.player! instanceof Warrior ? engine.player!.maxRage : 100} /></span></>}
                            </fieldset>
                        </section>

                        <section className="row w-full">
                            <fieldset className="w-97">
                                <legend>Inventory</legend>
                                <ul className="flex-row justify-center gap-3 overflow-x-auto w-full">
                                    {engine.player!.inventory.items.map(item => <li key={item.name}>
                                        <button className="wrap-none" onClick={() => {
                                            engine.state = "learn_ability";
                                            engine.player!.learnAbility(item as Ability);
                                            engine.player!.inventory.removeItem(item);
                                            setProcess({...process, currentlyLearnedAbility: item as Ability});
                                        }}>Learn {item.name}</button>
                                    </li>)}
                                    {engine.player!.inventory.items.length === 0 && <button disabled={true}>Empty</button> }
                                </ul>
                            </fieldset>
                        </section>
                    </fieldset>}
                    {engine.state === "open_chest" && <fieldset id="class_choose" className="col gap-3"><legend>Loot</legend>
                        {labyrinth}
                        <h2 className="mb-0">Loot</h2>
                        {engine.map.getAbilities().filter(a => a.className === engine.player!.name).map(ability => <p className="mt-0 mb-0" key={ability.name}>{ability.name}</p>)}
                        <button className="mb-0 mt-0" onClick={() => {
                            engine.map
                                .getAbilities()
                                .filter(a => a.className === engine.player!.name)
                                .forEach(ability => engine.player!.inventory.addItem(ability));
                            engine.player!.refresh();
                            engine.state = "choose_room";
                            setProcess({...process});
                        }}>Loot and move</button>
                    </fieldset>}
                    {engine.state === "lost" && <fieldset id="class_choose" className="col gap-3"><legend>Lose</legend>
                        {playerAttack}
                        <h2>You Lost!</h2>
                        Congratulations to die in this game. You are not good enough to win this game. Try again.
                        <button onClick={() => window.location.reload()}>Start again</button>
                    </fieldset>}
                    {engine.state === "learn_ability" && <fieldset id="class_choose" className="col gap-3"><legend>Learn</legend>
                        <span className="anim-zoomIn">{book}</span>
                        <h2>Learn</h2>
                        Congratulations, you have learned {process.currentlyLearnedAbility?.name}!
                        <button onClick={() => {
                            engine.state = "fight";
                            setProcess({...process, currentlyLearnedAbility: undefined});
                        }}>Back to fight</button>
                    </fieldset>}

                </article>
                <footer>
                    $&nbsp;{engine.state === "choose_class" && <TypeAnimation
                      sequence={[
                        'Welcome to the Labyrinth...',
                        500,
                        'You have been captured and prisoned in this maze...',
                        500,
                        'Conquer enemies to find the exit...',
                        500,
                        'Choose your class...',
                        500
                      ]}
                      wrapper="span"
                      speed={25}
                      repeat={0}
                    />}
                    {engine.state === "chosen_class" && <TypeAnimation
                        sequence={[
                            `You have chosen ${engine.player!.name}...`,
                            500,
                            'Now you can start your adventure...',
                            500
                        ]}
                        wrapper="span"
                        speed={25}
                        repeat={0}
                    />}
                    {engine.state === "choose_room" && <TypeAnimation
                        sequence={[
                            `They know you are here, be quick...`,
                            500,
                            `Choose room to enter...`
                        ]}
                        wrapper="span"
                        speed={25}
                        repeat={0}
                    />}
                    {engine.state === "entered_room" && <TypeAnimation
                        sequence={[
                            `You have entered room ${engine.map.currentRoom}...`,
                            500,
                            `You encountered ${engine.fightMetadata.levelEnemies.length} ${engine.fightMetadata.levelEnemies.length === 1 ? "enemy" : "enemies"}...`,
                            500,
                            `Click Fight to start the fight...`
                        ]}
                        wrapper="span"
                        speed={25}
                        repeat={0}
                    />}
                    {engine.state === "open_chest" && <TypeAnimation
                        sequence={[
                            `Loot what you have found...`,
                        ]}
                        wrapper="span"
                        speed={25}
                        repeat={0}
                    />}
                    {engine.state === "fight" && <TypeAnimation
                        sequence={[
                            500,
                            `Click ability to use it...`,
                        ]}
                        wrapper="span"
                        speed={25}
                        repeat={0}
                    />}
                </footer>
            </fieldset>
        </main>
    );
}

export default Game;
