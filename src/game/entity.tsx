import { Equipment, Inventory } from "./equipment";
import { Ability, Effect } from "./item";
import {
    AssassinationSkill,
    BackstabSkill,
    BlackHoleSpell,
    DoubleStrikeSkill,
    FireballSpell,
    IceSpell,
    ManaRegenSpell,
    PowerStrikeSkill,
    RageSkill,
    RainOfDaggersSkill,
    StabSkill,
    StealthSkill
} from "./skills.tsx";

export class Entity {
    strength: number;
    criticalChance: number;
    health: number;
    maxHealth: number;
    isAlive: boolean;
    abilities: Ability[];
    effects: Effect[];
    equipment = new Equipment();
    inventory = new Inventory();

    constructor() {
        this.strength = 10;
        this.criticalChance = 0.1;
        this.health = 100;
        this.maxHealth = 100;
        this.isAlive = true;
        this.abilities = [];
        this.effects = [];
    }

    getSprite() {
        return <>🤺</>;
    }

    refresh() {
        this.health = this.maxHealth;
    }

    applyEffects() {
        this.effects.forEach(effect => effect.update(this));
        this.effects = this.effects.filter(effect => effect.duration > 0);
    }

    getHurt(damage: number) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
            this.isAlive = false;
        } else if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    attack(entity: Entity, skill: Ability) {
        const dmg = skill.damage * (Math.random() <= this.criticalChance ? 2 : 1);
        entity.getHurt(dmg);
        entity.effects.push(...this.equipment.weapon.effects);
        entity.effects.push(...skill.effects);
        entity.applyEffects();
    }

    levelUp() {
        this.strength += 10;
        this.criticalChance += 0.1;
    }

    learnAbility(ability: Ability) {
        const playerAbility = this.abilities.find(a => a.name === ability.name)!;
        if (playerAbility.active) {
            playerAbility.levelUp();
        } else {
            playerAbility.activate();
        }
    }
}


export class Mage extends Entity {
    mana: number;
    maxMana: number;
    name = "Mage";

    constructor() {
        super();
        this.mana = 100;
        this.maxMana = 100;
        this.abilities = [new IceSpell(), new FireballSpell(), new BlackHoleSpell(), new ManaRegenSpell()];
    }

    getSprite() {
        return <>🧙</>;
    }

    attack(enemy: Entity, skill: Ability, noCost = false) {
        if (!noCost) {
            this.mana -= skill.cost;
        }
        if (this.mana < 0) {
            this.mana = 0;
        } else if (this.mana > 100) {
            this.mana = 100;
        }
        super.attack(enemy, skill);
    }

    refresh() {
        this.mana = this.maxMana;
        super.refresh();
    }
}

export class Warrior extends Entity {
    rage: number;
    maxRage: number;
    name = "Warrior";

    constructor() {
        super();
        this.rage = 100;
        this.maxRage = 100;
        this.abilities = [new StabSkill(), new DoubleStrikeSkill(), new PowerStrikeSkill(), new RageSkill()];
    }

    getSprite() {
        // return <>🤺</>;
        return <>👨🏼‍🎤</>;
    }

    attack(enemy: Entity, skill: Ability, noCost = false) {
        if (!noCost) {
            this.rage -= skill.cost;
        }
        if (this.rage < 0) {
            this.rage = 0;
        } else if (this.rage > this.maxRage) {
            this.rage = this.maxRage;
        }
        super.attack(enemy, skill);
    }

    refresh() {
        this.rage = this.maxRage;
        super.refresh();
    }
}

export class Rogue extends Entity {
    energy: number;
    maxEnergy: number;
    name = "Rogue";

    constructor() {
        super();
        this.energy = 100;
        this.maxEnergy = 100;
        this.abilities = [new BackstabSkill(), new RainOfDaggersSkill(), new AssassinationSkill(), new StealthSkill()];
    }

    getSprite() {
        return <>🥷🏻</>;
    }

    attack(enemy: Entity, skill: Ability, noCost = false) {
        if (!noCost) {
            this.energy -= skill.cost;
        }
        if (this.energy < 0) {
            this.energy = 0;
        } else if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
        super.attack(enemy, skill);
    }

    refresh() {
        this.energy = this.maxEnergy;
        super.refresh();
    }
}

export class Duck extends Entity {
    feathers: number;
    maxFeathers: number;
    name = "Duck";

    constructor() {
        super();
        this.feathers = 100;
        this.maxFeathers = 100;
        this.abilities = [new BackstabSkill(), new RainOfDaggersSkill(), new AssassinationSkill(), new StealthSkill()];
    }

    getSprite() {
        return <>🦆</>;
    }

    attack(enemy: Entity, skill: Ability, noCost = false) {
        if (!noCost) {
            this.feathers -= skill.cost;
        }
        if (this.feathers < 0) {
            this.feathers = 0;
        } else if (this.feathers > this.maxFeathers) {
            this.feathers = this.maxFeathers;
        }
        super.attack(enemy, skill);
    }

    refresh() {
        this.feathers = this.maxFeathers;
        super.refresh();
    }
}
