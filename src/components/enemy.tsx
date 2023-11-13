import {Player} from "./player.tsx";
import {bat, skeleton} from "./sprites.tsx";

export class Enemy {
    name: string;
    health: number;
    maxHealth: number;
    isAlive: boolean;
    strength: number;
    criticalChance: number;
    sprite: JSX.Element | null = null;

    constructor(name: string = 'Enemy', health: number = 100, maxHealth: number = 100, strength: number = 10, criticalChance: number = 0.1) {
        this.name = name;
        this.health = health;
        this.maxHealth = maxHealth;
        this.isAlive = true;
        this.strength = strength;
        this.criticalChance = criticalChance;
    }

    getHurt(damage: number) {
        this.health -= damage;
        console.warn('Enemy health: ', this.health);
        if (this.health <= 0) {
            console.error('Enemy dead');
            this.isAlive = false;
        }
    }

    attack(player: Player) {
        const dmg = this.strength * (Math.random() < this.criticalChance ? 2 : 1);
        player.getHurt(dmg);
        return dmg;
    }
}
export class Bat extends Enemy {
    constructor() {
        super('Bat', 30, 30, 5, 0.1);
        this.sprite = bat;
    }
}
export class Skeleton extends Enemy {
    constructor() {
        super('Skeleton', 50, 50, 15, 0.1);
        this.sprite = skeleton;
    }
}
