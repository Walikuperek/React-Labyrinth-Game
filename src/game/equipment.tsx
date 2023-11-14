import { Armor, Item, Weapon } from "./item";


export class Inventory {
    items: (Item)[];

    constructor() {
        this.items = [];
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    removeItem(item: Item) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}

export class Equipment {
    weapon: Weapon;
    armor: Armor;

    constructor() {
        this.weapon = new Weapon({name: 'Fists', description: '', damage: 3, effects: []});
        this.armor = new Armor({name: 'Shirt', description: '', armor: 1, effects: []});
    }

    equipWeapon(weapon: Weapon) {
        this.weapon = weapon;
    }

    equipArmor(armor: Armor) {
        this.armor = armor;
    }
}
