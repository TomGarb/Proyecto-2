export const DB_LIGHT = [
    {
        name: "Especialista Taijutsu",
        subclasses: [
            { name: "Loto Escondido", hp: 120, attack: 18, critThreshold: 15, passives: [], desc: "Fuerte daño cuerpo a cuerpo." },
            { name: "Ocho Puertas", hp: 80, attack: 25, critThreshold: 13, passives: ["crit_multiplier_3"], desc: "Daño inmenso, frágil." }
        ],
        specials: [{ name: "Loto Primario", dmg: 40, effect: "none", cooldown: 2, desc: "Daño brutal." }, { name: "Patada Huracán", dmg: 15, effect: "stun", cooldown: 3, desc: "Aturde." }]
    },
    {
        name: "Maestro Genjutsu",
        subclasses: [
            { name: "Ilusionista", hp: 90, attack: 14, critThreshold: 16, passives: ["special_multiplier_1.5"], desc: "Especial potenciado." },
            { name: "Ojo Copiador", hp: 110, attack: 16, critThreshold: 15, passives: [], desc: "Equilibrado, táctico." }
        ],
        specials: [{ name: "Tsukuyomi", dmg: 10, effect: "stun", cooldown: 2, desc: "Aturde en bucle." }, { name: "Ilusión Demoníaca", dmg: 25, effect: "burn", cooldown: 3, desc: "Daño mental (Quemadura)." }]
    },
    {
        name: "Ninja Médico",
        subclasses: [
            { name: "Curandero de Combate", hp: 130, attack: 12, critThreshold: 18, passives: ["heal_multiplier_40"], desc: "Curación aumentada." },
            { name: "Maestro de Venenos", hp: 100, attack: 15, critThreshold: 16, passives: [], desc: "Especializado en desgastar." }
        ],
        specials: [{ name: "Bisturí de Chakra", dmg: 35, effect: "lifesteal", cooldown: 2, desc: "Roba vida." }, { name: "Nube Tóxica", dmg: 20, effect: "burn", cooldown: 2, desc: "Quema constantemente." }]
    }
];

export const DB_DARK = [
    {
        name: "Renegado",
        subclasses: [
            { name: "Asesino Silencioso", hp: 110, attack: 20, critThreshold: 14, passives: ["crit_multiplier_3"], desc: "Ataques mortales." },
            { name: "Marionetista", hp: 140, attack: 15, critThreshold: 17, passives: [], desc: "Usa títeres." }
        ],
        specials: [{ name: "Amaterasu", dmg: 25, effect: "burn", cooldown: 2, desc: "Fuego inextinguible." }, { name: "Arena de Hierro", dmg: 40, effect: "none", cooldown: 3, desc: "Golpe pesado." }]
    },
    {
        name: "Jinchūriki",
        subclasses: [
            { name: "Bestia con Cola", hp: 180, attack: 16, critThreshold: 18, passives: [], desc: "Inmenso chakra y HP." },
            { name: "Controlador Perfecto", hp: 150, attack: 18, critThreshold: 16, passives: ["special_multiplier_1.5"], desc: "Equilibrio perfecto." }
        ],
        specials: [{ name: "Bomba Bestia", dmg: 55, effect: "none", cooldown: 3, desc: "Devastador." }, { name: "Chakra Rojo", dmg: 25, effect: "lifesteal", cooldown: 2, desc: "Roba vida." }]
    }
];
