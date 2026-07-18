export const DB_LIGHT = [
    {
        name: "Auror (Equilibrado)",
        subclasses: [
            { name: "Auror de Élite", hp: 100, attack: 20, critThreshold: 18, passives: [], desc: "Defensores mágicos experimentados." },
            { name: "Cazador Oscuro", hp: 90, attack: 25, critThreshold: 16, passives: ["crit_multiplier_3"], desc: "Especialista en duelo letal." }
        ],
        specials: [
            { name: "Expelliarmus", dmg: 10, effect: "stun", cooldown: 2, desc: "Desarma y aturde al oponente." },
            { name: "Protego Maxima", dmg: 5, effect: "none", cooldown: 3, desc: "Ataque defensivo menor." }
        ]
    },
    {
        name: "Estudiante de Gryffindor (Tanque/Valor)",
        subclasses: [
            { name: "Capitán de Quidditch", hp: 120, attack: 15, critThreshold: 19, passives: ["heal_multiplier_40"], desc: "Alta resistencia y evasión." },
            { name: "Duelista Valiente", hp: 110, attack: 18, critThreshold: 18, passives: [], desc: "Equilibrio entre vida y ataque." }
        ],
        specials: [
            { name: "Incendio", dmg: 20, effect: "burn", cooldown: 3, desc: "Provoca quemaduras severas." },
            { name: "Desmaius", dmg: 25, effect: "none", cooldown: 2, desc: "Potente rayo aturdidor (daño alto)." }
        ]
    },
    {
        name: "Estudiante de Slytherin (Daño/Astucia)",
        subclasses: [
            { name: "Maestro de Pociones", hp: 80, attack: 28, critThreshold: 15, passives: ["special_multiplier_1.5"], desc: "Poca vida, mucho daño." },
            { name: "Oclumante", hp: 95, attack: 22, critThreshold: 17, passives: [], desc: "Resistente a ataques mentales." }
        ],
        specials: [
            { name: "Sectumsempra", dmg: 15, effect: "burn", cooldown: 3, desc: "Cortes profundos que desangran (queman)." },
            { name: "Episkey", dmg: 10, effect: "lifesteal", cooldown: 3, desc: "Roba vida al oponente curando heridas." }
        ]
    },
    {
        name: "Profesor de Hogwarts (Magia Antigua)",
        subclasses: [
            { name: "Jefe de Casa", hp: 105, attack: 22, critThreshold: 18, passives: [], desc: "Poderoso y sabio." },
            { name: "Maestro de Transformaciones", hp: 95, attack: 24, critThreshold: 16, passives: [], desc: "Control del campo de batalla." }
        ],
        specials: [
            { name: "Petrificus Totalus", dmg: 5, effect: "stun", cooldown: 3, desc: "Paraliza completamente al enemigo." },
            { name: "Bombarda Maxima", dmg: 35, effect: "none", cooldown: 4, desc: "Explosión masiva de daño." }
        ]
    }
];

export const DB_DARK = [
    {
        name: "Mortífago (Crueldad)",
        subclasses: [
            { name: "Mortífago del Círculo Interno", hp: 110, attack: 24, critThreshold: 17, passives: ["crit_multiplier_3"], desc: "Seguidores leales de Voldemort." },
            { name: "Carroñero", hp: 130, attack: 18, critThreshold: 19, passives: [], desc: "Fuerza bruta y caza." }
        ],
        specials: [
            { name: "Crucio", dmg: 15, effect: "stun", cooldown: 3, desc: "Maldición torturadora." },
            { name: "Avada Kedavra", dmg: 50, effect: "none", cooldown: 5, desc: "Maldición asesina (alto CD)." }
        ]
    }
];
