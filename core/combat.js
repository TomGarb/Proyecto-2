import { rollD20 } from './dice.js';
import { printLog } from '../ui/render.js';

// Procesa quemaduras, enfriamientos y aturdimientos antes de atacar
export function processStatusEffects(fighter, logContainerId) {
    if (fighter.hp <= 0) return false; // Si ya estaba muerto, no puede actuar
    
    if (fighter.state.burn > 0) {
        fighter.hp -= 10;
        fighter.state.burn -= 1;
        printLog(`🔥 ${fighter.name} sufre 10 de daño por quemadura.`, 'log-status', logContainerId);
    }
    
    if (fighter.state.cooldown > 0) fighter.state.cooldown -= 1;
    
    // CORRECCIÓN CRÍTICA: Retornar FALSE si muere por la quemadura
    if (fighter.hp <= 0) return false; 

    if (fighter.state.stun) {
        printLog(`⚡ ${fighter.name} está aturdido y pierde el turno.`, 'log-status', logContainerId);
        fighter.state.stun = false;
        return false; // No puede actuar
    }
    return true; // Puede actuar
}

// Ejecuta el daño, el dado y los efectos especiales
export function executeAttack(attacker, target, isSpecial, logContainerId, isHero) {
    const baseDmg = isSpecial ? attacker.specialDmg : attacker.attack;
    const attackName = isSpecial ? attacker.specialName : "Ataque básico";
    
    const d20 = rollD20();
    let dmgMult = 1;
    let txt = "IMPACTO";
    
    if (d20 <= 5) { dmgMult = 0; txt = "FALLO"; }
    else if (d20 >= attacker.critThreshold) { 
        dmgMult = (attacker.passives && attacker.passives.includes("crit_multiplier_3")) ? 3 : 2; 
        txt = `¡CRÍTICO (x${dmgMult})!`; 
    }
    
    const finalDmg = baseDmg * dmgMult;
     target.hp = Math.max(0, target.hp - finalDmg);
    
    let msg = `🎲 [<b>${d20}</b>] ${attacker.name} usa ${attackName} a ${target.name}. <b>${txt}</b>. `;
    if (finalDmg > 0) msg += `Hace <span class="${dmgMult>1?'log-crit':''}">${finalDmg} daño</span>.`;
    printLog(msg, isHero ? 'log-hero' : 'log-boss', logContainerId);

    if (isSpecial && finalDmg > 0) {
        attacker.state.cooldown = attacker.specialCooldownMax;
        if (attacker.specialEffect === "stun") target.state.stun = true;
        if (attacker.specialEffect === "burn") target.state.burn = 2;
        if (attacker.specialEffect === "lifesteal") {
            const heal = Math.floor(finalDmg * 0.5);
            attacker.hp = Math.min(attacker.maxHp, attacker.hp + heal);
            printLog(`🩸 ${attacker.name} roba ${heal} HP.`, 'log-heal', logContainerId);
        }
    }
}
