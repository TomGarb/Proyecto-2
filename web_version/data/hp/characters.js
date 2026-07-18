import { DB_LIGHT, DB_DARK } from './classes.js';

export const BOSSES_LIGHT = [
    { name: "Draco Malfoy", hp: 80, attack: 15, specialName: "Serpensortia", specialDmg: 20, critThreshold: 18, specialEffect: "burn" },
    { name: "Dementor", hp: 120, attack: 18, specialName: "Beso del Dementor", specialDmg: 25, critThreshold: 19, specialEffect: "lifesteal" },
    { name: "Fenrir Greyback", hp: 150, attack: 22, specialName: "Mordida de Licántropo", specialDmg: 30, critThreshold: 17, specialEffect: "none" },
    { name: "Bellatrix Lestrange", hp: 180, attack: 25, specialName: "Crucio", specialDmg: 35, critThreshold: 16, specialEffect: "stun" },
    { name: "Lord Voldemort", hp: 250, attack: 30, specialName: "Avada Kedavra", specialDmg: 50, critThreshold: 15, specialEffect: "none" }
];

export const BOSSES_DARK = [
    { name: "Ron Weasley", hp: 90, attack: 15, specialName: "Desmaius", specialDmg: 20, critThreshold: 18, specialEffect: "stun" },
    { name: "Hermione Granger", hp: 100, attack: 18, specialName: "Confringo", specialDmg: 25, critThreshold: 17, specialEffect: "burn" },
    { name: "Sirius Black", hp: 130, attack: 22, specialName: "Transformación Animaga", specialDmg: 30, critThreshold: 17, specialEffect: "none" },
    { name: "Harry Potter", hp: 160, attack: 25, specialName: "Expecto Patronum", specialDmg: 40, critThreshold: 16, specialEffect: "none" },
    { name: "Albus Dumbledore", hp: 250, attack: 30, specialName: "Fuego de Gubraith", specialDmg: 45, critThreshold: 15, specialEffect: "burn" }
];

export let galacticPool = [];

export function buildGalacticPool() {
    galacticPool = [];
    const extractFromDB = (db) => {
        db.forEach(c => {
            c.subclasses.forEach(sub => {
                c.specials.forEach(sp => {
                    galacticPool.push({
                        name: sub.name,
                        hp: sub.hp,
                        maxHp: sub.hp,
                        attack: sub.attack,
                        critThreshold: sub.critThreshold,
                        passives: sub.passives,
                        specialName: sp.name,
                        specialDmg: sp.dmg,
                        specialEffect: sp.effect,
                        specialCooldownMax: sp.cooldown,
                        state: { burn: 0, stun: false, cooldown: 0 }
                    });
                });
            });
        });
    };
    
    extractFromDB(DB_LIGHT);
    extractFromDB(DB_DARK);
    
    const extractBosses = (bosses) => {
        bosses.forEach(b => {
            galacticPool.push({
                name: b.name,
                hp: b.hp,
                maxHp: b.hp,
                attack: b.attack,
                critThreshold: b.critThreshold,
                passives: [],
                specialName: b.specialName,
                specialDmg: b.specialDmg,
                specialEffect: b.specialEffect,
                specialCooldownMax: 3,
                state: { burn: 0, stun: false, cooldown: 0 }
            });
        });
    };
    
    extractBosses(BOSSES_LIGHT);
    extractBosses(BOSSES_DARK);
}
