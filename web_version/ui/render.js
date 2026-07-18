import { GameState } from '../core/gameState.js';

export function printLog(msg, typeClass, containerId) {
    const log = document.getElementById(containerId);
    if (!log) return;
    const p = document.createElement('p');
    p.innerHTML = msg;
    if (typeClass) p.className = typeClass;
    log.appendChild(p);
    if (log.parentElement) {
        log.parentElement.scrollTop = log.parentElement.scrollHeight;
    }
}

export function updateSquadActionPanel() {
    const panel = document.getElementById('squad-action-panel');
    if (GameState.activeAttacker && GameState.activeTarget && GameState.isPlayerTurn) {
        panel.style.opacity = "1";
        panel.style.pointerEvents = "auto";
        
        const btnSp = document.getElementById('btn-squad-special');
        if (GameState.activeAttacker.fighter.state.cooldown > 0) {
            btnSp.disabled = true;
            btnSp.innerText = `ESPECIAL (CD: ${GameState.activeAttacker.fighter.state.cooldown})`;
        } else {
            btnSp.disabled = false;
            btnSp.innerText = `ESPECIAL`;
        }
    } else {
        panel.style.opacity = "0.5";
        panel.style.pointerEvents = "none";
    }
}

export function createSquadCard(fighter, index, isHero) {
    const card = document.createElement('div');
    const isDead = fighter.hp <= 0;
    card.className = `squad-card ${isHero ? 'squad-card-hero' : 'squad-card-boss'} ${isDead ? 'dead-fighter' : ''}`;
    
    const hpPercent = Math.max(0, (fighter.hp / fighter.maxHp) * 100);
    let statuses = "";
    if (fighter.state.burn > 0) statuses += "🔥 ";
    if (fighter.state.stun) statuses += "⚡ ";

    card.innerHTML = `
        <h4>${fighter.name} ${statuses}</h4>
        <div class="hp-bar-container" style="height:8px; margin:2px 0;">
            <div class="hp-bar ${isHero?'hero-hp':'boss-hp'}" style="width:${hpPercent}%"></div>
        </div>
        <p style="font-size:0.75rem">${fighter.hp} / ${fighter.maxHp} HP</p>
    `;

    if (!isDead) {
        card.addEventListener('click', () => {
            if (!GameState.isPlayerTurn) return;
            if (isHero) {
                document.querySelectorAll('.squad-card-hero').forEach(c => c.classList.remove('selected-attacker'));
                card.classList.add('selected-attacker');
                GameState.activeAttacker = { fighter, index, element: card };
            } else {
                document.querySelectorAll('.squad-card-boss').forEach(c => c.classList.remove('selected-target'));
                card.classList.add('selected-target');
                GameState.activeTarget = { fighter, index, element: card };
            }
            updateSquadActionPanel();
        });
    }
    return card;
}

export function renderSquads() {
    const heroContainer = document.getElementById('squad-hero-team');
    const bossContainer = document.getElementById('squad-boss-team');
    heroContainer.innerHTML = '';
    bossContainer.innerHTML = '';
    
    // Guardamos las selecciones actuales antes de re-renderizar
    const prevAttackerIndex = GameState.activeAttacker ? GameState.activeAttacker.index : null;
    const prevTargetIndex = GameState.activeTarget ? GameState.activeTarget.index : null;
    
    GameState.activeAttacker = null;
    GameState.activeTarget = null;

    const enemySquad = GameState.enemySquads[GameState.currentSquadIndex];

    GameState.playerSquad.forEach((f, i) => { 
        const card = createSquadCard(f, i, true);
        heroContainer.appendChild(card);
        // Restaurar selección si sigue vivo
        if (prevAttackerIndex === i && f.hp > 0 && GameState.isPlayerTurn) {
            card.classList.add('selected-attacker');
            GameState.activeAttacker = { fighter: f, index: i, element: card };
        }
    });
    
    enemySquad.forEach((f, i) => { 
        const card = createSquadCard(f, i, false);
        bossContainer.appendChild(card);
        // Restaurar selección si sigue vivo
        if (prevTargetIndex === i && f.hp > 0 && GameState.isPlayerTurn) {
            card.classList.add('selected-target');
            GameState.activeTarget = { fighter: f, index: i, element: card };
        }
    });
    
    updateSquadActionPanel();
}

export function updateStatusUI1v1(containerId, stateObj) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    if (stateObj.burn > 0) {
        const badge = document.createElement('span');
        badge.className = 'status-badge status-burn';
        badge.innerText = `🔥 QUEMADURA (${stateObj.burn})`;
        container.appendChild(badge);
    }
    if (stateObj.stun) {
        const badge = document.createElement('span');
        badge.className = 'status-badge status-stun';
        badge.innerText = `⚡ ATURDIDO`;
        container.appendChild(badge);
    }
}

export function updateUI1v1() {
    document.getElementById('hero-hp-current').innerText = GameState.player.hp;
    document.getElementById('hero-hp-max').innerText = GameState.player.maxHp;
    document.getElementById('hero-hp-bar').style.width = `${Math.max(0, (GameState.player.hp / GameState.player.maxHp) * 100)}%`;

    document.getElementById('boss-hp-current').innerText = GameState.currentBoss.hp;
    document.getElementById('boss-hp-max').innerText = GameState.currentBoss.maxHp;
    document.getElementById('boss-hp-bar').style.width = `${Math.max(0, (GameState.currentBoss.hp / GameState.currentBoss.maxHp) * 100)}%`;

    updateStatusUI1v1('hero-status', GameState.player.state);
    updateStatusUI1v1('boss-status', GameState.currentBoss.state);

    const btnSpecial1v1 = document.getElementById('btn-special');
    if (GameState.player.state.cooldown > 0) {
        btnSpecial1v1.disabled = true;
        document.getElementById('hero-cooldown-text').innerText = `CD: ${GameState.player.state.cooldown}`;
    } else {
        document.getElementById('hero-cooldown-text').innerText = ``;
        if (GameState.isPlayerTurn) btnSpecial1v1.disabled = false;
    }
}

export function toggleActionButtons1v1(enabled) {
    document.getElementById('btn-attack').disabled = !enabled;
    document.getElementById('btn-defend').disabled = !enabled;
    const btnSpecial1v1 = document.getElementById('btn-special');
    btnSpecial1v1.disabled = !enabled;
    if(enabled && GameState.player.state.cooldown > 0) btnSpecial1v1.disabled = true;
}
