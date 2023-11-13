import {Bat, Enemy, Skeleton} from "./enemy.tsx";
import {Item} from "./equipment.tsx";
import {
    Ability,
    AssassinationSkill, BlackHoleSpell,
    DoubleStrikeSkill,
    FireballSpell,
    PowerStrikeSkill,
    RainOfDaggersSkill
} from "./skills.tsx";
import {Mage, Rogue, Warrior} from "./player.tsx";

export class Room {
    private readonly enemies: Enemy[];
    private readonly items: Item[];
    private readonly abilities: Ability[];

    constructor(enemies: Enemy[] = [], items: Item[] = [], spells: Ability[] = []) {
        this.enemies = enemies;
        this.items = items;
        this.abilities = spells;
    }

    hasEnemies() {
        return this.enemies.length > 0;
    }

    hasItems() {
        return this.items.length > 0;
    }

    hasAbilities() {
        return this.abilities.length > 0;
    }

    getContent(): [Enemy[], Item[], Ability[]] {
        return [this.enemies, this.items, this.abilities];
    }

    removeEnemy(enemy: Enemy) {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
    }

    removeItem(item: Item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    removeAbility(ability: Ability) {
        this.abilities.splice(this.abilities.indexOf(ability), 1);
    }
}

/**
 * Rooms:
 * 1(Start)
 * 2_0 2_1
 * 3_0 3_1 3_2
 * 4_0 4_1 4_2 4_3
 * 5(Boss)
 */
export class GameMap {
    rooms = new Map<string, Room>();
    visitedRooms = new Set<string>();
    currentLevel = 1;
    currentRoom = '1';
    private _isBossRoom = false;

    constructor() {
        this.rooms
            .set('1', new Room([new Bat()], [], [new DoubleStrikeSkill(), new RainOfDaggersSkill(), new FireballSpell()]))
            .set('2_0', new Room([new Skeleton()], [], [new AssassinationSkill, new PowerStrikeSkill(), new BlackHoleSpell()]))
            .set('2_1', new Room([new Skeleton(), new Skeleton()], [], [new AssassinationSkill(), new PowerStrikeSkill(), new BlackHoleSpell()]))
            .set('3_0', new Room([new Skeleton(), new Skeleton()], [], [new DoubleStrikeSkill(), new RainOfDaggersSkill(), new FireballSpell()]))
            .set('3_1', new Room([new Skeleton(), new Skeleton()], [], [new DoubleStrikeSkill(), new RainOfDaggersSkill(), new FireballSpell()]))
            .set('3_2', new Room([new Skeleton(), new Skeleton()], [], [new DoubleStrikeSkill(), new RainOfDaggersSkill(), new FireballSpell()]))
            .set('4_0', new Room([new Skeleton(), new Skeleton()], [], [new AssassinationSkill, new PowerStrikeSkill(), new BlackHoleSpell()]))
            .set('4_1', new Room([new Skeleton(), new Skeleton()], [], [new AssassinationSkill, new PowerStrikeSkill(), new BlackHoleSpell()]))
            .set('4_2', new Room([new Skeleton(), new Skeleton()], [], [new AssassinationSkill, new PowerStrikeSkill(), new BlackHoleSpell()]))
            .set('4_3', new Room([new Skeleton(), new Skeleton()], [], [new AssassinationSkill, new PowerStrikeSkill(), new BlackHoleSpell()]))
            .set('5', new Room([new Skeleton(), new Skeleton()], [], []));
    }

    get isBossRoom() {
        return this._isBossRoom;
    }

    private set isBossRoom(isBossRoom: boolean) {
        this._isBossRoom = isBossRoom;
    }

    enterRoom(room: string) {
        const enteredRoom = this.rooms.get(room);
        if (enteredRoom === undefined) {
            throw new Error('Room does not exist');
        }
        if (room === '5') {
            this.isBossRoom = true;
        }
        this.visitedRooms.add(room);
        this.currentRoom = room;
        return enteredRoom;
    }

    moveToNextLevel() {
        this.currentLevel++;
    }

    getEnemies() {
        const enemies = this.rooms.get(this.currentRoom)?.getContent()[0] || [];
        return enemies;
    }

    getItems() {
        return this.rooms.get(this.currentRoom)?.getContent()[1] || [];
    }

    getAbilities() {
        return this.rooms.get(this.currentRoom)?.getContent()[2] || [];
    }

    getHTMLMap() {
        return (
            <div className="map anim-zoomIn">
                <section className="row">
                    <section className="room">{this.visitedRooms.has('5') ? '[BOSS: X]' : '[BOSS]'}</section>
                </section>
                <section className="row">
                    <section className="room">{this.visitedRooms.has('4_0') ? '[X]' : '[ ]'}</section>
                    <section className="room">{this.visitedRooms.has('4_1') ? '[X]' : '[ ]'}</section>
                    <section className="room">{this.visitedRooms.has('4_2') ? '[X]' : '[ ]'}</section>
                    <section className="room">{this.visitedRooms.has('4_3') ? '[X]' : '[ ]'}</section>
                </section>
                <section className="row">
                    <section className="room">{this.visitedRooms.has('3_0') ? '[X]' : '[ ]'}</section>
                    <section className="room">{this.visitedRooms.has('3_1') ? '[X]' : '[ ]'}</section>
                    <section className="room">{this.visitedRooms.has('3_2') ? '[X]' : '[ ]'}</section>
                </section>
                <section className="row">
                    <section className="room">{this.visitedRooms.has('2_0') ? '[X]' : '[ ]'}</section>
                    <section className="room">{this.visitedRooms.has('2_1') ? '[X]' : '[ ]'}</section>
                </section>
                <section className="row">
                    <section className="room">{this.visitedRooms.has('1') ? '[X]' : '[ ]'}</section>
                </section>
            </div>
        );
    }

    levelMetadata(currentLevel?: string) {
        const roomsPerLevel: Record<string, number> = {
            '1': 2,
            '2': 3,
            '3': 4,
            '4': 1
        };
        if (!currentLevel) {
            return {currentLevel: String(this.currentLevel), roomsPerLevel};
        }
        return {currentLevel, roomsPerLevel};
    }
}

// Can be state machine pattern used here, but I think it's not necessary in this case
type GameState = "choose_class" | "chosen_class" | "choose_room" | "entered_room" | "fight" | "fight_boss" | "open_chest" | "learn_ability" | "won" | "lost";
export class GameEngine {
    player: Mage | Rogue | Warrior | null = null;
    map: GameMap;
    isFinished: boolean;
    state: GameState = "choose_class";
    fightMetadata: { inFight: boolean, currentEnemy: Enemy | null, levelEnemies: Enemy[], totalLevelEnemies: number, levelKilledEnemies: number } = {
        inFight: false,
        currentEnemy: null,
        levelEnemies: [],
        totalLevelEnemies: 0,
        levelKilledEnemies: 0
    };

    constructor() {
        this.map = new GameMap();
        this.isFinished = false;
    }

    start() {
    }

    chooseClass(player: Rogue | Mage | Warrior) {
        this.player = player;
    }

    move(room: string) {
        this.map.enterRoom(room);
        this.fight();
    }

    fight() {
        const enemies = this.map.getEnemies();
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        this.fightMetadata = {
            inFight: true,
            currentEnemy: randomEnemy,
            levelEnemies: enemies,
            totalLevelEnemies: enemies.length,
            levelKilledEnemies: this.fightMetadata?.levelKilledEnemies || 0
        };
        this.fightMetadata.currentEnemy = randomEnemy;
    }

    killCurrentEnemy() {
        this.fightMetadata.levelEnemies = this.fightMetadata.levelEnemies.filter(enemy => enemy.isAlive);
        this.fightMetadata.levelKilledEnemies = this.fightMetadata.levelKilledEnemies + 1;
        this.fightMetadata.currentEnemy = null;
        if (this.fightMetadata.levelEnemies.length > 0) {
            const randomEnemy = this.fightMetadata.levelEnemies[Math.floor(Math.random() * this.fightMetadata.levelEnemies.length)];
            this.fightMetadata.currentEnemy = randomEnemy;
        } else {
            this.fightMetadata.inFight = false;
            this. map.moveToNextLevel();
        }
    }
}
