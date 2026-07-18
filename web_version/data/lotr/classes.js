export const DB_LIGHT = [
    {
        name: "Montaraz",
        subclasses: [
            { name: "Arquero de Ithilien", hp: 100, attack: 15, critThreshold: 12, passives: ["crit_multiplier_3"], desc: "Altísima probabilidad de crítico (x3)." },
            { name: "Guardián del Norte", hp: 130, attack: 18, critThreshold: 16, passives: [], desc: "Equilibrio entre ataque y supervivencia." }
        ],
        specials: [{ name: "Luz de Eärendil", dmg: 10, effect: "stun", cooldown: 3, desc: "Ciega y aturde al enemigo." }, { name: "Flecha Certera", dmg: 40, effect: "none", cooldown: 2, desc: "Gran daño puro." }]
    },
    {
        name: "Istari",
        subclasses: [
            { name: "Mago Blanco", hp: 90, attack: 14, critThreshold: 15, passives: ["heal_multiplier_40"], desc: "Curación aumentada en modo historia." },
            { name: "Mago Gris", hp: 110, attack: 16, critThreshold: 14, passives: ["special_multiplier_1.5"], desc: "Hechizos más destructivos." }
        ],
        specials: [{ name: "Llama de Anor", dmg: 25, effect: "burn", cooldown: 2, desc: "Aplica quemadura mágica." }, { name: "Palabra de Poder", dmg: 50, effect: "none", cooldown: 3, desc: "Daño masivo en área." }]
    },
    {
        name: "Guerrero Enano",
        subclasses: [
            { name: "Defensor de Erebor", hp: 180, attack: 12, critThreshold: 20, passives: [], desc: "Tanque masivo. Casi inmortal, pero rara vez hace críticos." },
            { name: "Señor de las Minas", hp: 150, attack: 16, critThreshold: 18, passives: [], desc: "Resistente y contundente." }
        ],
        specials: [{ name: "Furia de Khazad-dûm", dmg: 60, effect: "none", cooldown: 3, desc: "Un golpe devastador." }, { name: "Carga Imparable", dmg: 30, effect: "stun", cooldown: 3, desc: "Aturde al objetivo." }]
    }
];

export const DB_DARK = [
    {
        name: "Uruk-hai",
        subclasses: [
            { name: "Berserker", hp: 110, attack: 22, critThreshold: 17, passives: [], desc: "Alta agresividad." },
            { name: "Capitán Uruk", hp: 140, attack: 15, critThreshold: 16, passives: ["special_multiplier_1.5"], desc: "Comandante implacable." }
        ],
        specials: [{ name: "Frenesí Sanguinario", dmg: 45, effect: "lifesteal", cooldown: 2, desc: "Roba vida." }, { name: "Grito de Guerra", dmg: 20, effect: "stun", cooldown: 3, desc: "Aturde." }]
    },
    {
        name: "Nazgûl",
        subclasses: [
            { name: "Jinete Negro", hp: 100, attack: 16, critThreshold: 14, passives: ["crit_multiplier_3"], desc: "Ataques letales." },
            { name: "Sombra Alada", hp: 130, attack: 18, critThreshold: 18, passives: [], desc: "Ataques veloces desde el aire." }
        ],
        specials: [{ name: "Aliento Negro", dmg: 20, effect: "burn", cooldown: 2, desc: "Corrompe y quema." }, { name: "Hoja de Morgul", dmg: 50, effect: "none", cooldown: 3, desc: "Daño masivo oscuro." }]
    }
];
