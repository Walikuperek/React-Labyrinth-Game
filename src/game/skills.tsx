import { Ability } from "./item";

export class IceSpell extends Ability {
    constructor() {
        super({name: 'Ice Spell', description: 'Spell that blasts enemies with ice', dmg: 10, cost: 20, className: 'Mage', effects: []});
        this.activate();
    }
}

export class FireballSpell extends Ability {
    constructor() {
        super({name: 'Fireball Spell', description: 'Spell that blasts enemies with fire', dmg: 40, cost: 40, className: 'Mage', effects: []});
    }
}

export class BlackHoleSpell extends Ability {
    constructor() {
        super({name: 'Black Hole Spell', description: 'Spell that blasts enemies with a black hole', dmg: 70, cost: 70, className: 'Mage', effects: []});
    }
}

export class ManaRegenSpell extends Ability {
    constructor() {
        super({name: 'Mana Regen Spell', description: 'Spell that regenerates mana', dmg: 0, cost: -50, className: 'Mage', effects: []});
        this.activate();
    }
}

export class StabSkill extends Ability {
    constructor() {
        super({name: 'Stab Skill', description: 'Skill that stabs enemies', dmg: 10, cost: 20, className: 'Warrior', effects: []});
        this.activate();
    }
}

export class DoubleStrikeSkill extends Ability {
    constructor() {
        super({name: 'Double Strike Skill', description: 'Skill that strikes enemies twice', dmg: 40, cost: 40, className: 'Warrior', effects: []});
    }
}

export class PowerStrikeSkill extends Ability {
    constructor() {
        super({name: 'Power Strike Skill', description: 'Skill that strikes enemies with power', dmg: 100, cost: 70, className: 'Warrior', effects: []});
    }
}

export class RageSkill extends Ability {
    constructor() {
        super({name: 'Rage Skill', description: 'Skill that regenerates rage', dmg: 0, cost: -50, className: 'Warrior', effects: []});
        this.activate();
    }
}

export class BackstabSkill extends Ability {
    constructor() {
        super({name: 'Backstab Skill', description: 'Skill that backstabs enemies', dmg: 10, cost: 20, className: 'Rogue', effects: []});
        this.activate();
    }
}

export class RainOfDaggersSkill extends Ability {
    constructor() {
        super({name: 'Rain of Daggers Skill', description: 'Skill that rains daggers on enemies', dmg: 40, cost: 40, className: 'Rogue', effects: []});
    }
}

export class AssassinationSkill extends Ability {
    constructor() {
        super({name: 'Assassination Skill', description: 'Skill that assassinate enemies', dmg: 100, cost: 70, className: 'Rogue', effects: []});
    }
}

export class StealthSkill extends Ability {
    constructor() {
        super({name: 'Stealth Skill', description: 'Skill that regenerates energy', dmg: 0, cost: -50, className: 'Rogue', effects: []});
        this.activate();
    }
}
