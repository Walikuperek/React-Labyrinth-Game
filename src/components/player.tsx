import {
    Ability,
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
    StabSkill, StealthSkill
} from "./skills.tsx";
import {Enemy} from "./enemy.tsx";
import {Equipment, Inventory} from "./equipment.tsx";

export class Player {
    health: number;
    maxHealth: number;
    isAlive: boolean;
    protected strength: number;
    protected criticalChance: number;
    abilities: Ability[];
    equipment = new Equipment();
    inventory = new Inventory();

    constructor() {
        this.health = 100;
        this.maxHealth = 100;
        this.isAlive = true;
        this.strength = 10;
        this.criticalChance = 0.1;
        this.abilities = [];
    }

    refresh() {
        this.health = this.maxHealth;
    }

    getHurt(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    attack(enemy: Enemy, skill: Ability) {
        const dmg = skill.damage * (Math.random() < this.criticalChance ? 2 : 1);
        enemy.getHurt(dmg);
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

export class Mage extends Player {
    mana: number;
    maxMana: number;
    name = "Mage";

    constructor() {
        super();
        this.mana = 100;
        this.maxMana = 100;
        this.abilities = [new IceSpell(), new FireballSpell(), new BlackHoleSpell(), new ManaRegenSpell()];
    }

    attack(enemy: Enemy, skill: Ability, noCost = false) {
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

export class Warrior extends Player {
    rage: number;
    maxRage: number;
    name = "Warrior";

    constructor() {
        super();
        this.rage = 100;
        this.maxRage = 100;
        this.abilities = [new StabSkill(), new DoubleStrikeSkill(), new PowerStrikeSkill(), new RageSkill()];
    }

    attack(enemy: Enemy, skill: Ability, noCost = false) {
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

export class Rogue extends Player {
    energy: number;
    maxEnergy: number;
    name = "Rogue";

    constructor() {
        super();
        this.energy = 100;
        this.maxEnergy = 100;
        this.abilities = [new BackstabSkill(), new RainOfDaggersSkill(), new AssassinationSkill(), new StealthSkill()];
    }

    attack(enemy: Enemy, skill: Ability, noCost = false) {
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
