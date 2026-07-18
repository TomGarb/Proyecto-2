import { GameState } from './gameState.js';
import { processStatusEffects, executeAttack } from './combat.js';
import { printLog, updateSquadActionPanel, renderSquads, updateUI1v1, toggleActionButtons1v1 } from '../ui/render.js';

// --- LÓGICA MODO DRAFT (5v5) ---
// ----------------------------------------------------

export function generateEnemySquads() {
    GameState.enemySquads = [];
    const sagaData = GameState.sagasData[GameState.saga];
    const pool = sagaData.getPool();
    for(let i=0; i<5; i++) {
        let sq = [];
        const shuffled = [...pool].sort(() => 0.5 - Math.random());
        for(let j=0; j<5; j++) {
            sq.push(JSON.parse(JSON.stringify(shuffled[j])));
        }
        GameState.enemySquads.push(sq);
    }
}

export function startSquadBattle(index) {
    GameState.currentSquadIndex = index;
    GameState.isPlayerTurn = true; // Reiniciar estado al iniciar batalla!
    document.getElementById('squad-round-title').innerText = `Escuadrón ${index + 1}/5`;
    document.getElementById('squad-combat-log').innerHTML = '<p class="log-hero">¡Inicia la Batalla de Escuadrones!</p>';
    renderSquads();
    
    if (GameState.autoPlay5v5) {
        setTimeout(executeAutoSquadTurn, 1000);
    }
}

export function squadPlayerTurn(actionType) {
    if (!GameState.isPlayerTurn || !GameState.activeAttacker || !GameState.activeTarget) return;
    GameState.isPlayerTurn = false;
    updateSquadActionPanel();

    const attacker = GameState.activeAttacker.fighter;
    const target = GameState.activeTarget.fighter;

    if (actionType === 'defend') {
        printLog(`[Cura de Área] Tu escuadrón recupera vida.`, 'log-heal', 'squad-combat-log');
        GameState.playerSquad.forEach(f => {
            if (f.hp > 0) {
                let mult = (f.passives && f.passives.includes("heal_multiplier_40")) ? 0.4 : 0.3;
                f.hp = Math.min(f.maxHp, f.hp + Math.floor(f.maxHp * mult));
            }
        });
    } else {
        const canAct = processStatusEffects(attacker, 'squad-combat-log');
        if (canAct && attacker.hp > 0) {
            executeAttack(attacker, target, actionType === 'special', 'squad-combat-log', true);
        }
    }

    renderSquads();
    if (!checkSquadGameState()) {
        setTimeout(squadEnemyTurn, 1500);
    }
}

export function squadEnemyTurn() {
    if (GameState.gameMode !== 'draft') return;
    const enemySquad = GameState.enemySquads[GameState.currentSquadIndex];
    const aliveEnemies = enemySquad.filter(f => f.hp > 0);
    const aliveHeroes = GameState.playerSquad.filter(f => f.hp > 0);

    if (aliveEnemies.length === 0 || aliveHeroes.length === 0) {
        checkSquadGameState();
        return;
    }

    const attacker = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    const target = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];

    const canAct = processStatusEffects(attacker, 'squad-combat-log');
    if (canAct && attacker.hp > 0) {
        const isSpecial = Math.random() < 0.35 && attacker.state.cooldown === 0;
        executeAttack(attacker, target, isSpecial, 'squad-combat-log', false);
    }

    GameState.isPlayerTurn = true;
    renderSquads();
    
    if (!checkSquadGameState()) {
        if (GameState.autoPlay5v5) {
            setTimeout(executeAutoSquadTurn, 1500);
        } else {
            printLog('▶ ¡ES TU TURNO!', 'log-hero', 'squad-combat-log');
        }
    }
}

export function executeAutoSquadTurn() {
    if (!GameState.isPlayerTurn || !GameState.autoPlay5v5 || GameState.gameMode !== 'draft') return;
    const enemySquad = GameState.enemySquads[GameState.currentSquadIndex];
    const aliveHeroes = GameState.playerSquad.filter(f => f.hp > 0);
    const aliveEnemies = enemySquad.filter(f => f.hp > 0);
    
    if (aliveHeroes.length === 0 || aliveEnemies.length === 0) return;
    
    const heroAttacker = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
    const enemyTarget = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    
    GameState.activeAttacker = { fighter: heroAttacker };
    GameState.activeTarget = { fighter: enemyTarget };
    
    const rand = Math.random();
    let action = 'attack';
    if (rand < 0.1) action = 'defend';
    else if (rand < 0.4 && heroAttacker.state.cooldown === 0) action = 'special';
    
    squadPlayerTurn(action);
}

export function checkSquadGameState() {
    const aliveHeroes = GameState.playerSquad.filter(f => f.hp > 0);
    const aliveEnemies = GameState.enemySquads[GameState.currentSquadIndex].filter(f => f.hp > 0);

    if (aliveEnemies.length === 0) {
        printLog(`¡Escuadrón Enemigo Destruido!`, 'log-crit', 'squad-combat-log');
        if (GameState.currentSquadIndex === 4) {
            endGame(true);
        } else {
            GameState.playerSquad.forEach(f => {
                if (f.hp > 0) f.hp = Math.min(f.maxHp, f.hp + Math.floor(f.maxHp * 0.2));
            });
            setTimeout(() => {
                printLog(`El equipo avanza y cura 20% HP...`, 'log-heal', 'squad-combat-log');
                setTimeout(() => startSquadBattle(GameState.currentSquadIndex + 1), 2000);
            }, 1000);
        }
        return true;
    }

    if (aliveHeroes.length === 0) {
        endGame(false);
        return true;
    }

    return false;
}

// ----------------------------------------------------
// --- LÓGICA MODOS 1v1 (Story, Endless, Rogue, Dark) -
// ----------------------------------------------------


export function generateEndlessBoss1v1() {
    const template = GameState.currentBossDB[Math.floor(Math.random() * GameState.currentBossDB.length)];
    const scaling = 1 + (GameState.endlessRound * 0.2);
    return {
        name: `Clon de ${template.name} (Nv. ${GameState.endlessRound})`,
        hp: Math.floor(template.hp * scaling),
        maxHp: Math.floor(template.hp * scaling),
        attack: Math.floor(template.attack * scaling),
        specialName: template.specialName,
        specialDmg: Math.floor(template.specialDmg * scaling),
        critThreshold: template.critThreshold,
        specialEffect: template.specialEffect,
        specialCooldownMax: 2,
        passives: [],
        state: { burn: 0, stun: false, cooldown: 0 }
    };
}

export function startBattle1v1(bossIndex) {
    GameState.currentBossIndex = bossIndex;
    if (GameState.gameMode === 'endless') {
        GameState.currentBoss = generateEndlessBoss1v1();
        document.getElementById('boss-round-title').innerText = `Supervivencia: Ronda ${GameState.endlessRound}`;
    } else {
        const bossTemplate = GameState.currentBossDB[bossIndex];
        GameState.currentBoss = { ...bossTemplate, maxHp: bossTemplate.hp, specialCooldownMax: 2, passives: [], state: { burn: 0, stun: false, cooldown: 0 } };
        document.getElementById('boss-round-title').innerText = `Ronda ${bossIndex + 1}/5: vs ${GameState.currentBoss.name}`;
    }
    
    GameState.player.state = { burn: 0, stun: false, cooldown: 0 };
    
    document.getElementById('hero-name').innerText = GameState.player.name;
    document.getElementById('hero-class').innerText = GameState.player.className;
    document.getElementById('boss-name').innerText = GameState.currentBoss.name;
    document.getElementById('boss-skill').innerText = GameState.currentBoss.specialName;
    
    const btnSpecial1v1 = document.getElementById('btn-special');
    btnSpecial1v1.innerHTML = `ESPECIAL <span class="cooldown-text" id="hero-cooldown-text"></span>`;

    document.getElementById('combat-log').innerHTML = '';
    printLog(`¡Inicia el combate contra ${GameState.currentBoss.name}!`, 'log-hero', 'combat-log');
    
    GameState.isPlayerTurn = true;
    updateUI1v1();
    toggleActionButtons1v1(true);
}

export function playerTurn1v1(actionType) {
    if (!GameState.isPlayerTurn) return;
    toggleActionButtons1v1(false);
    GameState.isPlayerTurn = false;

    if (!processStatusEffects(GameState.player, 'combat-log')) { checkGameState1v1(); return; }
    
    if (actionType === 'defend') {
        let mult = GameState.player.passives.includes("heal_multiplier_40") ? 0.4 : 0.3;
        const heal = Math.floor(GameState.player.maxHp * mult);
        GameState.player.hp = Math.min(GameState.player.maxHp, GameState.player.hp + heal);
        printLog(`[Defensa] Te curas <b>${heal} HP</b>.`, 'log-heal', 'combat-log');
    } else {
        executeAttack(GameState.player, GameState.currentBoss, actionType === 'special', 'combat-log', true);
    }
    
    updateUI1v1();
    if (!checkGameState1v1()) setTimeout(enemyTurn1v1, 1500);
}

export function enemyTurn1v1() {
    if (GameState.currentBoss.hp <= 0) return;
    if (!processStatusEffects(GameState.currentBoss, 'combat-log')) { 
        updateUI1v1();
        if(!checkGameState1v1()) {
            GameState.isPlayerTurn = true;
            toggleActionButtons1v1(true);
        }
        return; 
    }

    let isSpecial = Math.random() < 0.35 && GameState.currentBoss.state.cooldown === 0;
    executeAttack(GameState.currentBoss, GameState.player, isSpecial, 'combat-log', false);
    
    updateUI1v1();
    if (!checkGameState1v1()) {
        GameState.isPlayerTurn = true;
        toggleActionButtons1v1(true);
    }
}

export function checkGameState1v1() {
    if (GameState.currentBoss.hp <= 0) {
        printLog(`¡Has derrotado a ${GameState.currentBoss.name}!`, 'log-crit', 'combat-log');
        if (GameState.gameMode === 'endless') {
            GameState.endlessRound++;
            setTimeout(() => { printLog(`Preparando siguiente ronda...`, 'log-hero', 'combat-log'); setTimeout(() => startBattle1v1(0), 1500); }, 1000);
        } else if (GameState.currentBossIndex === GameState.currentBossDB.length - 1) {
            endGame(true);
        } else {
            if (GameState.gameMode === 'roguelike') {
                setTimeout(showLootScreen, 1500);
            } else {
                GameState.player.hp = Math.min(GameState.player.maxHp, GameState.player.hp + 30);
                setTimeout(() => { printLog(`Descansas y curas 30 HP. Preparando siguiente batalla...`, 'log-heal', 'combat-log'); setTimeout(() => startBattle1v1(GameState.currentBossIndex + 1), 2000); }, 1000);
            }
        }
        return true;
    }
    if (GameState.player.hp <= 0) { endGame(false); return true; }
    return false;
}

export function showLootScreen() {
    screens.battle.classList.add('hidden'); screens.battle.classList.remove('active');
    screens.loot.classList.remove('hidden'); screens.loot.classList.add('active');
    
    const loots = [
        { name: "+25 HP Máximo", apply: () => { GameState.player.maxHp += 25; GameState.player.hp += 25; } },
        { name: "+8 Daño Base", apply: () => { GameState.player.attack += 8; } },
        { name: "-1 CritThreshold", apply: () => { GameState.player.critThreshold = Math.max(5, GameState.player.critThreshold - 1); } },
        { name: "+15 Daño Especial", apply: () => { GameState.player.specialDmg += 15; } },
        { name: "Curación Total", apply: () => { GameState.player.hp = GameState.player.maxHp; } }
    ];
    
    const shuffled = [...loots].sort(() => 0.5 - Math.random());
    const selectedLoots = shuffled.slice(0, 3);
    const lootCardsDiv = document.getElementById('loot-cards');
    lootCardsDiv.innerHTML = '';
    selectedLoots.forEach(loot => {
        const card = document.createElement('div');
        card.className = 'class-card special-card';
        card.innerHTML = `<h3>${loot.name}</h3>`;
        card.addEventListener('click', () => {
            loot.apply();
            screens.loot.classList.add('hidden'); screens.loot.classList.remove('active');
            screens.battle.classList.remove('hidden'); screens.battle.classList.add('active');
            startBattle1v1(GameState.currentBossIndex + 1);
        });
        lootCardsDiv.appendChild(card);
    });
}

export function endGame(isVictory) {
    setTimeout(() => {
        screens.battle.classList.add('hidden'); screens.battle.classList.remove('active');
        screens.squadBattle.classList.add('hidden'); screens.squadBattle.classList.remove('active');
        screens.result.classList.remove('hidden'); screens.result.classList.add('active');
        
        const title = document.getElementById('result-title');
        const msg = document.getElementById('result-message');
        if (isVictory) {
            title.innerText = "¡VICTORIA TOTAL!";
            title.style.color = "var(--neon-blue)";
            msg.innerText = GameState.gameMode === 'dark' ? "Has aplastado a la Rebelión y a los Jedi." : "Has salvado la galaxia.";
        } else {
            title.innerText = "FIN DE LA PARTIDA";
            title.style.color = "var(--neon-red)";
            let text = "Has caído ante tus enemigos...";
            if (GameState.gameMode === 'endless') text += `<br><br>Sobreviviste <b>${GameState.endlessRound - 1}</b> rondas.`;
            msg.innerHTML = text;
        }
    }, 1500);
}
