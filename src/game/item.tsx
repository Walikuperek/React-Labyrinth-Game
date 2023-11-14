import { Entity } from "./entity";

export class Item {
    readonly name: string;
    readonly description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    use(entity: Entity) {
        console.warn('Using item', this, entity);
    }
}

export class Effect extends Item {
    duration: number;
    dmg?: number;
    dmgFactory?: (entity: Entity) => number;

    constructor(init: {name: string; description: string; duration: number; dmg?: number; dmgFactory?: (entity: Entity) => number}) {
        super(init.name, init.description);
        this.duration = init.duration;
        this.dmg = init.dmg;
        this.dmgFactory = init.dmgFactory;
    }
    
    update(entity: Entity) {
        this.duration--;
        if (this.duration < 0) {
            return;
        }
        if (this.dmgFactory) {
            entity.getHurt(this.dmgFactory(entity));
        } else if (this.dmg) {
            entity.getHurt(this.dmg);
        }
    }
}

export class Ability extends Item {
    readonly dmg: number;
    readonly effects: Effect[];
    readonly cost: number;
    readonly className: string;
    private _active: boolean;
    private _lvl: number;

    constructor(init: {name: string; description: string; dmg: number; cost: number; className: string; effects: Effect[]}) {
        super(init.name, init.description);
        this.dmg = init.dmg;
        this.cost = init.cost;
        this.className = init.className;
        this.effects = init.effects;
        this._active = false;
        this._lvl = 1;
    }

    get active() {
        return this._active;
    }

    get damage() {
        return this.dmg * this.level;
    }

    get level() {
        return this._lvl;
    }

    activate() {
        this._active = true;
    }

    levelUp() {
        this._lvl++;
    }
}

export class Weapon extends Item {
    damage: number;
    effects: Effect[];

    constructor(init: {name: string; description: string; damage: number, effects: Effect[]}) {
        super(init.name, init.description);
        this.damage = init.damage;
        this.effects = init.effects;
    }
}

export class Armor extends Item {
    armor: number;
    effects: Effect[];

    constructor(init: {name: string; description: string; armor: number, effects: Effect[]}) {
        super(init.name, init.description);
        this.armor = init.armor;
        this.effects = init.effects;
    }
}
