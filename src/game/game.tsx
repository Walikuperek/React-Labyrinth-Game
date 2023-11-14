import { Mage, Rogue, Warrior } from "./entity";

const mapElements = ["B", "S", "#"];
enum ToPlace {
    FLOOR = "#",
    BAT = "B",
    SKELETON = "S",
}

type BoardOpts = { width: number, height: number };

export class GameBoard {
    opts: BoardOpts;

    constructor(opts: BoardOpts = {width: 9, height: 9}) {
        this.opts = opts;
    }

    generate() {
        const map = [];
        for (let x = 0; x < this.opts.width; x++) {
            const yRows = [];
            for (let y = 0; y < this.opts.height; y++) {
                const floor = "‧";
                yRows.push(floor);
            }
            map.push(yRows);
        }
        return map;
    }

    getHTML(rows?: string[][]) {
        const _rows = rows ? rows : this.generate();
        return _rows.map((xRow, x) => 
            <span key={x}>
                {xRow.map((_, y) => <button disabled key={y}>{_rows[x][y]}</button>)}<br />
            </span>)
    }
}

export type GameState = "intro" | "choose_class" | "chosen_class" | "choose_room" | "entered_room" | "fight" | "fight_boss" | "open_chest" | "learn_ability" | "won" | "lost";

export class GameEngine {
    player: Mage | Rogue | Warrior | null = null;
    state: GameState = "intro";
    board = new GameBoard();
    map = this.board.generate();

    chooseClass(player: Mage | Rogue | Warrior) {
        this.player = player;
        this.state = "chosen_class";
    }
}
