import { DB_LIGHT, DB_DARK } from './classes.js';

export const BOSSES_LIGHT = [
    { name: "Boba Fett", hp: 120, attack: 12, specialName: "Misil rastreador", specialDmg: 20, critThreshold: 16, specialEffect: "burn" },
    { name: "General Grievous", hp: 180, attack: 15, specialName: "Torbellino sables", specialDmg: 25, critThreshold: 16, specialEffect: "none" },
    { name: "Darth Maul", hp: 250, attack: 18, specialName: "Agresividad Sith", specialDmg: 35, critThreshold: 15, specialEffect: "lifesteal" },
    { name: "Kylo Ren", hp: 300, attack: 22, specialName: "Fuerza Estática", specialDmg: 40, critThreshold: 15, specialEffect: "stun" },
    { name: "Darth Vader", hp: 450, attack: 30, specialName: "Estrangulamiento", specialDmg: 60, critThreshold: 14, specialEffect: "stun" }
];

export const BOSSES_DARK = [
    { name: "Han Solo", hp: 100, attack: 14, specialName: "Disparo Rápido", specialDmg: 25, critThreshold: 14, specialEffect: "none" },
    { name: "Ahsoka Tano", hp: 160, attack: 18, specialName: "Acrobacia Jedi", specialDmg: 30, critThreshold: 15, specialEffect: "none" },
    { name: "Obi-Wan Kenobi", hp: 220, attack: 15, specialName: "Defensa Soresu", specialDmg: 20, critThreshold: 17, specialEffect: "lifesteal" },
    { name: "Yoda", hp: 250, attack: 25, specialName: "Sabiduría de la Fuerza", specialDmg: 40, critThreshold: 14, specialEffect: "stun" },
    { name: "Luke Skywalker", hp: 400, attack: 28, specialName: "Esperanza Jedi", specialDmg: 55, critThreshold: 14, specialEffect: "stun" }
];

export let galacticPool = [];

export function buildGalacticPool() {
    galacticPool = [];
    const extractFromDB = (db) => {
        db.forEach(c => {
            c.subclasses.forEach(sub => {
                const sp = c.specials[0];
                galacticPool.push({
                    name: sub.name, hp: sub.hp, maxHp: sub.hp, attack: sub.attack, critThreshold: sub.critThreshold,
                    specialName: sp.name, specialDmg: sp.dmg, specialEffect: sp.effect, specialCooldownMax: sp.cooldown,
                    passives: sub.passives, state: { burn: 0, stun: false, cooldown: 0 }
                });
            });
        });
    };
    extractFromDB(DB_LIGHT);
    extractFromDB(DB_DARK);
    
    const extractFromBosses = (bosses) => {
        bosses.forEach(b => {
            galacticPool.push({
                name: b.name, hp: b.hp, maxHp: b.hp, attack: b.attack, critThreshold: b.critThreshold,
                specialName: b.specialName, specialDmg: b.specialDmg, specialEffect: b.specialEffect, specialCooldownMax: 2,
                passives: [], state: { burn: 0, stun: false, cooldown: 0 }
            });
        });
    }
    extractFromBosses(BOSSES_LIGHT);
    extractFromBosses(BOSSES_DARK);
}
