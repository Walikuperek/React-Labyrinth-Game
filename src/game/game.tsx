import { Duck, Mage, Rogue, Warrior } from "./entity";

enum ToPlace {
    PLAYER = "P",
    DUCK = "D",
    ENEMY = "E",
    GRAVEYARD = "^",
    WALL = "W",
    WATER = "≈",
    HOLE = "O",
    FLOOR = "#",
    BAT = "B",
    SKELETON = "S",
    GHOST = "G",
    CHEST = "C",
    VAMPIRE = "V",
    BOSS = "M",
    BOSS2 = "@",
}
const toPlaceCounters = {
    [ToPlace.ENEMY]: 7,
    [ToPlace.CHEST]: 5,
    [ToPlace.HOLE]: 2
}
const elements = {
    [ToPlace.PLAYER]: "🧙",
    [ToPlace.DUCK]: "🦆",
    [ToPlace.WALL]: "🧱",
    [ToPlace.WATER]: "🌊",
    [ToPlace.HOLE]: "🕳️",
    [ToPlace.FLOOR]: "‧",
    [ToPlace.BAT]: "🦇",
    // [ToPlace.ANGEL]: "👼🏿",
    [ToPlace.SKELETON]: "💀",
    [ToPlace.ENEMY]: "💀",
    [ToPlace.GHOST]: "👻",
    [ToPlace.CHEST]: "📦",
    [ToPlace.BOSS2]: "👹",
    [ToPlace.BOSS]: "🏴‍☠️",
}

type BoardOpts = { width: number, height: number };

export class GameBoard {
    opts: BoardOpts;

    constructor(opts: BoardOpts = {width: 5, height: 5}) {
        this.opts = opts;
    }

    generate() {
        const map = [];
        let isStoppedPutting = false;
        for (let x = 0; x < this.opts.width; x++) {
            const yRows = [];
            for (let y = 0; y < this.opts.height; y++) {
                // remove top right and bottom left corners
                if (x === 0 && y === this.opts.height - 1) {
                    yRows.push(elements[ToPlace.WALL]);
                    continue;
                }
                if (x === this.opts.width - 1 && y === 0) {
                    yRows.push(elements[ToPlace.WALL]);
                    continue;
                }
                if (x === 0 && y === 0) {
                    yRows.push(elements[ToPlace.PLAYER]);
                    continue;
                }
                if (x === this.opts.width - 1 && y === this.opts.height - 1) {
                    yRows.push(elements[ToPlace.BOSS]);
                    continue;
                }
                const emptyFloor = "‧";
                if (isStoppedPutting) {
                    isStoppedPutting = false;
                    yRows.push(emptyFloor);
                    continue;
                }
                const randomElement = () => {
                    const keys = Object.keys(toPlaceCounters);
                    const randomKey = keys[Math.floor(Math.random() * keys.length)] as ToPlace;
                    if (toPlaceCounters[randomKey] > 0) {
                        toPlaceCounters[randomKey]--;
                        if (toPlaceCounters[randomKey] === 0) delete toPlaceCounters[randomKey];
                        return elements[randomKey];
                    }
                    return emptyFloor;
                }
                yRows.push(randomElement());
                isStoppedPutting = Math.random() > 0.5 ? true : false;
            }
            map.push(yRows);
        }
        return map;
    }

    getHTML(rows: string[][] = [], player: Mage | Rogue | Warrior | Duck = new Duck()) {
        const _rows = rows ? rows : this.generate();
        const getButton = (x: number, y: number) => {
            const valueWithHP = <div className="col">
                {_rows[x][y]}
                <span className="text-6">{`${Math.ceil(Math.random() * 1000)} HP`}</span>
            </div>;
            const value = _rows[x][y];
            switch (value) {
                case elements[ToPlace.PLAYER]:
                    return <button className="map-button" key={y} style={{backgroundColor: "#535bf2"}}>{
                        player ? player.getSprite() : value
                    }</button>;
                case elements[ToPlace.FLOOR]:
                    return <button className="map-button" disabled key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
                case elements[ToPlace.BAT]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
                case elements[ToPlace.ENEMY]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{valueWithHP}</button>;
                case elements[ToPlace.GHOST]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
                case elements[ToPlace.CHEST]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
                case elements[ToPlace.BOSS]:
                    return <button className="map-button" key={y} style={{backgroundColor: "white"}}>{value}</button>;
                case elements[ToPlace.WALL]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
                case elements[ToPlace.WATER]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
                case elements[ToPlace.HOLE]:
                    return <button className="map-button" key={y} style={{backgroundColor: "transparent"}}>{value}</button>;
            }
            return <button className="map-button" style={{backgroundColor: "transparent"}} key={y}>{value}</button>;
        }
        return <div className="col">{_rows.map((xRow, x) => 
            <div key={x} className="row">
                {xRow.map((_, y) => getButton(x, y))}<br />
            </div>)}</div>;
    }
}

export type GameState = 
    | "intro"
    | "world_map_intro"
    | "choose_class"
    | "chosen_class"
    | "Labuk"
    | "Strut_inn"
    | "visited"
    | "choose_room"
    | "entered_room"
    | "fight"
    | "fight_boss"
    | "open_chest"
    | "learn_ability"
    | "won"
    | "lost";

export class GameEngine {
    player: Mage | Rogue | Warrior | Duck = new Duck();
    state: GameState = "intro";
    board = new GameBoard();
    map = this.board.generate();

    chooseClass(player: Mage | Rogue | Warrior | Duck) {
        this.player = player;
        this.state = "chosen_class";
    }
}
