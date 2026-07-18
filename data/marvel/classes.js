export const DB_LIGHT = [
    {
        name: "Supersoldado",
        subclasses: [
            { name: "Líder Táctico", hp: 140, attack: 16, critThreshold: 17, passives: [], desc: "Equilibrado, gran defensa." },
            { name: "Vengador Pesado", hp: 180, attack: 12, critThreshold: 19, passives: [], desc: "Tanque puro, mucha resistencia." }
        ],
        specials: [{ name: "Escudo Vibranium", dmg: 10, effect: "stun", cooldown: 3, desc: "Anula el daño del enemigo aturdiéndolo." }, { name: "Lanzamiento de Escudo", dmg: 40, effect: "none", cooldown: 2, desc: "Golpe contundente." }]
    },
    {
        name: "Hechicero Místico",
        subclasses: [
            { name: "Maestro de las Artes Místicas", hp: 90, attack: 14, critThreshold: 15, passives: ["heal_multiplier_40"], desc: "Magia regenerativa." },
            { name: "Hechicero Supremo", hp: 110, attack: 18, critThreshold: 16, passives: ["special_multiplier_1.5"], desc: "Especiales destructivos." }
        ],
        specials: [{ name: "Manipulación de la Realidad", dmg: 20, effect: "stun", cooldown: 3, desc: "Controla al enemigo." }, { name: "Látigos Mágicos", dmg: 35, effect: "burn", cooldown: 2, desc: "Quema al enemigo." }]
    },
    {
        name: "Genio Tecnológico",
        subclasses: [
            { name: "Armadura Pesada", hp: 150, attack: 15, critThreshold: 17, passives: [], desc: "Alta tecnología, daño moderado." },
            { name: "Controlador de Drones", hp: 100, attack: 20, critThreshold: 14, passives: ["crit_multiplier_3"], desc: "Ataques de precisión (Críticos x3)." }
        ],
        specials: [{ name: "Rayo Repulsor", dmg: 30, effect: "burn", cooldown: 2, desc: "Quemadura por plasma." }, { name: "Unirayo", dmg: 55, effect: "none", cooldown: 3, desc: "Poder masivo." }]
    }
];

export const DB_DARK = [
    {
        name: "Simbionte",
        subclasses: [
            { name: "Protector Letal", hp: 130, attack: 18, critThreshold: 16, passives: [], desc: "Agresivo." },
            { name: "Carnicero", hp: 100, attack: 22, critThreshold: 14, passives: ["crit_multiplier_3"], desc: "Sanguinario." }
        ],
        specials: [{ name: "Mordida Feroz", dmg: 40, effect: "lifesteal", cooldown: 2, desc: "Roba vida." }, { name: "Zarcillos", dmg: 20, effect: "stun", cooldown: 3, desc: "Aturde." }]
    },
    {
        name: "Titán Loco",
        subclasses: [
            { name: "Conquistador", hp: 180, attack: 15, critThreshold: 18, passives: [], desc: "Imparable." },
            { name: "Portador del Guantelete", hp: 150, attack: 20, critThreshold: 15, passives: ["special_multiplier_1.5"], desc: "Especial potenciado." }
        ],
        specials: [{ name: "Chasquido", dmg: 60, effect: "none", cooldown: 4, desc: "Elimina la mitad de todo." }, { name: "Gema del Poder", dmg: 35, effect: "burn", cooldown: 2, desc: "Fuego cósmico." }]
    }
];
