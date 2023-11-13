/**
 * Strategy pattern:
 *  - damage: number
 *  - cost: number
 *  - name: string
 *  - description: string
 *  - active: boolean
 *  - level: number
 *  - isMultipleDamage: boolean
 *  - damage: number | number[]
 *  - activate(): void
 *  - levelUp(): void
 */
export class Ability {
    protected readonly dmg: number;
    readonly cost: number;
    readonly className: string;
    readonly name: string;
    readonly description: string;
    readonly dmgTimes: number;
    private _active = false;
    private _lvl: number;

    constructor(dmg = 10, dmgTimes = 1, cost: number, name: string = '', description: string = '', className: string = '') {
        this.name = name;
        this.description = description;
        this.dmg = dmg;
        this.dmgTimes = dmgTimes;
        this._lvl = 1;
        this.cost = cost;
        this.className = className;
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

    get isMultipleDamage() {
        return Array.isArray(this.dmg);
    }

    activate() {
        this._active = true;
    }

    levelUp() {
        this._lvl++;
    }
}

export class IceSpell extends Ability {
    constructor() {
        super(10, 1, 20, 'Ice Spell', 'Spell that blasts enemies with ice', 'Mage');
        this.activate();
    }
}

export class FireballSpell extends Ability {
    constructor() {
        super(40, 1, 40, 'Fireball Spell', 'Spell that blasts enemies with fire', 'Mage');
    }
}

export class BlackHoleSpell extends Ability {
    constructor() {
        super(300, 1, 70, 'Black Hole Spell', 'Spell that blasts enemies with black hole', 'Mage');
    }
}

export class ManaRegenSpell extends Ability {
    constructor() {
        super(0, 1, -50, 'Mana Regen Spell', 'Spell that regenerates mana', 'Mage');
        this.activate();
    }
}

export class StabSkill extends Ability {
    constructor() {
        super(10, 1, 20, 'Stab Skill', 'Skill that stabs enemies', 'Warrior');
        this.activate();
    }
}

export class DoubleStrikeSkill extends Ability {
    constructor() {
        super(20, 2, 40, 'Double Strike Skill', 'Skill that strikes enemies twice', 'Warrior');
    }

    get damage() {
        return this.dmg * this.level;
    }
}

export class PowerStrikeSkill extends Ability {
    constructor() {
        super(300, 1, 70, 'Power Strike Skill', 'Skill that strikes enemies with power', 'Warrior');
    }
}

export class RageSkill extends Ability {
    constructor() {
        super(0, 1, -50, 'Rage Skill', 'Skill that increases rage', 'Warrior');
        this.activate();
    }
}

export class BackstabSkill extends Ability {
    constructor() {
        super(10, 1, 20, 'Backstab Skill', 'Skill that stabs enemies in the back', 'Rogue');
        this.activate();
    }
}

export class RainOfDaggersSkill extends Ability {
    constructor() {
        super(20, 4, 40, 'Rain Of Daggers Skill', 'Skill that throws daggers at enemies (deals 4x damage)', 'Rogue');
        // this.activate();
    }

    get damage() {
        return (this.dmg * this.level) / 2;
    }
}

export class AssassinationSkill extends Ability {
    constructor() {
        super(300, 1, 70, 'Assassination Skill', 'Skill that assassinates enemies', 'Rogue');
    }
}

export class StealthSkill extends Ability {
    constructor() {
        super(0, 1, -50, 'Stealth Skill', 'Skill that regenerate energy', 'Rogue');
        this.activate();
    }
}
