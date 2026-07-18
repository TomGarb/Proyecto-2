export const DB_LIGHT = [
    {
        name: "Guerrero Wookiee",
        subclasses: [
            { name: "Berserker de Kashyyyk", hp: 120, attack: 22, critThreshold: 17, passives: [], desc: "Altísimo daño base y vida media." },
            { name: "Defensor Tribal", hp: 180, attack: 12, critThreshold: 19, passives: [], desc: "Vida masiva, un tanque casi inmortal." }
        ],
        specials: [{ name: "Lanzallamas", dmg: 15, effect: "burn", cooldown: 2, desc: "Aplica Quemadura." }, { name: "Rugido", dmg: 10, effect: "stun", cooldown: 3, desc: "Aturde." }]
    },
    {
        name: "Bruja de Dathomir",
        subclasses: [
            { name: "Asesina Espectral", hp: 80, attack: 16, critThreshold: 12, passives: [], desc: "Cañón de cristal." },
            { name: "Invocadora de Sombras", hp: 110, attack: 14, critThreshold: 15, passives: ["special_multiplier_1.5"], desc: "Especial potenciado." }
        ],
        specials: [{ name: "Drenaje Sith", dmg: 35, effect: "lifesteal", cooldown: 1, desc: "Roba vida." }, { name: "Magia Verde", dmg: 45, effect: "none", cooldown: 2, desc: "Ataque puro." }]
    },
    {
        name: "Operativo Táctico",
        subclasses: [
            { name: "Francotirador", hp: 75, attack: 12, critThreshold: 14, passives: ["crit_multiplier_3"], desc: "Críticos x3." },
            { name: "Saboteador", hp: 120, attack: 15, critThreshold: 16, passives: ["heal_multiplier_40"], desc: "Curación del 40%." }
        ],
        specials: [{ name: "Bombardeo", dmg: 60, effect: "none", cooldown: 2, desc: "Gran daño." }, { name: "Granada", dmg: 20, effect: "stun", cooldown: 3, desc: "Aturde." }]
    },
    {
        name: "Jedi",
        subclasses: [
            { name: "Guardián Jedi", hp: 130, attack: 18, critThreshold: 17, passives: [], desc: "Daño fuerte." },
            { name: "Cónsul Jedi", hp: 100, attack: 12, critThreshold: 14, passives: [], desc: "Altos críticos." }
        ],
        specials: [{ name: "Lanzamiento de Sable", dmg: 35, effect: "none", cooldown: 1, desc: "Ataque." }, { name: "Truco Mental", dmg: 10, effect: "stun", cooldown: 3, desc: "Aturde." }]
    }
];

export const DB_DARK = [
    {
        name: "Inquisidor",
        subclasses: [
            { name: "Cazador Jedi", hp: 120, attack: 18, critThreshold: 15, passives: [], desc: "Equilibrado." },
            { name: "Inquisidor Supremo", hp: 150, attack: 15, critThreshold: 17, passives: ["special_multiplier_1.5"], desc: "Especial potenciado." }
        ],
        specials: [{ name: "Estrangulamiento", dmg: 35, effect: "stun", cooldown: 3, desc: "Aturde." }, { name: "Absorción", dmg: 40, effect: "lifesteal", cooldown: 2, desc: "Roba vida." }]
    },
    {
        name: "Soldado Imperial",
        subclasses: [
            { name: "Artillero Pesado", hp: 160, attack: 25, critThreshold: 19, passives: [], desc: "Daño bruto." },
            { name: "Purge Trooper", hp: 110, attack: 16, critThreshold: 14, passives: ["crit_multiplier_3"], desc: "Críticos x3." }
        ],
        specials: [{ name: "Lanzallamas", dmg: 20, effect: "burn", cooldown: 2, desc: "Quema." }, { name: "Bombardeo TIE", dmg: 60, effect: "none", cooldown: 2, desc: "Ataque masivo." }]
    },
    {
        name: "Trandoshano",
        subclasses: [
            { name: "Cazador Feroz", hp: 140, attack: 17, critThreshold: 16, passives: ["heal_multiplier_40"], desc: "Cura 40%." },
            { name: "Asesino Sigiloso", hp: 90, attack: 20, critThreshold: 13, passives: [], desc: "Alta probabilidad crítico." }
        ],
        specials: [{ name: "Dardo Venenoso", dmg: 15, effect: "burn", cooldown: 2, desc: "Quema." }, { name: "Disparo Penetrante", dmg: 50, effect: "none", cooldown: 1, desc: "Puro daño." }]
    }
];
