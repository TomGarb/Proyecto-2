import { SagasData } from '../data/sagas.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Leer la Saga del SessionStorage
    const saga = sessionStorage.getItem('selectedSaga');
    
    if (!saga) {
        window.location.href = 'index.html';
        return;
    }

    // Volver al index
    document.getElementById('btn-back-index').addEventListener('click', () => {
        sessionStorage.removeItem('selectedSaga');
        window.location.href = 'index.html';
    });

    // 2. Aplicar Tema Dinámicamente
    document.body.className = `theme-${saga}`;
    
    // Fallback temporal para Fase 1 (evita errores si eliges saga que aún no existe en sagas.js)
    const sagaData = SagasData[saga] || {
        title: `UNIVERSO ${saga.toUpperCase()}`,
        draftTitle: "DRAFT TÁCTICO",
        DB_LIGHT: [],
        DB_DARK: [],
        BOSSES_LIGHT: [],
        BOSSES_DARK: [],
        buildPool: () => {},
        getPool: () => []
    };
    
    // 3. Inicializar Textos
    document.getElementById('main-menu-title').innerText = sagaData.title;
    document.getElementById('draft-title').innerText = sagaData.draftTitle;

    const screens = {
        mainMenu: document.getElementById('main-menu-screen'),
        creation: document.getElementById('creation-screen'),
        draft: document.getElementById('draft-screen')
    };

    let gameMode = "";
    let playerConfig = { name: "", className: "", hp: 0, maxHp: 0, attack: 0, critThreshold: 16, specialName: "", specialDmg: 0, specialEffect: "none", specialCooldownMax: 0, passives: [], state: { burn: 0, stun: false, cooldown: 0 } };
    let tempSelectedClass = null;
    let draftRound = 1;
    let playerSquad = [];

    // --- Navegación de Modos ---
    const setMode = (mode) => {
        gameMode = mode;
        screens.mainMenu.classList.remove('active');
        screens.mainMenu.classList.add('hidden');

        if (mode === 'draft') {
            if(sagaData.buildPool) sagaData.buildPool();
            screens.draft.classList.remove('hidden');
            screens.draft.classList.add('active');
            startDraftRound();
        } else {
            const isDark = (mode === 'dark');
            const db = isDark ? sagaData.DB_DARK : sagaData.DB_LIGHT;
            if (isDark) {
                document.getElementById('creation-title').innerText = "EL LADO OSCURO";
                document.getElementById('creation-title').style.color = "var(--enemy-color)";
            } else {
                document.getElementById('creation-title').innerText = "FORJA TU DESTINO";
                document.getElementById('creation-title').style.color = "var(--primary-color)";
            }
            screens.creation.classList.remove('hidden');
            screens.creation.classList.add('active');
            renderClasses(db);
        }
    };

    document.getElementById('btn-mode-story').addEventListener('click', () => setMode('story'));
    document.getElementById('btn-mode-endless').addEventListener('click', () => setMode('endless'));
    document.getElementById('btn-mode-roguelike').addEventListener('click', () => setMode('roguelike'));
    document.getElementById('btn-mode-dark').addEventListener('click', () => setMode('dark'));
    document.getElementById('btn-mode-draft').addEventListener('click', () => setMode('draft'));

    // --- CREACIÓN (MODOS 1-4) ---
    const renderClasses = (db) => {
        document.getElementById('step-1').classList.remove('hidden');
        document.getElementById('step-2').classList.add('hidden');
        document.getElementById('step-3').classList.add('hidden');
        const classCardsDiv = document.getElementById('class-cards');
        classCardsDiv.innerHTML = '';
        if(!db || db.length === 0) { 
            classCardsDiv.innerHTML = "<p>Datos de saga en construcción (Fase 2). Regresa al menú.</p>"; 
            return; 
        }
        db.forEach(cls => {
            const card = document.createElement('div');
            card.className = 'class-card';
            card.innerHTML = `<h3>${cls.name}</h3>`;
            card.addEventListener('click', () => {
                tempSelectedClass = cls;
                playerConfig.className = cls.name;
                renderSubclasses(cls);
            });
            classCardsDiv.appendChild(card);
        });
    };

    const renderSubclasses = (cls) => {
        document.getElementById('step-1').classList.add('hidden');
        document.getElementById('step-2').classList.remove('hidden');
        const subclassCardsDiv = document.getElementById('subclass-cards');
        subclassCardsDiv.innerHTML = '';
        cls.subclasses.forEach(sub => {
            const card = document.createElement('div');
            card.className = 'class-card subclass-card';
            card.innerHTML = `<h3>${sub.name}</h3><p><i>${sub.desc}</i></p><br><p>HP: ${sub.hp}</p><p>Daño: ${sub.attack}</p><p>Crit: ${sub.critThreshold}-20</p>`;
            card.addEventListener('click', () => {
                playerConfig.name = sub.name;
                playerConfig.maxHp = sub.hp;
                playerConfig.hp = sub.hp;
                playerConfig.attack = sub.attack;
                playerConfig.critThreshold = sub.critThreshold;
                playerConfig.passives = sub.passives;
                renderSpecials(cls);
            });
            subclassCardsDiv.appendChild(card);
        });
    };

    const renderSpecials = (cls) => {
        document.getElementById('step-2').classList.add('hidden');
        document.getElementById('step-3').classList.remove('hidden');
        const specialCardsDiv = document.getElementById('special-cards');
        specialCardsDiv.innerHTML = '';
        cls.specials.forEach(sp => {
            const card = document.createElement('div');
            card.className = 'class-card special-card';
            card.innerHTML = `<h3>${sp.name}</h3><p><i>${sp.desc}</i></p><br><p>Daño: ${sp.dmg}</p><p style="color:var(--neon-orange)">Efecto: ${sp.effect.toUpperCase()}</p><p style="color:var(--neon-blue)">CD: ${sp.cooldown}</p>`;
            card.addEventListener('click', () => {
                playerConfig.specialName = sp.name;
                let finalDmg = sp.dmg;
                if (playerConfig.passives.includes("special_multiplier_1.5")) finalDmg = Math.floor(finalDmg * 1.5);
                playerConfig.specialDmg = finalDmg;
                playerConfig.specialEffect = sp.effect;
                playerConfig.specialCooldownMax = sp.cooldown;
                
                // REDIRIGIR A COMBAT.HTML
                launchCombat();
            });
            specialCardsDiv.appendChild(card);
        });
    };

    const launchCombat = () => {
        sessionStorage.setItem('gameMode', gameMode);
        if (gameMode === 'draft') {
            sessionStorage.setItem('playerSquad', JSON.stringify(playerSquad));
        } else {
            sessionStorage.setItem('playerConfig', JSON.stringify(playerConfig));
        }
        window.location.href = 'combat.html';
    };

    // --- DRAFT (MODO 5) ---
    const startDraftRound = () => {
        if(draftRound > 5) {
            launchCombat();
            return;
        }
        document.getElementById('draft-round-title').innerText = `Ronda ${draftRound}/5`;
        document.getElementById('btn-roll-draft').style.display = 'inline-block';
        document.getElementById('draft-options').classList.add('hidden');
    };

    document.getElementById('btn-roll-draft').addEventListener('click', () => {
        if(!sagaData.getPool) return;
        const pool = sagaData.getPool();
        if(!pool || pool.length === 0) return;
        
        const draftOptionsDiv = document.getElementById('draft-options');
        draftOptionsDiv.innerHTML = '';
        
        // Filtrar los personajes que ya están en el escuadrón del jugador
        const availablePool = pool.filter(p => !playerSquad.some(sq => sq.name === p.name));
        
        const selectedOptions = [...availablePool].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        selectedOptions.forEach(opt => {
            const card = document.createElement('div');
            card.className = 'class-card draft-card';
            card.innerHTML = `<h3>${opt.name}</h3><p>HP: ${opt.hp}</p><p>ATK: ${opt.attack}</p><p>Especial: ${opt.specialName}</p>`;
            card.addEventListener('click', () => {
                playerSquad.push(JSON.parse(JSON.stringify(opt)));
                const rosterCard = document.createElement('div');
                rosterCard.className = 'class-card';
                rosterCard.style.padding = "5px"; rosterCard.style.fontSize = "0.8rem";
                rosterCard.innerHTML = opt.name;
                document.getElementById('player-roster').appendChild(rosterCard);
                draftRound++;
                startDraftRound();
            });
            draftOptionsDiv.appendChild(card);
        });
        
        document.getElementById('btn-roll-draft').style.display = 'none';
        draftOptionsDiv.classList.remove('hidden');
    });

    document.getElementById('btn-roll-destiny').addEventListener('click', () => {
        const isDark = (gameMode === 'dark');
        const db = isDark ? sagaData.DB_DARK : sagaData.DB_LIGHT;
        if(!db || db.length === 0) return;
        const cls = db[Math.floor(Math.random() * db.length)];
        const sub = cls.subclasses[Math.floor(Math.random() * cls.subclasses.length)];
        const sp = cls.specials[Math.floor(Math.random() * cls.specials.length)];
        
        playerConfig.className = cls.name;
        playerConfig.name = sub.name;
        playerConfig.maxHp = sub.hp;
        playerConfig.hp = sub.hp;
        playerConfig.attack = sub.attack;
        playerConfig.critThreshold = sub.critThreshold;
        playerConfig.passives = sub.passives;
        
        playerConfig.specialName = sp.name;
        let finalDmg = sp.dmg;
        if (playerConfig.passives.includes("special_multiplier_1.5")) finalDmg = Math.floor(finalDmg * 1.5);
        playerConfig.specialDmg = finalDmg;
        playerConfig.specialEffect = sp.effect;
        playerConfig.specialCooldownMax = sp.cooldown;

        launchCombat();
    });
});
