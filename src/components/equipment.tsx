import {Ability} from "./skills.tsx";

export class Item {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export class Weapon extends Item {
    damage: number;

    constructor() {
        super('Weapon', 'Weapon to fight enemies');
        this.damage = 10;
    }
}

export class Armor extends Item {
    armor: number;

    constructor() {
        super('Armor', 'Armor to protect from enemies');
        this.armor = 10;
    }
}

export class Equipment {
    weapon: Weapon;
    armor: Armor;

    constructor() {
        this.weapon = new Weapon();
        this.armor = new Armor();
    }

    equipWeapon(weapon: Weapon) {
        this.weapon = weapon;
    }

    equipArmor(armor: Armor) {
        this.armor = armor;
    }
}

export class Inventory {
    items: (Item | Ability)[];

    constructor() {
        // this.items = [new RainOfDaggersSkill(), new FireballSpell()];
        this.items = [];
    }

    addItem(item: Item | Ability) {
        this.items.push(item);
    }

    removeItem(item: Item | Ability) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}

export class Effect {
    name: string;
    description: string;
    duration: number;

    constructor(name: string, description: string, duration: number) {
        this.name = name;
        this.description = description;
        this.duration = duration;
    }
}
