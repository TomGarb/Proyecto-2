export const BOSSES_LIGHT = [
    { name: "Lurtz", hp: 120, attack: 18, specialName: "Lluvia de Flechas", specialDmg: 30, specialEffect: "none", critThreshold: 16 },
    { name: "Ella-Laraña", hp: 150, attack: 22, specialName: "Picadura Venenosa", specialDmg: 20, specialEffect: "burn", critThreshold: 17 },
    { name: "Rey Brujo", hp: 200, attack: 25, specialName: "Maza de Angmar", specialDmg: 40, specialEffect: "stun", critThreshold: 15 },
    { name: "Saruman", hp: 180, attack: 20, specialName: "Tormenta de Isengard", specialDmg: 50, specialEffect: "none", critThreshold: 18 },
    { name: "Sauron", hp: 300, attack: 35, specialName: "Anillo Único", specialDmg: 60, specialEffect: "stun", critThreshold: 14 }
];

export const BOSSES_DARK = [
    { name: "Frodo", hp: 90, attack: 12, specialName: "Frasco de Galadriel", specialDmg: 10, specialEffect: "stun", critThreshold: 19 },
    { name: "Gimli", hp: 160, attack: 22, specialName: "Hacha Doble", specialDmg: 40, specialEffect: "none", critThreshold: 17 },
    { name: "Legolas", hp: 110, attack: 20, specialName: "Disparo Triple", specialDmg: 30, specialEffect: "none", critThreshold: 13 },
    { name: "Aragorn", hp: 150, attack: 25, specialName: "Andúril", specialDmg: 50, specialEffect: "none", critThreshold: 15 },
    { name: "Gandalf", hp: 140, attack: 18, specialName: "Luz de Valinor", specialDmg: 45, specialEffect: "burn", critThreshold: 16 }
];

export let galacticPool = [];
export const buildGalacticPool = () => {
    // Importamos las bases de datos dinámicamente de su respectivo classes.js
    // Nota: Es mejor construir el pool en hub.js, pero para no alterar la arquitectura:
    galacticPool = [...BOSSES_LIGHT, ...BOSSES_DARK];
};
