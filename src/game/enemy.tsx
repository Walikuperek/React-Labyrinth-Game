import { Entity } from "./entity.tsx";
import {bat, skeleton} from "./sprites.tsx";

export class Enemy extends Entity {
    name: string;
    health: number;
    maxHealth: number;
    isAlive: boolean;
    strength: number;
    criticalChance: number;
    sprite: JSX.Element | null = null;

    constructor(init: {name: string, health: number, maxHealth: number, strength: number, criticalChance: number}) {
        super();
        this.name = init.name;
        this.health = init.health;
        this.maxHealth = init.maxHealth;
        this.isAlive = true;
        this.strength = init.strength;
        this.criticalChance = init.criticalChance;
    }

    getHurt(damage: number) {
        this.health -= damage;
        console.warn('Enemy health: ', this.health);
        if (this.health <= 0) {
            console.error('Enemy dead');
            this.isAlive = false;
        }
    }

    attack(player: Entity) {
        const dmg = this.strength * (Math.random() < this.criticalChance ? 2 : 1);
        player.getHurt(dmg);
        return dmg;
    }
}
export class Bat extends Enemy {
    constructor() {
        super({name: 'Bat', health: 50, maxHealth: 50, strength: 10, criticalChance: 0.1});
        this.sprite = bat;
    }
}
export class Skeleton extends Enemy {
    constructor() {
        super({name: 'Skeleton', health: 100, maxHealth: 100, strength: 20, criticalChance: 0.2});
        this.sprite = skeleton;
    }
}
